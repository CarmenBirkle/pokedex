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

