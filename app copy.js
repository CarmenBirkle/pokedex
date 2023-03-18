
let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
let currentPokemons = [];
let response;
let singlePokemonResponse;
let offset = 0;
const limit = 20;


window.onscroll = function() {stickyNavbar()};


function stickyNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


async function loadPokemon(){
    // let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    response = await fetch(url);
    let responseToJson = await response.json();
    console.log('aktuelles response', responseToJson); // kann raus wenns passt
    renderPokemoninfo(responseToJson); 
}

function renderPokemoninfo(responseToJson){
    // let container = document.getElementById('pokemon-container')
    let container = document.getElementById('main-content')
    container.innerHTML = '';
    let results = responseToJson['results']

    for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    console.log(pokemon['name']); // kann raus wenns funzt
    console.log(pokemon['url']); // kann raus wenns funzt
    container.innerHTML += pokemonCard(pokemon);
    getSingelPokemonData(pokemon['url']);
    }    
}

async function getSingelPokemonData(url){
  // wenn daten vorhanden , dann jeweils das i. te Element von pokemon-url hier übergeben aus funktion oben drüber
  // let singelURL = 'https://pokeapi.co/api/v2/pokemon/11/'
  let singelURL = url;
  singlePokemonResponse = await fetch(singelURL);
  let responseToJson = await singlePokemonResponse.json();
  console.log('singel Response', responseToJson);
  console.log('name', responseToJson['name'],'id', responseToJson['id'], 'weight', responseToJson['weight'],
  'bild', responseToJson['sprites']['front_shiny']
  );
  // console.log(responseToJson.gender_rate);
  responseToJson['stats'].forEach(element => {
    console.log('stat-name:', element.stat.name, 'base-stat:', element.base_stat);
});

    responseToJson['types'].forEach(element =>{
      console.log('type ist:', element.type.name); // kann raus wenn es funktioniert
      const typeValue = element.type.name;
      getTypeAllocation(typeValue);

    });


}

function getTypeAllocation(typeValue){
  const svgFileObj = typeAllocation.find((obj) => obj.value === typeValue);
  const svgContainer = document.getElementById("img-container"); // hier noch die entsprechende id mit übergeben
  if (svgFileObj) {
    svgContainer.innerHTML = `<img src="${svgFileObj.file}">`;
  } else {
    svgContainer.innerHTML = "Keine passende SVG-Datei gefunden.";
  }
}



// JavaScript-Code


// SVG-Dateien und Zuordnungen definieren
// API-Wert auslesen (hier als Beispiel ein String "type2")
// const typeValue = "type2";

// SVG-Datei aus dem Array suchen
// const svgFileObj = typeAllocation.find((obj) => obj.value === typeValue);

// // SVG-Datei in das HTML-Element einfügen
// const svgContainer = document.getElementById("img-container"); // hier noch die entsprechende id mit übergeben
// if (svgFileObj) {
//   svgContainer.innerHTML = `<img src="${svgFileObj.file}">`;
// } else {
//   svgContainer.innerHTML = "Keine passende SVG-Datei gefunden.";
// }



// window-functions

window.addEventListener('scroll', () => {
    // Wenn das Ende des Dokuments erreicht wurde
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Erhöhen Sie den Offset-Wert, um weitere Pokémon zu laden
        offset += limit;
        loadPokemon();
    }

    // Wenn der Benutzer ganz oben auf der Seite ist
    if (window.scrollY === 0) {
        // Setzen Sie den Offset-Wert auf 0, um die ersten Pokémon zu laden
        offset = 0;
        loadPokemon();
    }
});

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







        // const ctx = document.getElementById('myChart');
        // const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
        // new Chart(ctx, 
        //     {
        //   type: 'bar',
        //   data: {
        //     labels:labels,
        //     datasets: [{

        //         axis: 'y',
        //         label: 'Pokemon State',
        //         borderRadius: 5,
        //         data: [65, 59, 80, 81, 56, 10],
        //         fill: false,
        //         backgroundColor: [
        //         'rgba(255, 99, 132, 0.2)',
        //         'rgba(255, 159, 64, 0.2)',
        //         'rgba(255, 205, 86, 0.2)',
        //         'rgba(75, 192, 192, 0.2)',
        //         'rgba(54, 162, 235, 0.2)',
        //         'rgba(153, 102, 255, 0.2)',
        //         'rgba(201, 203, 207, 0.2)'
        //         ],
        //         borderColor: [
        //         'rgb(255, 99, 132)',
        //         'rgb(255, 159, 64)',
        //         'rgb(255, 205, 86)',
        //         'rgb(75, 192, 192)',
        //         'rgb(54, 162, 235)',
        //         'rgb(153, 102, 255)',
        //         'rgb(201, 203, 207)'
        //         ],
        //         borderWidth: 1

              
        //     }]
        //   },
        //   options: {
        //     responsive: true,
        //     indexAxis: 'y',
        //     plugins: {
        //         legend: {
        //           display: false
        //         }
        //       },
        //     scales: {
        //       y: {
        //         beginAtZero: true
        //       }
        //     }
        //   }
        // }
        
        // );


 