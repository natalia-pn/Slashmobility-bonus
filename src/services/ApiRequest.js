const ENDPOINT = "https://itunes.apple.com/search?term=";

const fetchSongs = (query) => fetch(ENDPOINT + query).then(response => response.json());

export { fetchSongs };