import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
	ElementRef,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { UploadService } from '../../services/upload/upload.service';
import {
	IExcelUploadOption,
	IExcelUploadResponse,
} from './excel-upload.models';

type ExcelRow = Record<string, string>;

/**
 * Componente generico de carga de Excel.
 *
 * Recibe un listado de opciones; segun la que elija el usuario descarga la
 * plantilla correspondiente y sube el archivo al endpoint de ese mismo tipo.
 */
@Component({
	selector: 'app-excel-upload',
	templateUrl: './excel-upload.component.html',
	styleUrls: ['./excel-upload.component.scss'],
})
export class ExcelUploadComponent implements OnChanges {
	@Input() title = 'Carga de Datos desde Excel';
	@Input() description =
		'Sube y visualiza datos desde archivos de Excel para su procesamiento en el sistema.';
	@Input() selectLabel = 'Tipo de carga';
	@Input() options: IExcelUploadOption[] = [];

	@Output() uploaded = new EventEmitter<IExcelUploadResponse>();

	@ViewChild('excelInput') private excelInput?: ElementRef<HTMLInputElement>;

	selectedOption: IExcelUploadOption | null = null;
	selectedFileName = '';
	selectedSheetName = '';
	headers: string[] = [];
	rows: ExcelRow[] = [];
	missingColumns: string[] = [];

	pageSize = 15;
	pageIndex = 0;
	readonly pageSizeOptions = [10, 15, 25, 50];

	isUploading = false;
	isDownloading = false;
	errorMessage = '';
	successMessage = '';

	private selectedFile: File | null = null;

	constructor(private uploadService: UploadService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes['options']) {
			return;
		}

		const stillAvailable =
			this.selectedOption &&
			this.options.some(
				(option) =>
					option.templateType === this.selectedOption?.templateType,
			);

