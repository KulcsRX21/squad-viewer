import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'sv-spinner',
  standalone: true,
  imports: [MatProgressSpinner],
  template: `
    <div class="spinner-container">
      <p>Loading {{ loadingSubject }}...</p>
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: `
    .spinner-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `
})
export class SpinnerComponent {
  @Input() loadingSubject: string = '';
}
