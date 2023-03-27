import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericModule } from '../generic/generic.module';

@NgModule({
	declarations: [IndexComponent, LoginFormComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		GenericModule,
		MaterialModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
})
export class AuthModule {}
