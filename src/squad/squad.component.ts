import { Component, computed } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatBadge } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ClubService } from '../club/club.service';
import { SquadService } from './squad.service';
import { InitialsPipe } from './initials.pipe';
import { MarketValuePipe } from './market-value.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'sv-squad',
  standalone: true,
  imports: [AsyncPipe,
    MatBadge, MatTableModule, MatProgressSpinner, MatTooltip,
    InitialsPipe, MarketValuePipe, SpinnerComponent
  ],
  template: `
    @if (clubName()) { <h3>{{ clubName() }}</h3> }
    @else { <p class="hint">← Choose a club to view its squad</p> }
    @if (squad$ | async; as squad) {
      @if (loadingSquad()) { <sv-spinner [loadingSubject]="'squad'" /> }
      @else {
        <table mat-table [dataSource]="squad" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let player">
              @if (player.status === 'Team captain') {
                <div matBadge="C" matBadgeOverlap="false" matBadgePosition="before">
                  {{ player.name }}
                </div>
              } @else { {{ player.name }} }
            </td>
          </ng-container>
          <ng-container matColumnDef="position">
            <th mat-header-cell *matHeaderCellDef>Position</th>
            <td mat-cell *matCellDef="let player">
              <div [matTooltip]="player.position"
                   [matTooltipPosition]="'left'">
                {{ player.position | initials }}
              </div>
            </td>
          </ng-container>
          <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef>Age</th>
            <td mat-cell *matCellDef="let player">{{ player.age }}</td>
          </ng-container>
          <ng-container matColumnDef="marketValue">
            <th mat-header-cell *matHeaderCellDef>Market Value</th>
            <td mat-cell *matCellDef="let player">{{ player.marketValue | marketValue }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      }
    } @else if (loadingSquad()) { <sv-spinner [loadingSubject]="'squad'" /> }
  `,
  styles: '.hint { margin-top: 88px; }'
})
export class SquadComponent {
  clubName = computed(() => this.clubService.clubChosen()?.name);
  displayedColumns: string[] = ['name', 'position', 'age', 'marketValue'];
  loadingSquad = this.squadService.loadingSquad;
  squad$ = this.squadService.squad$;

  constructor(private clubService: ClubService,
              private squadService: SquadService) {}
}
