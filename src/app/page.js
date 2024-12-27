"use client";

import RecentMovies from "./movies/recent-movies";
import GenreList from "./movies/genre-list";
import PrelineScript from "../components/PrelineLoader";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function Home() {
  return (
    <FavoritesProvider>
      <main className="flex min-h-screen flex-col gap-6 items-center p-12 w-full">
        <PrelineScript />
        <div className="text-4xl font-bold mb-6">Welcome to Syft Movies</div>
        <div className="w-full">
          <RecentMovies />
        </div>
        <div className="w-full">
          <GenreList />
        </div>
      </main>
    </FavoritesProvider>
  );
}