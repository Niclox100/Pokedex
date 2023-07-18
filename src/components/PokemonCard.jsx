import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta';
import { StarButton } from './StarButton';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite, removeFromFavorites } from '@/actions';
import { useState } from 'react';
import { useEffect } from 'react';

const PokemonCard = ({ name, abilities, frontImageUrl, id }) => {

  const [isFavorite, setIsFavorite] = useState(false)

  const favoritePokemons = useSelector((state) => state.favoritePokemons);


  useEffect(()=> {
    const isCurrentFavorite = favoritePokemons.some((pokemon)=>{
      return pokemon.id === id
    })
    
    setIsFavorite(isCurrentFavorite)

  }, [favoritePokemons])


  const dispatch = useDispatch()

  const handleOnFavorite = () => {
    if (!isFavorite) {
      dispatch(setFavorite({pokemonId: id}))
    }
    else {
      dispatch(removeFromFavorites({pokemonId: id}))
    }
  }

  return (
    <Card
      className="pokemon-card" 
      title={name}
      cover={<img src={frontImageUrl} alt={name}></img>}
		  extra={<StarButton isFavorite={isFavorite} onClick={()=> handleOnFavorite()}/>}
    >
    <Meta style={{fontSize: 20, fontWeight:"bold", color:"black"}} description="Abilities"/>
		{abilities.map(ability=> {
      return <Meta style={{color:"blueviolet"}} description={ability.ability.name} key={ability.ability.name}/>
    })}
    </Card>
  )
}

export { PokemonCard }