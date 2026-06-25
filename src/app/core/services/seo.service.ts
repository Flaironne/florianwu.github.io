import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const DEFAULTS: Required<SeoConfig> = {
  title: 'Florian Wu — Software Engineer · IA & Big Data',
  description:
    "MSc EPITECH spécialisé IA & Big Data. 2 ans d'expérience full-stack en alternance (React, TypeScript, Node.js, Python). Disponible en CDI — octobre 2026.",
  url: 'https://flaironne.github.io',
  image: 'https://flaironne.github.io/og-image.png',
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleSvc = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  update(config: SeoConfig = {}): void {
    const { title, description, url, image } = { ...DEFAULTS, ...config };

    this.titleSvc.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }
}
