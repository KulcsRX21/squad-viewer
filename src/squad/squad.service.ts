import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, filter, map, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Players } from './player.model';
import { ClubService } from '../club/club.service';

@Injectable({ providedIn: 'root' })
export class SquadService {
  loadingSquad = signal(false);

  constructor(private http: HttpClient,
              private clubService: ClubService) {}

  squad$= toObservable(this.clubService.clubChosen).pipe(
    filter(club => !!club),
    tap(club => {
      console.log('fetching squad for club', club!.name);
      this.loadingSquad.set(true);
    }),
    map(club =>
      `https://transfermarkt-api.fly.dev/clubs/${club!.id}/players`),
    exhaustMap(playersUrl => this.http.get<Players>(playersUrl).pipe(
      map(data => data.players.sort((a, b) => a.name.localeCompare(b.name)))),
    ),
    tap(() => this.loadingSquad.set(false))
  );
}
