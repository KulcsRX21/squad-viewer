import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, filter, map, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Club, Clubs } from './club.model';
import { CompetitionService } from '../competition/competition.service';

@Injectable({ providedIn: 'root' })
export class ClubService {
  clubChosen = signal<Club | undefined>(undefined);
  loadingClubs = signal(false);

  constructor(private http: HttpClient,
              private competitionService: CompetitionService) {}

  clubs$= toObservable(this.competitionService.competitionChosen).pipe(
    filter(competition => !!competition),
    tap(competition => {
      console.log('fetching clubs for competition', competition);
      this.loadingClubs.set(true);
    }),
    map(competition =>
      `https://transfermarkt-api.fly.dev/competitions/${this.competitionService.getCompetitionIdByName(competition)}/clubs`),
    exhaustMap(clubsUrl => this.http.get<Clubs>(clubsUrl).pipe(
      map(data => data.clubs.sort((a, b) => a.name.localeCompare(b.name)))),
    ),
    tap(() => this.loadingClubs.set(false))
  );
}
