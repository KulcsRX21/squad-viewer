export interface Player {
  name: string;
  age: number;
  status?: string;
}

export interface Players {
  players: Player[];
}
