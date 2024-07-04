import {computed, inject, Injectable, signal} from '@angular/core';
import { Player } from './player.model';
import {HttpClient} from "@angular/common/http";
import {exhaustMap, filter, map, tap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {Club} from "./club.model";

@Injectable({ providedIn: 'root' })
export class SquadService {
  private transfermarktApi = inject(HttpClient);
  private transfermarktUrl = 'https://transfermarkt-api.fly.dev';

  clubChosen = signal<Club | undefined>(undefined);
  clubId = computed(() => this.clubChosen()?.id);
  clubName = computed(() => this.clubChosen()?.name);
  competitionChosen = signal('');

  squad$= toObservable(this.clubId).pipe(
    tap(clubId => console.log('club chosen', clubId)),
    filter(clubId => !!clubId),
    tap(clubId => console.log('fetching squad for club', clubId)),
    exhaustMap(clubId =>
      this.transfermarktApi
        .get<Players>(`${this.transfermarktUrl}/clubs/${clubId}/players`)
        .pipe(map(data =>
          data.players.sort((a, b) => a.name.localeCompare(b.name))))
    )
  );

  clubs$= toObservable(this.competitionChosen).pipe(
    tap(competition => console.log('competition chosen', competition)),
    filter(competition => !!competition),
    tap(competition => console.log('fetching clubs for competition', competition)),
    exhaustMap(competition =>
      this.transfermarktApi
        .get<Clubs>(`${this.transfermarktUrl}/competitions/${this.getCompetitionIdByName(competition)}/clubs`)
        .pipe(map(data =>
          data.clubs.sort((a, b) => a.name.localeCompare(b.name))),
        )
    )
  );

  private getCompetitionIdByName(name: string): string {
    switch (name) {
      case 'Bundesliga': return 'L1';
      case 'Premier League': return 'GB1';
      default: return '';
    }
  }
}

interface Clubs {
  clubs: Club[];
}

interface Players {
  players: Player[];
}
