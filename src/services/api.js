export const API_KEY = "7eb43c52aa3b21abe90b0d26e399e23e";
export const BASE_URL = "https://api.themoviedb.org/3";
export const OPTIONS = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWI0M2M1MmFhM2IyMWFiZTkwYjBkMjZlMzk5ZTIzZSIsIm5iZiI6MTcyNTU0MTgzMi42MTUxODIsInN1YiI6IjY2ZDlhNjViNGM4MDliZGMyY2ZjYzM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vfG8tqwDGK42fu9u0uaclNdTBcvKaZR__64vlNJGa-0",
  },
};

export async function fetchTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Erorr("Error fetching");
  }
  return await response.json();
}
