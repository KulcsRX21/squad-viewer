import { Component, effect, EventEmitter, Output } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CompetitionService } from '../competition/competition.service';
import { ClubsComponent } from '../club/clubs.component';
import { SquadService } from '../squad/squad.service';

@Component({
  selector: 'sv-sidenav',
  standalone: true,
  imports: [AsyncPipe, NgIf, FormsModule, ReactiveFormsModule,
    MatAutocompleteModule, MatIcon, MatIconButton, MatInput, MatSlideToggle, MatSuffix,
    ClubsComponent, MatLabel, MatFormField
  ],
  template: `
    <form>
      <mat-form-field style="width: 100%">
        <mat-label>Competition</mat-label>
        <input matInput
               [matAutocomplete]="auto"
               [formControl]="competitionCtrl">
        <button *ngIf="competitionCtrl.value"
                mat-icon-button matSuffix type="button"
                (click)="competitionCtrl.reset()">
          <mat-icon>close</mat-icon>
        </button>
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="competitionChosen.set($event.option.value)">
          @for (comp of filteredCompetitions | async; track comp.id) {
            <mat-option [value]="comp.name">
              <div class="logo-container">
                <img class="logo" [src]="comp.logo" height="30" alt="logo">
              </div>
              <span>{{ comp.name }}</span> |
              <small>{{ comp.country }}</small>
            </mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
    </form>
    <mat-slide-toggle [(ngModel)]="autoClose">Auto-close</mat-slide-toggle>
    <sv-clubs/>
  `,
  styles: `
    .logo-container { display: inline-block; text-align: right; min-width: 80px; }
    .logo { vertical-align: middle; margin-right: 8px; }
  `
})
export class SidenavComponent {
  private competitions = this.competitionService.getCompetitions();
  autoClose = true;
  competitionChosen = this.competitionService.competitionChosen;
  competitionCtrl = new FormControl('');
  filteredCompetitions = this.competitionCtrl.valueChanges.pipe(
    startWith(''),
    map(compFilter => (compFilter ?
      this.competitions.filter(comp => comp.name.toLowerCase().includes(compFilter.toLowerCase())) :
      this.competitions.slice())),
  );
  @Output() toggle = new EventEmitter();

  constructor(private competitionService: CompetitionService,
              private squadService: SquadService) {
    effect(() => {
      if (this.squadService.loadingSquad() && this.autoClose) {
        this.toggle.emit();
      }
    });
  }
}
