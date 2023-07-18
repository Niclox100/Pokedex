import { SET_FAVORITE, SET_POKEMONS, REMOVE_FROM_FAVORITES, SET_FILTERED_POKEMONS, SET_IS_SEARCHING } from "@/actions/types"

const initialState = {
    pokemons: [],
    filteredPokemons: [],
    favoritePokemons: [],
    isSearching: false
  };

export const pokemonsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_POKEMONS:
            return {
                ...state,
                pokemons: [
                    ...action.payload
                ]
            }

/*         case SET_FAVORITE:
            const newPokemonList = [...state.pokemons]
            const currentPokemonIndex = newPokemonList.findIndex(pokemon => pokemon.id === action.payload.pokemonId)

            if(currentPokemonIndex < 0) {
                return state
            }

            newPokemonList[currentPokemonIndex].favorite = !newPokemonList[currentPokemonIndex].favorite
            
            return {...state, pokemons: newPokemonList} */

        
        case SET_FAVORITE:
            const currentPokemonList = [...state.pokemons]
            const currentFavoritePokemons = [...state.favoritePokemons]

            const currentPokemon = currentPokemonList.filter(pokemon => pokemon.id === action.payload.pokemonId)
            if(currentPokemon < 0) {
                return state
            }
                    
            return {...state, favoritePokemons: [...currentFavoritePokemons, currentPokemon[0]]}

        
        case REMOVE_FROM_FAVORITES:
            const favoritePokemonsList = [...state.favoritePokemons]
            const newFavoritePokemonList = favoritePokemonsList.filter((pokemon)=> {

                return pokemon.id != action.payload.pokemonId
            })

            return {
                ...state,
                favoritePokemons: newFavoritePokemonList
            }

        case SET_FILTERED_POKEMONS:
            const pokemonsList = [...state.pokemons]
            const filteredPokemons = pokemonsList.filter((pokemon)=>{
                return pokemon.name.toLowerCase().includes(action.payload.currentFilter)
            })

            return {
                ...state,
                filteredPokemons: filteredPokemons
            }

        case SET_IS_SEARCHING:
          const isSearching = action.payload.isSearching

            return {
                ...state,
                isSearching: isSearching
            }    

        default:
            return state;
    }
}