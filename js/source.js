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

console.log(game);

document.querySelector("#game-name").textContent = game.name;

document.querySelector(".game-image img").src = game.image;

document.querySelector(".game-genre").textContent = game.genre;

document.querySelector(".game-meta").textContent =
    `${game.developer} - ${formatYearFromStr(game.release_date)}`;

}
load();  