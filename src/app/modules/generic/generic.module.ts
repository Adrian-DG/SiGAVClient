import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PageIntroComponent } from './components/page-intro/page-intro.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { ExcelUploadComponent } from './components/excel-upload/excel-upload.component';

@NgModule({
	declarations: [PageIntroComponent, RemoveUnderscorePipe, ExcelUploadComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
	],
	exports: [PageIntroComponent, RemoveUnderscorePipe, ExcelUploadComponent],
})
export class GenericModule {}
