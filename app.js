
let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
let currentPokemons = [];
let response;
let singlePokemonResponse;

let offset = 0;
const limit = 20;


window.onscroll = function() {stickyNavbar()};

async function loadPokemon(){
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  response = await fetch(url);
  let responseToJson = await response.json();
  console.log('aktuelles response', responseToJson); // kann raus wenns funzt
  renderPokemoninfo(responseToJson); 
  offset += limit; // Erhöhe offset um limit, um die nächsten 20 Pokémon beim nächsten Laden zu erhalten
}

//Holt ein einzelnes Pokemon auf Basis der öffnenden Karte und ruft die Renderfunktion auf
async function loadSinglePokemon(id){ // for Detail Card
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let singleResponse = await fetch(url);
  let singelResponseToJson = await singleResponse.json();
  console.log(' Aufgerufen - aktuelles  Einzelnes response', singelResponseToJson); // kann raus wenns funzt
  renderSingelPokemonCard(singelResponseToJson);
  
  renderStats(singelResponseToJson);
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadPokemon();
  }
});


function stickyNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}



function renderPokemoninfo(responseToJson){
    let results = responseToJson['results']
    for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    console.log(pokemon['name']); // kann raus wenns funzt
    console.log(pokemon['url']); // kann raus wenns funzt
    getSingelPokemonData(pokemon['url']);
    }    
}

async function getSingelPokemonData(url){
  // wenn daten vorhanden , dann jeweils das i. te Element von pokemon-url hier übergeben aus funktion oben drüber
  let singelURL = url;
  let container = document.getElementById('main-content')
  // container.innerHTML = '';

  singlePokemonResponse = await fetch(singelURL);
  let responseToJson = await singlePokemonResponse.json();
  // console.log('singel Response', responseToJson);
  // console.log('name', responseToJson['name'],'id', responseToJson['id'], 'weight', responseToJson['weight'],
  // 'bild', responseToJson['sprites']['front_shiny']
  // );

  container.innerHTML += pokemonCard(responseToJson);
  // console.log(responseToJson.gender_rate);
  getType(responseToJson);
  renderStats(responseToJson);

}

// ermittelt den Type und ruft dann für jeden Typ den Vergleich getTypeAllocation auf
function getType(responseToJson){
  responseToJson['types'].forEach(element =>{
    console.log('type ist:', element.type.name);
    console.log('gehört zu pokemon:', responseToJson['id']) // kann raus wenn es funktioniert
    const typeValue = element.type.name;
    getTypeAllocation(responseToJson['id'], typeValue);

  });
}




function getTypeAllocation(id, typeValue) {
  const svgFileObj = typeAllocation.find((obj) => obj.value === typeValue);
  const svgContainer = document.getElementById("type"+id);
  if (svgFileObj) {
    svgContainer.innerHTML += `
      <div class="type-container">
        <div id="img-container" class="poke-type" style="background-color: ${svgFileObj.color}">
          <img src="${svgFileObj.file}">
        </div>
        <p>${svgFileObj.value}</p>
      </div>
    `;
  } else {
    svgContainer.innerHTML = "Keine passende SVG-Datei gefunden."; // kann ggf. raus testen - ansonsten per Log ?
  }
}




function openCard(id){
  document.getElementById('overlay').classList.remove("d-none")
  document.getElementById('main-content').classList.add("d-none");
  document.getElementById('header').classList.add("d-none");
  loadSinglePokemon(id);
}

function closeByButton(){
  document.getElementById('overlay').classList.add("d-none");
  document.getElementById('main-content').classList.remove("d-none");
  document.getElementById('header').classList.remove("d-none");
}

// //holt die einzelnen Statuswerte - diese muss ich noch in die Karte bringen
// function renderStats(singelResponseToJson){  
//   singelResponseToJson['stats'].forEach(element => {
//   console.log('stat-nameausFunktion:', element.stat.name, 'base-stat:', element.base_stat);

// });
// }

function renderStats(singelResponseToJson) {  
  console.log("renderStats aufgerufen:") // kann raus wenns funzt
  singelResponseToJson['stats'].forEach(element => {
    console.log('stat-nameausFunktion:', element.stat.name, 'base-stat:', element.base_stat); // ggf. raus
    console.log(document.getElementById("bar-special-attack")); // ggf. raus
    let statName = element.stat.name.toLowerCase(); // steckt den name aus den Array in stat Name
    let statValue = element.base_stat; // steckt den Wert aus dem Array in statVaule
    let statElement = document.getElementById(statName); // holt sich das id element 
    
    if (statElement) {
      statElement.textContent = statValue;
    }
  

  });
}

// function renderSingelStats(statName, baseStat){
//   let singelStats = document.getElementById('singleStats')
//   singelStats.innerHTML += singelStats(statName, baseStat);
  
//   const barId = getBarId(statName);
//   if (barId) {
//     const barElement = document.getElementById(barId);
//     if (barElement) {
//       barElement.style.width = `${baseStat}%`;
//     }
//   }
// }






function shortenStatName(statName) { // brauch ich ev. nicht mehr
  switch (statName) {
    case "hp":
      return "HP";
    case "attack":
      return "ATK";
    case "defense":
      return "DEF";
    case "special-attack":
      return "SPA";
    case "special-defense":
      return "SPD";
    case "speed":
      return "SP";
    default:
      return statName.toUpperCase();
  }
} 



function renderSingelPokemonCard(singelResponseToJson){
  let pokemonSingleCard = document.getElementById('overlay');
  pokemonSingelCard = '';
  pokemonSingleCard.innerHTML = pokemonDetailCard(singelResponseToJson);
}

function forward(id){
  if (id === 1008){
    loadSinglePokemon(id);
    setTimeout(function() {  // blendet den zurück button mit iener verzögerung von 100ms aus, wenn man beim ersten Pokemon angekommen ist
      document.getElementById('forward').classList.add('d-none');
    }, 100);
  }
  else {
    loadSinglePokemon(id);
  }
}

function backwards(id){
  if (id === 1){
    loadSinglePokemon(id);
    setTimeout(function() {  // blendet den zurück button mit iener verzögerung von 100ms aus, wenn man beim ersten Pokemon angekommen ist
      document.getElementById('back').classList.add('d-none');
    }, 100);
  }
  else {
    loadSinglePokemon(id);
  }
}  





 