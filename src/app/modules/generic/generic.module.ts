import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PageIntroComponent } from './components/page-intro/page-intro.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [PageIntroComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
	],
	exports: [PageIntroComponent],
})
export class GenericModule {}
