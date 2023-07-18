import axios from "axios"



const getPokemons = (currentOffset) => {
	const apiLink = `https://pokeapi.co/api/v2/pokemon?limit=${currentOffset}`
	return axios.get(apiLink)
		.then(res => res.data.results)
		.catch(e => console.log(e));
}

const getPokemonDetails = (pokemon) => {
	return axios.get(pokemon.url)
		.then(res => {
			return res.data
		})
		.catch(e => console.log(e));
}

export { getPokemons, getPokemonDetails }
