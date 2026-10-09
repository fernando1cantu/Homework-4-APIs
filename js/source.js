// *********************************************************************
// Homework 4 Public APIs
// *********************************************************************

function formatYearFromStr(dateString) {
  return dateString.split('-')[0];
}

function formatPercentage(value) {
  return `${(value * 100).toFixed(2)}%`;
}

localStorage.setItem("game_id", "442240");
localStorage.setItem("api_key", "d33c05a44a3849029a69dde5a41db2cc");


async function load(){
    
    // add as many more as needed
    let gameID = localStorage.getItem("game_id");
    let apiKey = localStorage.getItem("api_key");
    
    // **************** Write you code below **************** 


const response = await fetch(
    `https://api.gamebrain.co/v1/games/${gameID}?api-key=${apiKey}`
);

const game = await response.json();

document.querySelector("#game-name").textContent = game.name;

document.querySelector(".game-image img").src = game.image;

document.querySelector(".game-genre").textContent = game.genre;

document.querySelector(".game-meta").textContent =
    `${game.developer} - ${formatYearFromStr(game.release_date)}`;



const newsResponse = await fetch(
    `https://api.gamebrain.co/v1/games/${gameID}/news?api-key=${apiKey}`
);

const newsData = await newsResponse.json();


const newsCards = document.querySelectorAll(".news-card");

newsData.news.slice(0, 3).forEach((article, index) => {
    newsCards[index].querySelector("img").src = article.image;
    newsCards[index].querySelector("h3").textContent = article.title;
    newsCards[index].querySelector(".news-published").textContent =
        `Published ${article.published}`;
});

const similarResponse = await fetch(
    `https://api.gamebrain.co/v1/games/${gameID}/similar?api-key=${apiKey}`
);

const similarData = await similarResponse.json();


const gameCards = document.querySelectorAll(".game-card");

similarData.results.slice(0, 4).forEach((similarGame, index) => {

    gameCards[index].querySelector("img").src = similarGame.screenshots[0];

    gameCards[index].querySelector("h3").textContent = similarGame.name;

    const gameMeta = gameCards[index].querySelectorAll(".game-card-meta span");

    gameMeta[0].textContent = Math.trunc(similarGame.year);

    gameMeta[1].textContent =
        formatPercentage(similarGame.rating.mean);
});

}

load();  