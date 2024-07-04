import { Injectable } from '@angular/core';
import {Competition} from "./competition.model";

@Injectable({ providedIn: 'root' })
export class CompetitionService {

  getCompetitions(): Competition[] {
    return this.COMPETITIONS;
  }

  private COMPETITIONS = [
    { id: 'L1', name: 'Bundesliga', country: 'Germany', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg' },
    { id: 'GB1', name: 'Premier League', country: 'England', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg' }
  ];
}
