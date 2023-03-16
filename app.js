
let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
let currentPokemons = [];
let response;
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
    console.log('aktuelles response', responseToJson);
    renderPokemoninfo(responseToJson);
}

function renderPokemoninfo(responseToJson){
    let container = document.getElementById('pokemon-container')
    container.innerHTML = '';
    let results = responseToJson['results']

    for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    console.log(pokemon['name']); // kann raus wenns funzt
    container.innerHTML += pokemonCard(pokemon);
    }    
}

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


        const ctx = document.getElementById('myChart');
        const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
        new Chart(ctx, 
            {
          type: 'bar',
          data: {
            labels:labels,
            datasets: [{

                axis: 'y',
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 10],
                fill: false,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
                borderWidth: 1

              
            }]
          },
          options: {
            indexAxis: 'y',
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
        
        );


       