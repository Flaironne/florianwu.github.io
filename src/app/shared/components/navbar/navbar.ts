import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  afterNextRender,
  signal,
  inject,
  NgZone,
} from '@angular/core';

interface NavLink {
  label: string;
  href: string;
  section: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
})
export class NavbarComponent implements OnDestroy {
  private zone = inject(NgZone);

  isScrolled = signal(false);
  activeSection = signal('hero');
  isMenuOpen = signal(false);

  readonly navLinks: NavLink[] = [
    { label: 'À propos', href: '#about', section: 'about' },
    { label: 'Projets', href: '#projects', section: 'projects' },
    { label: 'Expérience', href: '#experience', section: 'experience' },
    { label: 'Contact', href: '#contact', section: 'contact' },
  ];

  private scrollListener?: () => void;
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.scrollListener = () => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== this.isScrolled()) {
          this.zone.run(() => this.isScrolled.set(scrolled));
        }
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });

      this.observer = new IntersectionObserver(
        (entries) => {
          const top = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (top && top.target.id !== this.activeSection()) {
            this.zone.run(() => this.activeSection.set(top.target.id));
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0.5 },
      );

      document
        .querySelectorAll('section[id]')
        .forEach((s) => this.observer!.observe(s));
    });
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    this.observer?.disconnect();
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
