import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-report-viewer-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
	template: `
		<h1 mat-dialog-title>Report Viewer</h1>
		<div mat-dialog-content class="report-viewer-content">
			<iframe
				[src]="sanitizedUrl"
				width="800"
				height="600"
				[frameBorder]="0"
				class="document"
			></iframe>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="dialogRef.close()">Close</button>
		</div>
	`,
	styleUrls: ['./report-viewer-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportViewerDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<ReportViewerDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { url: string },
		private _domSanitize: DomSanitizer
	) {
		// You can inject any services you need here
	}

	get sanitizedUrl() {
		return this._domSanitize.bypassSecurityTrustResourceUrl(this.data.url);
	}
}
