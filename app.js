"use strict"
let currentPokemon;

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    let currentPokemon = await response.json();
    console.log(currentPokemon);
    renderPokemoninfo(currentPokemon);
}

function renderPokemoninfo(currentPokemon){
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['front_shiny'];
}