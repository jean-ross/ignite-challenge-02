import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { api } from "../services/api";

import '../styles/content.scss';

interface ContentProps {
  genreId: number;
}

interface GenreProps {
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({ genreId }: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({} as GenreProps);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreProps>(`genres/${genreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [genreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}