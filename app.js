let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
let currentPokemons = [];
let response;
let singlePokemonResponse;
let scrollPosition; 
let offset = 0;
const limit = 20;

// windows behaviour and functions

window.onscroll = function() {stickyNavbar()};

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

// asyn functions to load data from api for all pokemons
//TODO console log raus
async function loadPokemon(){
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  response = await fetch(url);
  // console.log(response);
  let responseToJson = await response.json();
  // console.log(responseToJson);
  renderPokemoninfo(responseToJson); 
  offset += limit; // increases offset (limit) by 20 
}

//gets the url for each pokemon and passes it to the function getSingelPokemonData for rendering
async function renderPokemoninfo(responseToJson){ // async kann eigentlich raus oder ?
    let results = responseToJson['results']
    for (let i = 0; i < results.length; i++) {
      const pokemon = results[i];
      getSingelPokemonData(pokemon['url']);
    }    
}

//TODO wichtig - nicht container.innerHTML = '' verwenden, sonst werden die ersten Pokemons wieder gelöscht
// Vermute hier ist mein Fehler ? 
async function getSingelPokemonData(url){
  let singelURL = url;
  let container = document.getElementById('main-content')
  singlePokemonResponse = await fetch(singelURL);
  let responseToJson = await singlePokemonResponse.json();
  container.innerHTML += pokemonCard(responseToJson);
  getType(responseToJson);
  renderStats(responseToJson);
}

// finds the type for all cards and then calls a comparison for this type -> getTypeAllocation ( max.2 types)
function getType(responseToJson){
  let numTypesRendered = 0;
  responseToJson['types'].forEach(element =>{
    if (numTypesRendered < 2) { // Only render first 2 types
      const typeValue = element.type.name;
      getTypeAllocation(responseToJson['id'], typeValue);
      numTypesRendered++;
    }
  });
}

//TODO - noch kürzen, ggf. else raus!
//compares the given type with the values from typeAllocation and determines the matching colour and image (all Cards)
function getTypeAllocation(id, typeValue) {
  const svgFileObj = typeAllocation.find((obj) => obj.value === typeValue);
  const svgContainer = document.getElementById("type"+id);
  if (svgFileObj) {
    svgContainer.innerHTML += `
      <div class="type-container">
        <div id="img-container" class="poke-type" style="background-color: ${svgFileObj.color}">
          <img src="${svgFileObj.file}">
        </div>
        <p>${capitalizeFirstLetter(svgFileObj.value)}</p>
      </div>
    `;
  } else {
    svgContainer.innerHTML = "Keine passende SVG-Datei gefunden."; // kann ggf. raus testen - ansonsten per Log ?
  }
}

//compares and replaces the statistical data
function renderStats(singelResponseToJson) {  
  renderKeyFramesforStats(singelResponseToJson);
  singelResponseToJson['stats'].forEach(element => {
    let statName = element.stat.name.toLowerCase();
    let statValue = element.base_stat;
    let statElement = document.getElementById(statName);
    if (statElement) { // if an id tag exists, the text is replaced with the stat value
      statElement.textContent = statValue; 
      let barElement = document.getElementById('bar-'+statName);
      if (barElement) { // if an id tag exists, the inline style (width) is replaced with the stat value
        barElement.style.width = statValue + '%'; 
      }
    }
  });
}


// all single card view functions

//TODO kürzen
//Fetches the data of a specific pokemon for the single view
async function loadSinglePokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let singelResponseToJson;

  try {
    const singleResponse = await fetch(url);

    if (!singleResponse.ok) {
      throw new Error(`Pokemon ${id} wurde nicht gefunden, hast Du Dich vielleicht verschrieben?`);
    }

    singelResponseToJson = await singleResponse.json();
  } catch (error) {
    alert(error.message);
    console.error(error);
    return;
  }

  renderSingelPokemonCard(singelResponseToJson);
  renderStats(singelResponseToJson);
  getDetailType(singelResponseToJson);
  showCard();
}

function renderSingelPokemonCard(singelResponseToJson){
  let pokemonSingleCard = document.getElementById('overlay');
  pokemonSingelCard = '';
  pokemonSingleCard.innerHTML = pokemonDetailCard(singelResponseToJson);
}

function forward(id){
  if (id === 1008){
    loadSinglePokemon(id);
    setTimeout(function() {  //Hides the forward button with a delay of 100ms when you have reached the last Pokemon.
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
    setTimeout(function() {  // Hides the back button with a delay of 100ms when you have reached the first Pokemon.
      document.getElementById('back').classList.add('d-none');
    }, 100);
  }
  else {
    loadSinglePokemon(id);
  }
}  

// finds the type for the single card view and then calls a comparison for this type -> getTypeAllocation (max. 2 types)
function getDetailType(responseToJson){
  let numTypesRendered = 0;
  responseToJson['types'].forEach(element =>{
    if (numTypesRendered < 2) { // Only render first 2 types
    const typeValue = element.type.name;
    getDetailTypeAllocation(responseToJson['id'], typeValue);
    numTypesRendered++;
    }
  });
}

//TODO - noch kürzen, ggf. else raus!
//compares the given type with the values from typeAllocation and determines the matching colour and image
function getDetailTypeAllocation(id, typeValue) {
  const svgFileObj = typeAllocation.find((obj) => obj.value === typeValue);
  const svgContainer = document.getElementById("type-detail"+id);
  if (svgFileObj) {
    svgContainer.innerHTML += `
        <div class="type-container-detail">
          <div class="poke-type-detail" style="background-color: ${svgFileObj.color}">
            <img src="${svgFileObj.file}">
          </div>
          
          <p>${capitalizeFirstLetter(svgFileObj.value)}</p>

        </div>
    `;
  } else {
    svgContainer.innerHTML = "Keine passende SVG-Datei gefunden."; // kann ggf. raus testen - ansonsten per Log ?
  }
}

//renders individual keyframes for the dynamic stat values
function renderKeyFramesforStats (singelResponseToJson) {
  const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  let keyFramesHTML = '';
  singelResponseToJson['stats'].forEach(element => {
    let statName = element.stat.name.toLowerCase();
    let statValue = element.base_stat;
    if (statNames.includes(statName)) {
      keyFramesHTML += keyFrameHTML(statName, statValue);
    }
  });
  document.getElementById('keyframe').innerHTML = keyFramesHTML;
}



// Helper-Functions

//searches for the pokemon on the basis of the choosen number
function searchByNumber(){
  const inputValue = document.getElementById('input-nr').value;
  loadSinglePokemon(inputValue);
  document.getElementById('input-nr').value = '';
}


// searches for the pokemon based on the name 
function searchByName(){
  const inputValue = document.getElementById('input-name').value.toLowerCase();
  loadSinglePokemon(inputValue);
  document.getElementById('input-name').value = '';
}

function openCard(id){
  scrollPosition = window.pageYOffset; // TODO: nochmas probieren - geht noch nicht auf allen Geräten WHY?
  showCard();
  loadSinglePokemon(id);
}

function showCard(){
  document.getElementById('overlay').classList.remove("d-none")
  document.getElementById('main-content').classList.add("d-none");
  document.getElementById('header').classList.add("d-none");
}

function closeByButton(){
  window.scrollTo(0, scrollPosition); //  TODO: nochmas probieren - geht noch nicht auf allen Geräten WHY? 
  document.getElementById('overlay').classList.add("d-none");
  document.getElementById('main-content').classList.remove("d-none");
  document.getElementById('header').classList.remove("d-none");  
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function scrollToTop() {
  window.scrollTo(0, 0);
}












 