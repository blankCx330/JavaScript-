const searchTnput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const nameText = document.getElementById("creature-name");
const idText = document.getElementById("creature-id");
const weightText = document.getElementById("weight");
const heightText = document.getElementById("height");
const typesHtml = document.getElementById("types");
const hpText = document.getElementById("hp");
const attackText = document.getElementById("attack");
const defenseText = document.getElementById("defense");
const specialAttackText = document.getElementById("special-attack");
const specialDefenseText = document.getElementById("special-defense");
const speedText = document.getElementById("speed");
const hide = document.getElementById("hide");

const npcDataUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

hide.style.visibility = "hidden";

//const data = fetch("https://rpg-creature-api.freecodecamp.rocks/api/creature/").then(response => response.json()).catch(error => console.error("请求失败: ", error));


const fetchData = async (url) => {
    try {
        const data = await fetch(url);
        const dataJson = await data.json();
        return dataJson;
    } catch (error) {
        alert( "Creature not found");
    }
}

const updateText = data => {
    const {id, name, weight, height} = data;
    idText.textContent = "#" + id;
    nameText.textContent = name;
    weightText.textContent = weight;
    heightText.textContent = height;
    hide.style.visibility = "visible"
}

const updateTypes = data => {
    typesHtml.innerHTML = "";
    const {types} = data;
    for(let i = 0; i < types.length; i++){
        typesHtml.innerHTML += `<p>${types[i].name}</p>`;
    }
}

const updateNpcData = data => {
    const {stats} = data;
    hpText.textContent = stats[0].base_stat;
    attackText.textContent = stats[1].base_stat;
    defenseText.textContent = stats[2].base_stat;
    specialAttackText.textContent = stats[3].base_stat;
    specialDefenseText.textContent = stats[4].base_stat;
    speedText.textContent = stats[5].base_stat;
}

searchBtn.addEventListener("click", async () => {
    const searchValue = searchTnput.value;
    const url = npcDataUrl + searchValue;
    const npcData = await fetchData(url);
    updateText(npcData);
    updateTypes(npcData);
    updateNpcData(npcData);
})