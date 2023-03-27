import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-page-intro',
	templateUrl: './page-intro.component.html',
	styleUrls: ['./page-intro.component.scss'],
})
export class PageIntroComponent {
	@Input() title!: string;
	@Input() description!: string;
	@Input() childRoutes!: string[];

	constructor(private $router: Router) {}

	navToPage(page: string): void {
		this.$router.navigateByUrl(`/${this.title}/${page}`);
	}
}
