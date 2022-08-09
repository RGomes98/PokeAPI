export interface PokeURLInfo {
  count: number;
  next: string;
  previous: string;
  results: PokeURL[];
}

export interface PokeURL {
  name: string;
  url: string;
}
