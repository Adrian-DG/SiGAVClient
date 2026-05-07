import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { finalize } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import {
	IUnidadDenominacionUploadResponse,
	UploadService,
} from '../../../generic/services/upload/upload.service';

type ExcelRow = Record<string, unknown>;

@Component({
	selector: 'app-actualizar-unidades-index',
	templateUrl: './index.page.html',
	styleUrls: ['./index.page.scss'],
})
export class IndexPage {
	selectedFileName = '';
	selectedSheetName = 'Articulos';
	private selectedFile: File | null = null;
	headers: string[] = [];
	rows: ExcelRow[] = [];
	pageSize = 15;
	pageIndex = 0;
	readonly pageSizeOptions = [10, 15, 25, 50];
	isUploading = false;
	errorMessage: string | null = '';
	successMessage: string | null = '';

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
		this.selectedFile = file;

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
			this.pageIndex = 0;
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
		this.resetMessages();

		this.uploadService.downloadUnidadDenominacionTemplate().subscribe({
			next: (blob: Blob) => {
				const url = URL.createObjectURL(blob);
				const anchor = document.createElement('a');
				anchor.href = url;
				anchor.download = 'UnidadDenominacionTemplate.xlsx';
				document.body.appendChild(anchor);
				anchor.click();
				anchor.remove();
				URL.revokeObjectURL(url);
			},
			error: () => {
				this.errorMessage =
					'No fue posible descargar la plantilla desde el servidor.';
			},
		});
	}

	uploadExcelData(): void {
		if (!this.selectedFile || this.isUploading) {
			return;
		}

		this.resetMessages();
		this.isUploading = true;

		this.uploadService
			.uploadUnidadDenominacion(this.selectedFile)
			.pipe(finalize(() => (this.isUploading = false)))
			.subscribe({
				next: (response: IUnidadDenominacionUploadResponse) => {
					response.success
						? (this.successMessage =
								response.message ||
								'Los datos se cargaron correctamente.')
						: (this.errorMessage =
								response.message ||
								'Hubo un error al cargar los datos. Verifica el formato del archivo.');
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

	get pagedRows(): ExcelRow[] {
		const start = this.pageIndex * this.pageSize;
		const end = start + this.pageSize;
		return this.rows.slice(start, end);
	}

	get totalRows(): number {
		return this.rows.length;
	}

	get displayedColumns(): string[] {
		return ['_index', ...this.headers];
	}

	get firstRowIndex(): number {
		if (!this.totalRows) {
			return 0;
		}
		return this.pageIndex * this.pageSize + 1;
	}

	get lastRowIndex(): number {
		if (!this.totalRows) {
			return 0;
		}
		return Math.min((this.pageIndex + 1) * this.pageSize, this.totalRows);
	}

	getRowNumber(indexInPage: number): number {
		return this.pageIndex * this.pageSize + indexInPage + 1;
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
		this.selectedFile = null;
		this.headers = [];
		this.rows = [];
		this.pageIndex = 0;
	}

	private resetMessages(): void {
		this.errorMessage = '';
		this.successMessage = '';
	}
}
