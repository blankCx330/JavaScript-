const searchTnput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const nameText = document.getElementById("creature-name");
const idText = document.getElementById("creature-id");
const weightText = document.getElementById("weight");
const heightText = document.getElementById("height");
const types = document.getElementById("types-container");
const hpText = document.getElementById("hp");
const attackText = document.getElementById("attack");
const defenseText = document.getElementById("defense");
const specialAttackText = document.getElementById("special-attack");
const specialDefenseText = document.getElementById("special-defense");
const speedText = document.getElementById("speed");
const hide = document.getElementById("hide");

hide.style.visibility = "hidden";

const data = fetch("https://rpg-creature-api.freecodecamp.rocks/api/creatures").then(response => response.json()).
then(data =>{
    console.log(data);
}).catch(error => console.error("请求失败: ", error));
