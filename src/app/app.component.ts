import {Component, inject} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SquadComponent } from '../squad/squad.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {SquadService} from "../squad/squad.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, startWith} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {CompetitionService} from "../squad/competition.service";
import {Competition} from "../squad/competition.model";
import {Club} from "../squad/club.model";

@Component({
  selector: 'sv-app',
  standalone: true,
  imports: [
    MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIcon, MatInput, MatListModule, MatSidenavModule, MatToolbarModule,
    SquadComponent, AsyncPipe, ReactiveFormsModule, NgIf
  ],
  template: `
    <div class="app-container">
      <mat-toolbar>
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Squad Viewer</span>
      </mat-toolbar>
      <mat-sidenav-container>
        <mat-sidenav #sidenav mode="side" [(opened)]="clubsOpened">
          <form class="example-form">
            <mat-form-field class="example-full-width">
              <mat-label>Competition</mat-label>
              <input matInput
                     [matAutocomplete]="auto"
                     [formControl]="competitionCtrl">
              <button
                *ngIf="competitionCtrl.value"
                mat-icon-button
                matSuffix
                type="button"
                (click)="competitionCtrl.reset()"
              >
                <mat-icon>close</mat-icon>
              </button>
              <mat-autocomplete #auto="matAutocomplete" (optionSelected)="competitionChosen.set($event.option.value)">
                @for (comp of filteredCompetitions | async; track comp.id) {
                  <mat-option [value]="comp.name" >
                    <img alt="" class="example-option-img" [src]="comp.logo" height="25">
                    <span>{{ comp.name }}</span> |
                    <small>{{ comp.country }}</small>
                  </mat-option>
                }
              </mat-autocomplete>
            </mat-form-field>
          </form>
          <mat-selection-list role="list">
            @for (club of clubs$ | async; track club) {
              <mat-list-item role="listitem"
                             [disabled]="clubId() === club.id"
                             (click)="handleClubChosen(club)">
                {{ club.name }}
              </mat-list-item>
              <mat-divider></mat-divider>
            }
          </mat-selection-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <sv-squad/>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: `
    .app-container{
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    mat-sidenav-container { flex: 1; }
    mat-sidenav { padding: 5px; width: 320px; }
    mat-sidenav-content { padding: 10px; }
    .example-form {
      min-width: 150px;
      max-width: 320px;
      width: 100%;
    }

    .example-full-width {
      width: 100%;
    }

    .example-option-img {
      vertical-align: middle;
      margin-right: 8px;
    }

    [dir='rtl'] .example-option-img {
      margin-right: 0;
      margin-left: 8px;
    }

  `
})
export class AppComponent {
  private competitions = inject(CompetitionService).getCompetitions();
  private squadService = inject(SquadService);

  competitionChosen = this.squadService.competitionChosen;
  clubs$ = this.squadService.clubs$;
  clubId = this.squadService.clubId;
  clubsOpened = true;

  competitionCtrl = new FormControl('');
  filteredCompetitions = this.competitionCtrl.valueChanges.pipe(
      startWith(''),
      map(comp => (comp ? this._filterCompetitions(comp) : this.competitions.slice())),
    );

  handleClubChosen(club: Club) {
    this.squadService.clubChosen.set(club);
    this.clubsOpened = false;
  }

  private _filterCompetitions(value: string): Competition[] {
    const filterValue = value.toLowerCase();
    return this.competitions.filter(comp => comp.name.toLowerCase().includes(filterValue));
  }
}
