import { setFilteredPokemons, setIsSearching } from "@/actions";
import { Input } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Searcher = () => {
    const [currentFilter, setCurrentFilter] = useState("")
    const dispatch = useDispatch()

    const handleOnChange = (event) => {
        setCurrentFilter(event.target.value)
    }

    useEffect(()=> {
        if (currentFilter.length > 0) {
            dispatch(setFilteredPokemons({currentFilter: currentFilter}))
            dispatch(setIsSearching({isSearching:true}))
            console.log(currentFilter);
        } else {
            dispatch(setFilteredPokemons({currentFilter: ""}))
            dispatch(setIsSearching({isSearching:false}))
        }
    }, [currentFilter])
    return <Input.Search placeholder="Buscar..." className="searcher" onChange={(event)=> handleOnChange(event)}/>
}

export {Searcher}