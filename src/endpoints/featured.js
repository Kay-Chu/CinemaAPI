import axios  from "../api/axois.js";


let featuredMoviesCache;
let randArray;
let randMax;

function new_rand(max) {
  randMax = max;
  randArray = [];
  for (let i = 0; i <= randMax; i++) {
    randArray[i] = i;
  }
}

function rand() {
  const index = Math.floor(Math.random() * (randMax + 1));
  const result = randArray[index];
  randArray.splice(index,1);
  randMax--;
  return result;
}

async function pullFromAPI() {
  let options_Sifi = {
      method: 'GET',
      url: 'search/basic',
      params: {
        country: 'us',
        services: 'netflix,prime,hulu,disney',
        output_language: 'en',
        show_type: 'movie',
        genre: '878',
        show_original_language: 'en'
      }
  };
  let options_Fantasy = {
      method: 'GET',
      url: 'search/basic',
      params: {
        country: 'us',
        services: 'netflix,prime,hulu,disney',
        output_language: 'en',
        show_type: 'movie',
        genre: '14',
        show_original_language: 'en'
      }
  };
  let options_Thriller = {
      method: 'GET',
      url: 'search/basic',
      params: {
        country: 'us',
        services: 'netflix,prime,hulu,disney',
        output_language: 'en',
        show_type: 'movie',
        genre: '53',
        show_original_language: 'en'
      }
  };
  let options_Comedy = {
      method: 'GET',
      url: 'search/basic',
      params: {
        country: 'us',
        services: 'netflix,prime,hulu,disney',
        output_language: 'en',
        show_type: 'movie',
        genre: '35',
        show_original_language: 'en'
      }
  };
  let options_Romance = {
      method: 'GET',
      url: 'search/basic',
      params: {
        country: 'us',
        services: 'netflix,prime,hulu,disney',
        output_language: 'en',
        show_type: 'movie',
        genre: '10749',
        show_original_language: 'en'
      }
  };
  let options_Drama = {
      method: 'GET',
      url: 'search/basic',
      params: {
        country: 'us',
        services: 'netflix,prime,hulu,disney',
        output_language: 'en',
        show_type: 'movie',
        genre: '18',
        show_original_language: 'en'
      }
  };
  try {
      let response = [];
      let imdbIds = [];
      let res_Sifi = await axios.request(options_Sifi);
      for (let movie of res_Sifi.data['result']) {
        if (!imdbIds.includes(movie["imdbId"])) {
          response.push(movie);
          imdbIds.push(movie["imdbId"]);
        }
      }
      let res_Fantasy = await axios.request(options_Fantasy);
      for (let movie of res_Fantasy.data['result']) {
        if (!imdbIds.includes(movie["imdbId"])) {
          response.push(movie);
          imdbIds.push(movie["imdbId"]);
        }
      }
      let res_Thriller = await axios.request(options_Thriller);
      for (let movie of res_Thriller.data['result']) {
        if (!imdbIds.includes(movie["imdbId"])) {
          response.push(movie);
          imdbIds.push(movie["imdbId"]);
        }
      }
      let res_Comedy = await axios.request(options_Comedy);
      for (let movie of res_Comedy.data['result']) {
        if (!imdbIds.includes(movie["imdbId"])) {
          response.push(movie);
          imdbIds.push(movie["imdbId"]);
        }
      }
      let res_Romance = await axios.request(options_Romance);
      for (let movie of res_Romance.data['result']) {
        if (!imdbIds.includes(movie["imdbId"])) {
          response.push(movie);
          imdbIds.push(movie["imdbId"]);
        }
      }
      let res_Drama = await axios.request(options_Drama);
      for (let movie of res_Drama.data['result']) {
        if (!imdbIds.includes(movie["imdbId"])) {
          response.push(movie);
          imdbIds.push(movie["imdbId"]);
        }
      }
      console.log("used API once");
      return response;
  } catch (error) {
      throw error;
  }

}

async function getFeatured(num) {
  console.log("/featured accessed once");
  if (featuredMoviesCache == undefined) {
    featuredMoviesCache = await pullFromAPI();
  }
  let displayNumber = (num == undefined) ? 8 : Math.min(num,featuredMoviesCache.length);
  let response = [];
  new_rand(featuredMoviesCache.length - 1);
  for (let i = 0; i < displayNumber; i++) {
    response.push(featuredMoviesCache[rand()]);
  }
  return response;
}

export default getFeatured;