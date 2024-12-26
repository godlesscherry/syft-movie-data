"use client";

import { getGenereAndMovies } from "@/server/movies";
import MovieCard from "@/components/movie-card";
import { useEffect, useState, useRef } from "react";
import "preline/preline.js";

function MovieListCarousel({ movies }) {
    const carouselRef = useRef(null);

    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, []);

    const showCarousel = movies.length > 4;

    const handlePrevClick = () => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.querySelector('.hs-carousel-item').offsetWidth;
            carouselRef.current.scrollBy({
                left: -itemWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleNextClick = () => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.querySelector('.hs-carousel-item').offsetWidth;
            carouselRef.current.scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`hs-carousel relative w-full ${showCarousel ? '' : 'overflow-hidden'}`}>
            <div ref={carouselRef} className="hs-carousel-inner overflow-hidden flex">
                {movies.map((movie, idx) => (
                    <div key={idx} className="hs-carousel-item flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
            {showCarousel && (
                <>
                    <button onClick={handlePrevClick} className="hs-carousel-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                        &lt;
                    </button>
                    <button onClick={handleNextClick} className="hs-carousel-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                        &gt;
                    </button>
                </>
            )}
        </div>
    );
}

function LoadedGenres() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const genreData = await getGenereAndMovies();
                setGenres(genreData);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGenres();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            {genres.map((genre, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {genre.title}
                    </h2>
                    <MovieListCarousel movies={genre.movies} />
                </div>
            ))}
        </div>
    );
}

export default function GenreList() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="text-3xl font-bold mb-6">Movies by Genre</div>
            <LoadedGenres />
        </div>
    );
}