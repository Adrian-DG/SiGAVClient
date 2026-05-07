import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { finalize } from 'rxjs/operators';
import { UploadService } from '../../../generic/services/upload/upload.service';
import { IServerResponse } from '../../../generic/Responses/iserver-response';

type ExcelRow = Record<string, unknown>;

@Component({
	selector: 'app-actualizar-unidades-index',
	templateUrl: './index.page.html',
	styleUrls: ['./index.page.scss'],
})
export class IndexPage {
	selectedFileName = '';
	selectedSheetName = 'Articulos';
	headers: string[] = [];
	rows: ExcelRow[] = [];
	previewLimit = 15;
	isUploading = false;
	errorMessage = '';
	successMessage = '';

	constructor(private uploadService: UploadService) {}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		this.resetMessages();

		if (!file) {
			this.clearParsedData();
			return;
		}

		if (!this.isExcelFile(file.name)) {
			this.clearParsedData();
			this.errorMessage =
				'El archivo seleccionado no es valido. Utiliza .xlsx o .xls.';
			input.value = '';
			return;
		}

		this.selectedFileName = file.name;

		const reader = new FileReader();
		reader.onload = () => {
			const binary = reader.result;
			if (!binary) {
				this.clearParsedData();
				this.errorMessage =
					'No fue posible leer el archivo. Intenta nuevamente.';
				return;
			}

			const workbook = XLSX.read(binary, { type: 'array' });
			const firstSheetName = workbook.SheetNames[0];
			const firstSheet = workbook.Sheets[firstSheetName];
			this.selectedSheetName = firstSheetName || 'Articulos';

			const parsedRows = XLSX.utils.sheet_to_json<ExcelRow>(firstSheet, {
				defval: '',
				raw: false,
			});

			if (!parsedRows.length) {
				this.clearParsedData();
				this.errorMessage =
					'El archivo no contiene datos en la primera hoja.';
				return;
			}

			this.headers = this.extractHeaders(parsedRows);
			this.rows = parsedRows.map((row) => this.normalizeRow(row));
		};

		reader.onerror = () => {
			this.clearParsedData();
			this.errorMessage =
				'Hubo un error al procesar el archivo seleccionado.';
		};

		reader.readAsArrayBuffer(file);
	}

	clearSelection(input: HTMLInputElement): void {
		input.value = '';
		this.clearParsedData();
		this.resetMessages();
	}

	downloadTemplate(): void {
		const templateHeaders = [
			'Clasificacion',
			'Categoria',
			'Subcategoria',
			'Marca',
			'Modelo',
			'Calibre',
		];

		const worksheet = XLSX.utils.aoa_to_sheet([templateHeaders]);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Articulos');
		XLSX.writeFile(workbook, 'plantilla_datos.xlsx');
	}

	uploadExcelData(): void {
		if (!this.rows.length || this.isUploading) {
			return;
		}

		this.resetMessages();
		this.isUploading = true;

		this.uploadService
			.uploadUnidadesExcel(this.rows)
			.pipe(finalize(() => (this.isUploading = false)))
			.subscribe({
				next: (response: IServerResponse) => {
					this.successMessage =
						response.message ||
						'Se cargaron los datos correctamente.';
				},
				error: () => {
					this.errorMessage =
						'No fue posible enviar los datos al servidor.';
				},
			});
	}

	get previewRows(): ExcelRow[] {
		return this.rows.slice(0, this.previewLimit);
	}

	get totalRows(): number {
		return this.rows.length;
	}

	trackByHeader(_: number, header: string): string {
		return header;
	}

	private extractHeaders(rows: ExcelRow[]): string[] {
		const headerSet = new Set<string>();
		rows.forEach((row) => {
			Object.keys(row).forEach((key) => headerSet.add(key));
		});
		return Array.from(headerSet);
	}

	private normalizeRow(row: ExcelRow): ExcelRow {
		const normalized: ExcelRow = {};
		this.headers.forEach((header) => {
			normalized[header] = row[header] ?? '';
		});
		return normalized;
	}

	private isExcelFile(fileName: string): boolean {
		return /\.(xlsx|xls)$/i.test(fileName);
	}

	private clearParsedData(): void {
		this.selectedFileName = '';
		this.selectedSheetName = 'Articulos';
		this.headers = [];
		this.rows = [];
	}

	private resetMessages(): void {
		this.errorMessage = '';
		this.successMessage = '';
	}
}
