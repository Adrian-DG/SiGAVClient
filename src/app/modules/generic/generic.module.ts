import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PageIntroComponent } from './components/page-intro/page-intro.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';

@NgModule({
	declarations: [PageIntroComponent, RemoveUnderscorePipe],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
	],
	exports: [PageIntroComponent, RemoveUnderscorePipe],
})
export class GenericModule {}
