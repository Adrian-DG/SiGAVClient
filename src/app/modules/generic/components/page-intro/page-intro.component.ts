import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
	selector: 'app-page-intro',
	templateUrl: './page-intro.component.html',
	styleUrls: ['./page-intro.component.scss'],
})
export class PageIntroComponent {
	@Input() title!: string;
	@Input() description!: string;
	@Input() childRoutes!: string[];

	constructor(private $router: Router, public _auth: AuthService) {}

	navToPage(page: string): void {
		this.$router.navigateByUrl(`/${this.title}/${page}`);
	}

	hasValidAccess(rol: number): boolean {
		return [1, 2, 3].includes(rol);
	}
}
