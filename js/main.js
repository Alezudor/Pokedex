
// uma const que armazena a url da api do Pokemon
const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const pokemonList = document.getElementById("lista-pokemon");



// uma função que converte um objeto pokemon em uma string 
function convertPokemonToLi(pokemon){

    return `
            <li class="pokemon ${pokemon.types[0].type.name}">
           <p class="name">${pokemon.name}</p> 
           <img src="${pokemon.sprites.other.dream_world.front_default}" alt="">
        </li>

    `;
}

// uma função que busca os detalhes de um Pokemon usando a url fornecida
function getPokemonDetails(pokemon) {
    return fetch(pokemon.url)
    .then((response) => response.json())
    }


// uma função que busca a lista de pokemons da api e converte cada um deles em um objeto pokemon
fetch(url)

    .then((response) => response.json())
    // extrai o json da resposta

    .then((jsonresponse) => jsonresponse.results)
    // extrai a lista de pokemons do json

    .then((list) =>  list.map(getPokemonDetails))
    // mapeia a lista de pokemons para pegar os detalhes de cada um

    .then((details) => Promise.all(details))
    // espera as promessas para obter os detalhes 

    .then((newList) => pokemonList.innerHTML = newList.map(convertPokemonToLi).join(''))
    // converte a lista de pokemons em uma string e insere na lista

    .catch((error) => console.log(error))
    // verificar se houve algum erro na requisição