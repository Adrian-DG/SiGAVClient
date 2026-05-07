import { Component, OnInit, OnDestroy } from '@angular/core';

interface ICarouselSlide {
	url: string;
	title: string;
	description: string;
}

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
	currentSlide = 0;
	isPlaying = true;
	isCarouselHovered = false;

	readonly slides: ICarouselSlide[] = [
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

	private slideInterval: ReturnType<typeof setInterval> | null = null;
	private readonly slideDurationMs = 4000;

	ngOnInit(): void {
		this.restartSlideShow();
	}

	ngOnDestroy(): void {
		this.clearSlideShow();
	}

	private restartSlideShow(): void {
		this.clearSlideShow();

		if (!this.canAutoSlide()) {
			return;
		}

		this.slideInterval = setInterval(() => {
			this.nextSlide(false);
		}, this.slideDurationMs);
	}

	private clearSlideShow(): void {
		if (this.slideInterval) {
			clearInterval(this.slideInterval);
			this.slideInterval = null;
		}
	}

	private canAutoSlide(): boolean {
		return (
			this.isPlaying && !this.isCarouselHovered && this.slides.length > 1
		);
	}

	nextSlide(restartTimer = true): void {
		if (!this.slides.length) {
			return;
		}

		this.currentSlide = (this.currentSlide + 1) % this.slides.length;

		if (restartTimer) {
			this.restartSlideShow();
		}
	}

	previousSlide(): void {
		if (!this.slides.length) {
			return;
		}

		this.currentSlide =
			this.currentSlide === 0
				? this.slides.length - 1
				: this.currentSlide - 1;

		this.restartSlideShow();
	}

	setCurrentSlide(index: number): void {
		if (index < 0 || index >= this.slides.length) {
			return;
		}

		this.currentSlide = index;
		this.restartSlideShow();
	}

	togglePlayPause(): void {
		this.isPlaying = !this.isPlaying;
		this.restartSlideShow();
	}

	onCarouselMouseEnter(): void {
		this.isCarouselHovered = true;
		this.clearSlideShow();
	}

	onCarouselMouseLeave(): void {
		this.isCarouselHovered = false;
		this.restartSlideShow();
	}

	trackBySlide(index: number): number {
		return index;
	}
}
