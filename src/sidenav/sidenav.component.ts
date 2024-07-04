import {Component, effect, EventEmitter, Output} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {ClubsComponent} from "../club/clubs.component";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {CompetitionService} from "../competition/competition.service";
import {SquadService} from "../squad/squad.service";
import {map, startWith} from "rxjs";
import {Competition} from "../competition/competition.model";

@Component({
  selector: 'sv-sidenav',
  standalone: true,
  imports: [
    AsyncPipe,
    ClubsComponent,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSlideToggle,
    MatSuffix,
    NgIf,
    ReactiveFormsModule
  ],
  template: `
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
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="handleCompetitionChosen($event)">
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
    <mat-slide-toggle [(ngModel)]="autoClose">Auto-close</mat-slide-toggle>
    <sv-clubs />
  `,
  styles: `
    mat-sidenav { padding: 5px; width: 320px; }
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
export class SidenavComponent {
  private competitions = this.competitionService.getCompetitions();
  autoClose = true;
  @Output() toggle = new EventEmitter();

  constructor(private competitionService: CompetitionService,
              private squadService: SquadService) {
    effect(() => {
      if (squadService.loadingSquad() && this.autoClose) {
        this.toggle.emit();
      }
    });
  }

  handleCompetitionChosen(event: MatAutocompleteSelectedEvent) {
    this.competitionService.competitionChosen.set(event.option.value);
  }

  competitionCtrl = new FormControl('');
  filteredCompetitions = this.competitionCtrl.valueChanges.pipe(
    startWith(''),
    map(comp => (comp ? this._filterCompetitions(comp) : this.competitions.slice())),
  );

  private _filterCompetitions(value: string): Competition[] {
    const filterValue = value.toLowerCase();
    return this.competitions.filter(comp => comp.name.toLowerCase().includes(filterValue));
  }
}
