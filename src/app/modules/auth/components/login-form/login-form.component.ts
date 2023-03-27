import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
	constructor(private $fb: FormBuilder, private _auth: AuthService) {}

	loginForm: FormGroup = this.$fb.group({
		username: ['', [Validators.required]],
		password: ['', [Validators.required]],
	});

	login(): void {
		this._auth.loginUser(this.loginForm.value);
	}
}
