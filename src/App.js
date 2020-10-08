import React, { useState, useEffect } from "react";
import PokemoneList from "./PokemonList.js";
import Paginations from "./Paginations.js"; 
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPagUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      })
      .catch((err) => {
        debugger;
      });

    return () => cancel();

}, [currentPageUrl]);

  function goToNextPage(){
    setCurrentPagUrl(nextPageUrl);
  }

  function goToPrevPage(){
    setCurrentPagUrl(prevPageUrl);
  }

  if (loading) {
    return "Loading..."
  }
  return (
    <>
  <PokemoneList pokemon={pokemon} />
  <Paginations
    goToNextPage={nextPageUrl ? goToNextPage : null}
    goToPrevPage={prevPageUrl ? goToPrevPage : null}
  />
  </> 
  )
}

export default App;
