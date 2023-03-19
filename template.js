function pokemonCard (pokemon) {
    return `
    <div onclick="openCard(${pokemon['id']})" class="card">
        <div class="card-top">
            <h2># ${String(pokemon['id']).padStart(3, "0")}</h2>
            <img class="pokemon-img" src="${pokemon['sprites']['other']['home']['front_default']}" alt="${pokemon['name']}">
            <img class="background-img" src="./img/pokeball.png" alt="pokeball" style="width:100%">
        </div>
        <div class="container">
            <div class="pokemon-name">${pokemon['name']}</div>

            <div id="type${pokemon['id']}" class="flex"></div>

            <div id="about" >
                <div class="stats-about">
                    <p> Gewicht</p> <p>${(pokemon['weight'] / 100).toFixed(2).replace(".", ",") } kg</p>
                </div>
                <div class="stats-about">
                    <p> Größe</p> <p>${(pokemon['height'] / 100).toFixed(2).replace(".", ",")} m</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function pokemonDetailCard(singelPokemon){
    return `
    <img class="pokeball-background" src="./img/pokeball.png" alt="pokeball">
    <div id="card-detail" class="card card-detail">
    <div class="card-top">
        <h2># ${String(singelPokemon['id']).padStart(3, "0")}</h2>
        <img class="pokemon-img-detail" src="${singelPokemon['sprites']['other']['home']['front_default']}" alt="${singelPokemon['name']}">
        <img class="background-img" src="./img/pokeball.png" alt="pokeball">
        <img onclick="closeByButton()" class="close"src="./img/close.png" alt="close">
        
        <img id="back" onclick="backwards(${singelPokemon['id']-1})" class="back" src="./img/left.png" alt="back">
        <img  id="forward" onclick="forward(${singelPokemon['id']+1})" class="forward" src="./img/right.png" alt="forward">

        <div id=type-detail${singelPokemon['id']} class="type-detail"></div>

        

    </div>
    <div class="container">
        <div class="pokemon-name">${singelPokemon['name']}</div>

        
        <div id="singelStats" class="stats">

        <div class="bar-container">
        <div class="bar">
          <div id="bar-hp" class="bar-fill" style="width: 80%;"></div>
          <div class="bar-label"> <b>HP&nbsp;</b> <span id="hp">80</span>%</div>
        </div>
      </div>

      <div class="bar-container">
        <div class="bar">
          <div id="bar-attack"class="bar-fill" style="width: 80%;"></div>
          <div class="bar-label"> <b>ATK</b> <span id="attack">80</span>%</div>
        </div>
      </div>

      <div class="bar-container">
        <div class="bar">
          <div id="bar-defense"class="bar-fill" style="width: 80%;"></div>
          <div class="bar-label"> <b>DEF</b> <span id="defense">80</span>%</div>
        </div>
      </div>

    
      <div class="bar-container">
      <div class="bar">
        <div id="bar-special-attack" class="bar-fill" style="width: 80%;"></div>
        <div class="bar-label"> <b>SPA</b> <span id="special-attack">80</span>%</div>
      </div>
    </div>

      <div class="bar-container">
        <div class="bar">
          <div id="bar-special-defense" class="bar-fill" style="width: 80%;"></div>
          <div class="bar-label"> <b>DPD</b> <span id="special-defense">80</span>%</div>
        </div>
      </div>

      <div class="bar-container">
        <div class="bar">
          <div id="bar-speed"class="bar-fill" style="width: 20%;"></div>
          <div class="bar-label"> <b>SP&nbsp;</b> <span id="speed">80</span>%</div>
        </div>
      </div>


             
        </div>
    </div>
</div>
`;
}


// function singelStats(statName, baseStat){
//     return `
//     <div class="bar-container">
//     <div class="bar">
//       <div id="bar-hp" class="bar-fill" style="width: ${baseStat}%;"></div>
//       <div class="bar-label"> <b>HP&nbsp;</b> <span id="hp">${baseStat}</span>%</div>
//     </div>
//   </div>
//     `;
// }

function singleStatsHtml(statName, baseStat){
    return `
    <div class="bar-container">
    <div class="bar">
      <div id="bar-${statName}" class="bar-fill" style="width: ${baseStat}%;"></div>
      <div class="bar-label"> <b>${statName.toUpperCase()}&nbsp;</b> <span id="${statName}">${baseStat}</span>%</div>
    </div>
  </div>
    `;
}

