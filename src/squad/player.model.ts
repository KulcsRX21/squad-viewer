export interface Player {
  age: number;
  marketValue?: string;
  name: string;
  position: string;
  status?: string;
}

export interface Players {
  players: Player[];
}