		if (!stillAvailable) {
			this.selectedOption = this.options[0] ?? null;
			this.clearParsedData();
			this.resetMessages();
		}
	}

	onOptionChange(): void {
		this.clearSelection();
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		this.resetMessages();
		this.clearParsedData();

		if (!file) {
			return;
		}

		if (!this.isExcelFile(file.name)) {
			input.value = '';
			this.errorMessage =
				'El archivo seleccionado no es valido. Utiliza .xlsx o .xls.';
			return;
		}

		this.selectedFileName = file.name;
		this.selectedFile = file;

		const reader = new FileReader();

		reader.onload = () => {
			const buffer = reader.result;

			if (!buffer) {
				this.clearParsedData();
				this.errorMessage =
					'No fue posible leer el archivo. Intenta nuevamente.';
				return;
			}

			this.parseWorkbook(buffer as ArrayBuffer);
		};

		reader.onerror = () => {
			this.clearParsedData();
			this.errorMessage =
				'Hubo un error al procesar el archivo seleccionado.';
		};

		reader.readAsArrayBuffer(file);
	}

	clearSelection(): void {
		if (this.excelInput) {
			this.excelInput.nativeElement.value = '';
		}
		this.clearParsedData();
		this.resetMessages();
	}

	downloadTemplate(): void {
		if (!this.selectedOption || this.isDownloading) {
			return;
		}

		this.resetMessages();
		this.isDownloading = true;

		const option = this.selectedOption;

		this.uploadService
			.downloadTemplate(option.templateType)
			.pipe(finalize(() => (this.isDownloading = false)))
			.subscribe({
				next: (blob: Blob) => this.saveBlob(blob, this.templateFileName(option)),
				error: () => {
					this.errorMessage =
						'No fue posible descargar la plantilla desde el servidor.';
				},
			});
	}

	uploadExcelData(): void {
		if (!this.canUpload || !this.selectedFile || !this.selectedOption) {
			return;
		}

		this.resetMessages();
		this.isUploading = true;

		this.uploadService
			.uploadExcel(this.selectedOption.templateType, this.selectedFile)
			.pipe(finalize(() => (this.isUploading = false)))
			.subscribe({
				next: (response: IExcelUploadResponse) => {
					if (response.success) {
						this.successMessage =
							response.message ||
							'Los datos se cargaron correctamente.';
					} else {
						this.errorMessage =
							response.message ||
							'Hubo un error al cargar los datos. Verifica el formato del archivo.';
					}

					this.uploaded.emit(response);
				},
				error: () => {
					this.errorMessage =
						'No fue posible enviar los datos al servidor.';
				},
			});
	}

	onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
	}

	get canUpload(): boolean {
		return (
			!!this.selectedFile &&
			!!this.selectedOption &&
			!!this.rows.length &&
			!this.missingColumns.length &&
			!this.isUploading
		);
	}

	get pagedRows(): ExcelRow[] {
		const start = this.pageIndex * this.pageSize;
		return this.rows.slice(start, start + this.pageSize);
	}

	get totalRows(): number {
		return this.rows.length;
	}

	get displayedColumns(): string[] {
		return ['_index', ...this.headers];
	}

	get firstRowIndex(): number {
		return this.totalRows ? this.pageIndex * this.pageSize + 1 : 0;
	}

	get lastRowIndex(): number {
		return this.totalRows
			? Math.min((this.pageIndex + 1) * this.pageSize, this.totalRows)
			: 0;
	}

	getRowNumber(indexInPage: number): number {
		return this.pageIndex * this.pageSize + indexInPage + 1;
	}

	trackByHeader(_: number, header: string): string {
		return header;
	}

	trackByTemplateType(_: number, option: IExcelUploadOption): string {
		return option.templateType;
	}

	private parseWorkbook(buffer: ArrayBuffer): void {
		const workbook = XLSX.read(buffer, { type: 'array' });
		const sheetName = workbook.SheetNames[0];
		const sheet = sheetName ? workbook.Sheets[sheetName] : null;

		if (!sheet) {
			this.clearParsedData();
			this.errorMessage = 'El archivo no contiene hojas con datos.';
			return;
		}

		const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
			header: 1,
			defval: '',
			raw: false,
			blankrows: false,
		});

		const [headerRow, ...dataRows] = matrix;

		if (!headerRow?.length) {
			this.clearParsedData();
			this.errorMessage = 'El archivo no contiene encabezados validos.';
			return;
		}

		this.selectedSheetName = sheetName;
		this.headers = this.buildHeaders(headerRow);
		this.rows = this.buildRows(dataRows);
		this.pageIndex = 0;

		if (!this.rows.length) {
			this.errorMessage = 'El archivo no contiene datos en la primera hoja.';
			return;
		}

		this.missingColumns = this.findMissingColumns();

		if (this.missingColumns.length) {
			this.errorMessage = `El archivo no corresponde a la plantilla seleccionada. Faltan las columnas: ${this.missingColumns.join(
				', ',
			)}.`;
		}
	}

	/** Normaliza los encabezados y evita nombres duplicados o vacios. */
	private buildHeaders(headerRow: unknown[]): string[] {
		const used = new Set<string>();

		return headerRow.map((value, index) => {
			const base = String(value ?? '').trim() || `Columna ${index + 1}`;
			let header = base;
			let suffix = 2;

			while (used.has(header)) {
				header = `${base} (${suffix++})`;
			}

			used.add(header);
			return header;
		});
	}

	private buildRows(dataRows: unknown[][]): ExcelRow[] {
		return dataRows
			.map((cells) => {
				const row: ExcelRow = {};
				this.headers.forEach((header, index) => {
					row[header] = String(cells[index] ?? '').trim();
				});
				return row;
			})
			.filter((row) => Object.values(row).some((value) => value !== ''));
	}

	private findMissingColumns(): string[] {
		const expected = this.selectedOption?.expectedColumns ?? [];

		if (!expected.length) {
			return [];
		}

		const present = new Set(
			this.headers.map((header) => this.normalize(header)),
		);

		return expected.filter(
			(column) => !present.has(this.normalize(column)),
		);
	}

	private normalize(value: string): string {
		return value
			.normalize('NFD')
			.replace(/[̀-ͯ]/g, '')
			.replace(/\s+/g, '')
			.toLowerCase();
	}

	private templateFileName(option: IExcelUploadOption): string {
		return option.templateFileName || `${option.templateType}Template.xlsx`;
	}

	private saveBlob(blob: Blob, fileName: string): void {
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = fileName;
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
		URL.revokeObjectURL(url);
	}

	private isExcelFile(fileName: string): boolean {
		return /\.(xlsx|xls)$/i.test(fileName);
	}

	private clearParsedData(): void {
		this.selectedFileName = '';
		this.selectedSheetName = '';
		this.selectedFile = null;
		this.headers = [];
		this.rows = [];
		this.missingColumns = [];
		this.pageIndex = 0;
	}

	private resetMessages(): void {
		this.errorMessage = '';
		this.successMessage = '';
	}
}
