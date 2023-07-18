import { getPokemonDetails } from "@/apiCalls/getPokemons";
const { 
    SET_POKEMONS, 
    SET_FAVORITE, 
    REMOVE_FROM_FAVORITES, 
    SET_FILTERED_POKEMONS,
    SET_IS_SEARCHING,
} = require("./types");


export const setPokemons = (payload) => ({
    type: SET_POKEMONS,
    payload
})

export const setFavorite = (payload) => ({
    type: SET_FAVORITE,
    payload
})

export const removeFromFavorites = (payload) => ({
    type: REMOVE_FROM_FAVORITES,
    payload
})

export const setFilteredPokemons = (payload) => ({
    type: SET_FILTERED_POKEMONS,
    payload
})

export const setIsSearching = (payload) => ({
    type: SET_IS_SEARCHING,
    payload
})

export const getPokemonsWithDetails = (pokemons = []) => async(dispatch) => {
    const pokemonDetails = await Promise.all(
        pokemons.map(pokemon => getPokemonDetails(pokemon))
      );

      dispatch(setPokemons(pokemonDetails))
}

