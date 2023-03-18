
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

// async function loadPokemon(){
//   let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
//   response = await fetch(url);
//   let responseToJson = await response.json();
//   console.log('aktuelles response', responseToJson); // kann raus wenns funzt
//   renderPokemoninfo(responseToJson); 
// }

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
  container.innerHTML = '';

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

//holt die einzelnen Statuswerte - diese muss ich noch in die Karte bringen
function renderStats(responseToJson){  
  responseToJson['stats'].forEach(element => {
  console.log('stat-nameausFunktion:', element.stat.name, 'base-stat:', element.base_stat);

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
    svgContainer.innerHTML = "Keine passende SVG-Datei gefunden.";
  }
}







// window-functions

// window.addEventListener('scroll', () => {
//     // Wenn das Ende des Dokuments erreicht wurde
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         // Erhöhen Sie den Offset-Wert, um weitere Pokémon zu laden
//         offset += limit;
//         loadPokemon();
//     }

//     // Wenn der Benutzer ganz oben auf der Seite ist
//     if (window.scrollY === 0) {
//         // Setzen Sie den Offset-Wert auf 0, um die ersten Pokémon zu laden
//         offset = 0;
//         loadPokemon();
//     }
// });



// window.addEventListener('scroll', () => {
  
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    

//         loadPokemon();
//     }
// });



// window.addEventListener('scroll', async () => {
//   const scrollPosition = window.innerHeight + window.scrollY;
//   const bodyHeight = document.body.offsetHeight;

//   // Wenn das Ende des Dokuments erreicht wurde
//   if (scrollPosition >= bodyHeight) {
//     // Erhöhen Sie den Offset-Wert, um weitere Pokémon zu laden
//     await appendPokemonInfo();
//   }
// });



function openCard(){
  document.getElementById('overlay').classList.remove("d-none")
  document.getElementById('main-content').classList.add("d-none");
  document.getElementById('header').classList.add("d-none");
}

function closeByButton(){
  document.getElementById('overlay').classList.add("d-none");
  document.getElementById('main-content').classList.remove("d-none");
  document.getElementById('header').classList.remove("d-none");
}


 