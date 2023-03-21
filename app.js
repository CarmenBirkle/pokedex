let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
let currentPokemons = [];
let responseToJson = [];
let allPokemonData = [];
let response;
let singlePokemonResponse;
let scrollPosition; 
let offset = 0;
let limit = 20;

// <<-  windows behaviour and functions  -->

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

// <--  main functions for loading pokemons -->
async function loadPokemon() {
  let pokemonArray = [];
  try {
    for (let i = offset + 1; i <= limit; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      let response = await fetch(url);
      let data = await response.json();
      pokemonArray.push(data);
    }
    handlePokemonData(pokemonArray)
  } catch (error) {
    console.error(error);
  }
}

function handlePokemonData(pokemonArray){
  pokemonArray.sort((a, b) => a.id - b.id);
    limit +=20;
    renderCards(pokemonArray);
    getType(pokemonArray);
}


function renderCards(pokemonArray){
  let container = document.getElementById('main-content')
  container.innerHTML ='';
  for (let i = 0; i < pokemonArray.length; i++) {
    container.innerHTML += pokemonCard(pokemonArray[i]);
  }
}

 
// finds the type for all cards and then calls a comparison for this type -> getTypeAllocation ( max.2 types)
function getType(pokemon) {
  for (let i = 0; i < pokemon.length; i++) {
    console.log(pokemon[i]['types']);
    let numTypesRendered = 0;
    pokemon[i]['types'].forEach(element => {
      if (numTypesRendered < 2) { // Only render first 2 types
        const typeValue = element.type.name;
        getTypeAllocation(pokemon[i]['id'], typeValue);
        numTypesRendered++;
      }
    });
  }
}

//compares the given type with the values from typeAllocation and determines the matching colour and image (all Cards)
function getTypeAllocation(id, typeValue) {
  const svgFileObj = typeAllocation.find((obj) => obj.value === typeValue);
  const svgContainer = document.getElementById("type"+id);
  if (svgFileObj) {
    svgContainer.innerHTML += typesHTML(svgFileObj);
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

//<--  all single card view functions  -->

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
    return;
  }
  singelPokemonData(singelResponseToJson)
}

function singelPokemonData(singelResponseToJson){
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

//compares the given type with the values from typeAllocation and determines the matching colour and image
function getDetailTypeAllocation(id, typeValue) {
  const svgFileObj = typeAllocation.find((obj) => obj.value === typeValue);
  const svgContainer = document.getElementById("type-detail"+id);
  if (svgFileObj) {
    svgContainer.innerHTML += singleTypesHTML(svgFileObj);
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

//<--  Helper-Functions  -->

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
  scrollPosition = window.pageYOffset; 
  showCard();
  loadSinglePokemon(id);
}

function showCard(){
  document.getElementById('overlay').classList.remove("d-none")
  document.getElementById('main-content').classList.add("d-none");
  document.getElementById('header').classList.add("d-none");
}

function closeByButton(){
  window.scrollTo(0, scrollPosition); 
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












 