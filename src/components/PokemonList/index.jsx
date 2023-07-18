import React from 'react'
import { PokemonCard } from '../PokemonCard'
import styles from "./styles.module.css"

const PokemonList = ({ pokemons }) => {

  return (
    <div className={styles.pokemonList}>
        {pokemons.map((pokemon)=> (
            <PokemonCard 
              name={pokemon.name}
              id={pokemon.id}
              frontImageUrl={pokemon.sprites.front_default}
              abilities= {pokemon.abilities}
              favorite={pokemon.favorite}
              key={pokemon.name}
            />
        ))}
    </div>
  )
}

PokemonList.defaultProps = {
    pokemons: Array(10).fill(""),
}

export { PokemonList }