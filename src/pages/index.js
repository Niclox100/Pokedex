import { useSelector, useDispatch } from "react-redux";
import { PokemonList } from "@/components/PokemonList";
import { Searcher } from "@/components/Searcher";
import { Col, Spin } from "antd";
import { useEffect, useState } from "react";
import { getPokemons } from "../apiCalls/getPokemons"
import { getPokemonsWithDetails } from "@/actions";

function App() {
  const [loading, setLoading] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(20);
  const [lastPokemon, setLastPokemon] = useState(undefined)
  const [currentIntersectionObserver, setCurrentIntersectionObserver] = useState(null);

  const dispatch = useDispatch();
  
  const pokemons = useSelector((state) => state.pokemons);
  const favoritePokemons = useSelector((state) => state.favoritePokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const isSearching = useSelector((state) => state.isSearching);

  const fetchPokemons = async (currentLimit) => {
    setLoading(true);
    try {
      const pokemonRes = await getPokemons(currentLimit);
      dispatch(getPokemonsWithDetails(pokemonRes));
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    fetchPokemons(currentLimit);
  },[])

  useEffect(()=> {
    console.log(filteredPokemons);
  },[filteredPokemons])

  useEffect(()=> {
    const pokemonsList = document.querySelectorAll(".pokemon-card")
    const finalPokemon = pokemonsList[pokemonsList.length - 1]
    setLastPokemon(finalPokemon)
  },[pokemons])

  useEffect(()=> {
    if (lastPokemon) {
      if (currentIntersectionObserver) {
        currentIntersectionObserver.disconnect();
        setCurrentIntersectionObserver(null);
      }
      const observer = new IntersectionObserver((entries)=> {
        const el = entries[0]
        if (el.isIntersecting) {
          fetchPokemons(currentLimit + 20);
          setCurrentLimit(prev => prev + 20);
        }
      }, {
        rootMargin: "100px"
      })
      observer.observe(lastPokemon)

      setCurrentIntersectionObserver(observer);
    }
  },[lastPokemon])

  const renderPokemons = () => {
    if (isSearching) {
      if (filteredPokemons.length > 0) {
        return (
          <PokemonList pokemons={filteredPokemons} />
        )
      } else {
        return <h2 style={{textAlign:"center"}}>There are not pokemons that match the search criteria</h2>
      }
    }

    else {
      return(
        <PokemonList pokemons={pokemons} />
      )
    }
  }

  useEffect(()=> {
    console.log(isSearching);
  },[isSearching])
  
  return (
    <div>
      <Col span={4} offset={10}>
        <img src="https://raw.githubusercontent.com/musartedev/curso-redux/27298f5dd3e37caf2a90a7a82580cd2905fcab31/src/statics/logo.svg" alt="Pokedux" />
      </Col>

      {favoritePokemons.length > 0 && (
        <>
          <h1 style={{textAlign:"center"}}>Favorite Pokemons</h1>
          <PokemonList pokemons={favoritePokemons}/>
        </>
      )}

      <h1 style={{textAlign:"center"}}>Pokemons</h1>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>

     {renderPokemons()}

      {loading && (
          <Col offset={12}>
            <Spin spinning size="Large" />
          </Col>
        )
      }
    </div>
  );
}


export default App;



