import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ClubService } from './club.service';

@Component({
  selector: 'sv-clubs',
  standalone: true,
  imports: [AsyncPipe, MatDivider, MatListModule, MatProgressSpinner],
  template: `
    @if (loadingClubs()) { <mat-spinner /> }
    <mat-selection-list role='list' [hidden]='loadingClubs()'>
      @for (club of clubs$ | async; track club) {
        <mat-list-item role='listitem'
                       [disabled]='clubChosen()?.id === club.id'
                       (click)='clubChosen.set(club)'>
          {{ club.name }}
        </mat-list-item>
        <mat-divider></mat-divider>
      }
    </mat-selection-list>
  `
})
export class ClubsComponent {
  private clubService = inject(ClubService);
  clubs$ = this.clubService.clubs$;
  clubChosen = this.clubService.clubChosen;
  loadingClubs = this.clubService.loadingClubs;
}
