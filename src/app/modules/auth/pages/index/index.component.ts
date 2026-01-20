import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
	currentSlide = 0;
	slides = [
		'assets/cover_image.jpeg',
		'assets/cover_image_1.jpeg',
		'assets/cover_image_2.jpg',
		'assets/cover_image_3.jpeg',
	];

	private slideInterval: any;

	ngOnInit(): void {
		this.startSlideShow();
	}

	ngOnDestroy(): void {
		if (this.slideInterval) {
			clearInterval(this.slideInterval);
		}
	}

	startSlideShow(): void {
		this.slideInterval = setInterval(() => {
			this.nextSlide();
		}, 5000); // Change slide every 5 seconds
	}

	nextSlide(): void {
		this.currentSlide = (this.currentSlide + 1) % this.slides.length;
	}

	setCurrentSlide(index: number): void {
		this.currentSlide = index;
		// Reset the timer when manually changing slides
		if (this.slideInterval) {
			clearInterval(this.slideInterval);
			this.startSlideShow();
		}
	}
}
