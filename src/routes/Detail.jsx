import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const getMovie = async () => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );
      const json = await response.json();
      setMovie(json.data.movie);
      setLoading(false);
    } catch (error) {
      console.log("로딩에러", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovie();
  }, [id]);

  if (loading) {
    return <h1>Loading movie info</h1>;
  }
  if (!movie) {
    return <h1>Movie not found</h1>;
  }
  return (
    <div>
      <h1>{movie.title_long || movie.title}</h1>;
      <img src={movie.medium_cover_image} alt={movie.title} />;
      <p>{movie.description_full}</p>
      <ul>
        {movie.genres &&
          Array.isArray(movie.genres) &&
          movie.genres.map((g) => <li key={g}>{g}</li>)}
      </ul>
    </div>
  );
}

export default Detail;

//   const { id } = useParams();

//   const getMovie = async () => {
//     const json = await (
//       await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
//     ).json();
//     console.log(json);
//   };
//   useEffect(() => {
//     getMovie();
//   }, []);
//   return <h1>Deatail</h1>;
// } 니코,코드
