import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PageIntroComponent } from './components/page-intro/page-intro.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
	declarations: [PageIntroComponent],
	imports: [CommonModule, HttpClientModule, MaterialModule],
	exports: [PageIntroComponent],
})
export class GenericModule {}
