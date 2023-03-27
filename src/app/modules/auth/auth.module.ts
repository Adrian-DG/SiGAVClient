import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
	declarations: [IndexComponent, LoginFormComponent],
	imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
