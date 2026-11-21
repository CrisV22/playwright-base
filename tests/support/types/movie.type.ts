export interface MovieData {
  title: string;
  overview: string;
  company: string;
  release_year: string;
  featured: boolean;
  cover: string;
}

export interface MoviesFixture {
  create: MovieData;
  [movieName: string]: MovieData;
}
