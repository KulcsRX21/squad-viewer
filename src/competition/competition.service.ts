import {Injectable, signal} from '@angular/core';
import {Competition} from "./competition.model";

@Injectable({ providedIn: 'root' })
export class CompetitionService {

  competitionChosen = signal('');

  getCompetitions(): Competition[] {
    return this.COMPETITIONS;
  }

  getCompetitionIdByName(name: string): string {
    return this.COMPETITIONS.find(comp => comp.name === name)?.id ?? '';
  }

  private COMPETITIONS: Competition[] = [
    { id: 'L1', name: 'Bundesliga', country: 'Germany', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg' },
    { id: 'GB1', name: 'Premier League', country: 'England', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg' }
  ];
}
