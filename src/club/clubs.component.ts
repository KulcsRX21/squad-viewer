import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ClubService } from './club.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'sv-clubs',
  standalone: true,
  imports: [AsyncPipe, FormsModule,
    MatDivider, MatListModule, MatSlideToggle,
    SpinnerComponent
  ],
  template: `
    @if (clubs$ | async; as clubs) {
      @if (loadingClubs()) { <sv-spinner [loadingSubject]="'clubs'" /> }
      @else {
        <mat-slide-toggle [(ngModel)]="autoClose"
                          (change)="autoCloseChange.emit(autoClose)">
          Auto-close
        </mat-slide-toggle>
        <mat-selection-list role='list'>
          @for (club of clubs; track club) {
            <mat-list-item role='listitem'
                           [disabled]='clubChosen()?.id === club.id'
                           (click)='clubChosen.set(club)'>
              {{ club.name }}
            </mat-list-item>
            <mat-divider></mat-divider>
          }
        </mat-selection-list>
      }
    }
    @else if (loadingClubs()) { <sv-spinner [loadingSubject]="'clubs'" /> }
    @else { <p>↑ Choose a competition to see clubs</p> }
  `
})
export class ClubsComponent {
  private clubService = inject(ClubService);
  @Input() autoClose = true;
  @Output() autoCloseChange = new EventEmitter<boolean>();
  clubs$ = this.clubService.clubs$;
  clubChosen = this.clubService.clubChosen;
  loadingClubs = this.clubService.loadingClubs;
}
