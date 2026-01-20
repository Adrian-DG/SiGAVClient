import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
	currentSlide = 0;
	isPlaying = true;
	isPaused = false;

	slides = [
		{
			url: 'assets/cover_image.jpeg',
			title: 'Asistencia Vial 24/7',
			description: 'Servicio de emergencia disponible las 24 horas',
		},
		{
			url: 'assets/cover_image_1.jpeg',
			title: 'Tecnología Avanzada',
			description: 'Sistema de gestión moderno y eficiente',
		},
		{
			url: 'assets/cover_image_2.jpg',
			title: 'Servicio Confiable',
			description: 'Profesionales capacitados para cualquier emergencia',
		},
		{
			url: 'assets/cover_image_3.jpeg',
			title: 'Cobertura Nacional',
			description: 'Presencia en todo el territorio nacional',
		},
	];

	private slideInterval: any;
	private readonly SLIDE_DURATION = 4000; // 4 seconds

	ngOnInit(): void {
		this.startSlideShow();
	}

	ngOnDestroy(): void {
		if (this.slideInterval) {
			clearInterval(this.slideInterval);
		}
	}

	startSlideShow(): void {
		if (this.slideInterval) {
			clearInterval(this.slideInterval);
		}
		this.slideInterval = setInterval(() => {
			if (!this.isPaused) {
				this.nextSlide();
			}
		}, this.SLIDE_DURATION);
		this.isPlaying = true;
	}

	stopSlideShow(): void {
		if (this.slideInterval) {
			clearInterval(this.slideInterval);
			this.slideInterval = null;
		}
		this.isPlaying = false;
	}

	pauseSlideShow(): void {
		this.isPaused = true;
	}

	resumeSlideShow(): void {
		this.isPaused = false;
	}

	nextSlide(): void {
		this.currentSlide = (this.currentSlide + 1) % this.slides.length;
	}

	previousSlide(): void {
		this.currentSlide =
			this.currentSlide === 0
				? this.slides.length - 1
				: this.currentSlide - 1;
	}

	setCurrentSlide(index: number): void {
		this.currentSlide = index;
		// Reset the timer when manually changing slides
		if (this.isPlaying) {
			this.startSlideShow();
		}
	}

	togglePlayPause(): void {
		if (this.isPlaying) {
			this.stopSlideShow();
		} else {
			this.startSlideShow();
		}
	}

	// Carousel event handlers
	onCarouselMouseEnter(): void {
		this.pauseSlideShow();
	}

	onCarouselMouseLeave(): void {
		this.resumeSlideShow();
	}

	// Get current slide data
	getCurrentSlide() {
		return this.slides[this.currentSlide];
	}
}
