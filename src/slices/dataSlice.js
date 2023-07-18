import { getPokemonDetails } from "@/apiCalls/getPokemons";
import { getPokemons } from "@/apiCalls/getPokemons";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    pokemons: [],
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    "data/fetchPokemonsWithDetails",
    async (_ , {dispatch}) => {
        const pokemonRes = await getPokemons();
        const pokemonDetails = await Promise.all(
            pokemonRes.map(pokemon => getPokemonDetails(pokemon))
          );
        dispatch(setPokemons(pokemonDetails))
    }
)

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload
        },
        setFavorite: (state, action) => {
                const currentPokemonIndex = state.pokemons.findIndex(pokemon => pokemon.id === action.payload.pokemonId)
                
                if(currentPokemonIndex >= 0) {
                    const isFavorite = state.pokemons[currentPokemonIndex].favorite

                    state.pokemons[currentPokemonIndex].favorite = !isFavorite
                }
            }
    }
})

export const {setFavorite, setPokemons} = dataSlice.actions

export default dataSlice.reducer