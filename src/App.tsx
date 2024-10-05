import "./App.css";
import { useState } from "react";

import CocktailsComponent from "./CocktailsComponent";
function App() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const saveCocktail = (id: number) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
    }
  };
  const seeFavorites = () => {
    setShowFavorites(!showFavorites);
  };
  return (
    <>
      <h1>Super cool site with super cool cocktails for super cool people</h1>
      <hr></hr>

      <div>
        <button onClick={seeFavorites}>
          {showFavorites
            ? "Go back to all cocktails"
            : "Show favorite coctails"}
        </button>

        <CocktailsComponent
          saveCocktail={saveCocktail}
          favorites={favorites}
          isFavoriteList={showFavorites}
        />
      </div>
    </>
  );
}

export default App;
