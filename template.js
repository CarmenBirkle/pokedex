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

        <div class="type-detail">
            <div class="type-container-detail">
                <div class="poke-type-detail">
                    <svg fill="none" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m342.198.501279c.373-.5317158 1.105-.660937 1.637-.288625l36.354 25.455546c.532.3723.661 1.1051.289 1.6368l-50.599 72.2623c24.599 7.8587 41.358 16.3357 41.358 16.3357s-40.964 70.462-110.443 70.462-118.85-65.672-118.85-65.672 17.506-11.172 43.456-20.7539l-55.5-66.1415c-.417-.4973-.352-1.2386.145-1.6558l33.997-28.52715c.498-.41723 1.239-.35238 1.656.14487l70.272 83.74688c6.017-.6806 12.147-1.061 18.333-1.061 8.891 0 17.771.6759 26.44 1.8229zm13.746 189.200721c18.541-13.242 46.597-47.804 46.597-47.804s71.664 56.79 71.664 177.206c0 120.415-123.896 192.888-123.896 192.888s-59.195-59.781-73.727-135.562c-14.531-75.781 21.496-159.927 21.496-159.927s39.324-13.559 57.866-26.801zm-199.683 0c-18.541-13.242-46.597-47.804-46.597-47.804s-71.664 56.79-71.664 177.206c0 120.415 123.896 192.888 123.896 192.888s59.195-59.781 73.727-135.562c14.531-75.781-21.496-159.927-21.496-159.927s-39.324-13.559-57.866-26.801z" fill="#fff" fill-rule="evenodd"/></svg>
                </div>
                <p>Gras</p>
            </div>
            <div class="type-container-detail">  
                <div class="poke-type-detail">
                    <svg fill="none" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m342.198.501279c.373-.5317158 1.105-.660937 1.637-.288625l36.354 25.455546c.532.3723.661 1.1051.289 1.6368l-50.599 72.2623c24.599 7.8587 41.358 16.3357 41.358 16.3357s-40.964 70.462-110.443 70.462-118.85-65.672-118.85-65.672 17.506-11.172 43.456-20.7539l-55.5-66.1415c-.417-.4973-.352-1.2386.145-1.6558l33.997-28.52715c.498-.41723 1.239-.35238 1.656.14487l70.272 83.74688c6.017-.6806 12.147-1.061 18.333-1.061 8.891 0 17.771.6759 26.44 1.8229zm13.746 189.200721c18.541-13.242 46.597-47.804 46.597-47.804s71.664 56.79 71.664 177.206c0 120.415-123.896 192.888-123.896 192.888s-59.195-59.781-73.727-135.562c-14.531-75.781 21.496-159.927 21.496-159.927s39.324-13.559 57.866-26.801zm-199.683 0c-18.541-13.242-46.597-47.804-46.597-47.804s-71.664 56.79-71.664 177.206c0 120.415 123.896 192.888 123.896 192.888s59.195-59.781 73.727-135.562c14.531-75.781-21.496-159.927-21.496-159.927s-39.324-13.559-57.866-26.801z" fill="#fff" fill-rule="evenodd"/></svg>
                 </div>
                <p>Eelctro</p>
            </div>
        </div>

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

