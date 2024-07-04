import { Component, computed } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ClubService } from '../club/club.service';
import { SquadService } from './squad.service';

@Component({
  selector: 'sv-squad',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinner],
  template: `
    @if (!!clubName()) {
      <h3>{{ clubName() }}</h3>
      @if (loadingSquad()) { <mat-spinner /> }
      <table mat-table [dataSource]="squad$" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name</th>
          <td mat-cell *matCellDef="let player"> {{ player.name }}</td>
        </ng-container>
        <ng-container matColumnDef="age">
          <th mat-header-cell *matHeaderCellDef> Age</th>
          <td mat-cell *matCellDef="let player"> {{ player.age }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    }
  `
})
export class SquadComponent {
  clubName = computed(() => this.clubService.clubChosen()?.name);
  displayedColumns: string[] = ['name', 'age'];
  loadingSquad = this.squadService.loadingSquad;
  squad$ = this.squadService.squad$;

  constructor(private clubService: ClubService,
              private squadService: SquadService) {}
}
