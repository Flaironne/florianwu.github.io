import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                 bg-zinc-800 text-zinc-300 border border-zinc-700
                 hover:border-emerald-400/40 transition-colors duration-200">
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {}
