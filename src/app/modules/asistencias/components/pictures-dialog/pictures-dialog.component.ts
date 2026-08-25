import {
	Component,
	ElementRef,
	HostListener,
	Inject,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { AsistenciasService } from '../../services/asistencias.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogData } from '../../pages/list/list.component';

@Component({
	selector: 'app-pictures-dialog',
	templateUrl: './pictures-dialog.component.html',
	styleUrls: ['./pictures-dialog.component.scss'],
})
export class PicturesDialogComponent implements OnInit, OnDestroy {
	@ViewChild('dialogShell', { static: true })
	dialogShell!: ElementRef<HTMLElement>;

	pictures: string[] = [];
	hasPictures: boolean = false;
	isLoading: boolean = true;
	selectedPictureIndex: number = 0;
	zoomLevel: number = 1;
	readonly minZoom: number = 1;
	readonly maxZoom: number = 4;
	readonly zoomStep: number = 0.25;
	private isResizing = false;
	private startX = 0;
	private startY = 0;
	private startWidth = 0;
	private startHeight = 0;

	constructor(
		private _asistencias: AsistenciasService,
		public dialogRef: MatDialogRef<PicturesDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IDialogData,
	) {}

	get selectedPicture(): string | null {
		return this.pictures[this.selectedPictureIndex] ?? null;
	}

	get zoomPercent(): number {
		return Math.round(this.zoomLevel * 100);
	}

	ngOnInit(): void {
		this.dialogRef.updateSize('92vw', '86vh');
		this.isLoading = true;
		this.hasPictures = false;
		this._asistencias.GetImagenes(this.data.id).subscribe(
			(data: string[]) => {
				this.isLoading = false;
				if (data.length > 0) {
					this.hasPictures = true;
					this.pictures = data;
					this.selectedPictureIndex = 0;
					this.zoomLevel = this.minZoom;
				}
			},
			(error) => {
				this.isLoading = false;
				this.hasPictures = false;
				console.log(error);
			},
		);
	}

	ngOnDestroy(): void {
		this.releaseResizeState();
	}

	selectPicture(index: number): void {
		if (index < 0 || index >= this.pictures.length) {
			return;
		}

		this.selectedPictureIndex = index;
		this.resetZoom();
	}

	zoomIn(): void {
		this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel + this.zoomStep);
	}

	zoomOut(): void {
		this.zoomLevel = Math.max(this.minZoom, this.zoomLevel - this.zoomStep);
	}

	resetZoom(): void {
		this.zoomLevel = this.minZoom;
	}

	toggleZoom(): void {
		this.zoomLevel = this.zoomLevel > this.minZoom ? this.minZoom : 2;
	}

	onWheelZoom(event: WheelEvent): void {
		event.preventDefault();
		if (event.deltaY < 0) {
			this.zoomIn();
			return;
		}
		this.zoomOut();
	}

	closeDialog(): void {
		this.releaseResizeState();
		this.dialogRef.close();
	}

	startResize(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();

		const rect = this.dialogShell.nativeElement.getBoundingClientRect();
		this.isResizing = true;
		this.startX = event.clientX;
		this.startY = event.clientY;
		this.startWidth = rect.width;
		this.startHeight = rect.height;
		document.body.style.userSelect = 'none';
		document.body.style.cursor = 'nwse-resize';
	}

	@HostListener('document:mousemove', ['$event'])
	onResizeMove(event: MouseEvent): void {
		if (!this.isResizing) {
			return;
		}

		const deltaX = event.clientX - this.startX;
		const deltaY = event.clientY - this.startY;
		const minWidth = 480;
		const minHeight = 420;
		const maxWidth = Math.floor(window.innerWidth * 0.96);
		const maxHeight = Math.floor(window.innerHeight * 0.92);

		const nextWidth = Math.min(
			maxWidth,
			Math.max(minWidth, this.startWidth + deltaX),
		);
		const nextHeight = Math.min(
			maxHeight,
			Math.max(minHeight, this.startHeight + deltaY),
		);

		this.dialogRef.updateSize(`${nextWidth}px`, `${nextHeight}px`);
	}

	@HostListener('document:mouseup')
	stopResize(): void {
		if (!this.isResizing) {
			return;
		}

		this.releaseResizeState();
	}

	private releaseResizeState(): void {
		this.isResizing = false;
		document.body.style.userSelect = '';
		document.body.style.cursor = '';
	}
}
