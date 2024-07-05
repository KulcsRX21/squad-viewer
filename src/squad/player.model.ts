export interface Player {
  name: string;
  age: number;
  marketValue: string;
  status?: string;
}

export interface Players {
  players: Player[];
}
