import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SquadService } from './squad.service';
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'sv-squad',
  standalone: true,
  imports: [MatTableModule, NgIf, AsyncPipe],
  template: `
    @if (!currentSquad()) {
      <h3>Select a club to view its squad</h3>
    }
    @else {
      <h3>{{ currentSquad() }}</h3>
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
  private service = inject(SquadService);
  squad$ = this.service.squad$;
  currentSquad = this.service.clubName;

  displayedColumns: string[] = ['name', 'age'];
}
