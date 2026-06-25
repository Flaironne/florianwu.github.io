import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  delay = input(0);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const el = this.el.nativeElement;
      const d = this.delay();

      el.classList.add('section-fade');

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-visible'), d);
            this.observer?.disconnect();
            this.observer = undefined;
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );
      this.observer.observe(el);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
