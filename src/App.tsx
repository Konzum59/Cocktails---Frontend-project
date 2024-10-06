import "./App.css";
import { useEffect, useState } from "react";
import CocktailsComponent from "./CocktailsComponent";

//general component, or atleast it was suposed to be, but i put too much code in here
//i wanted to change it for more smaller components but it went a bit too messy. Generally sorry for the mess in components and  all, it was my first bigger project with react adn generally with frontend. also i really need to learn css
//and sorry for submiting it so late, i pinkie promie i wasnt doing it all in one day, i divided for some 4/5 evenings and just tought that it will take me less time today, but i saw more and more things that could get improved
function App() {
  const storedFavorites = localStorage.getItem("arrayOfFavorites");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>(
    storedFavorites ? JSON.parse(storedFavorites) : []
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [isAlcoholicFilter, setIsAlcoholicFilter] = useState<boolean | null>(
    null
  );

  const saveCocktail = (id: number) => {
    if (!favorites.includes(id)) {
      const updatedArray = [...favorites, id];
      setFavorites([...updatedArray]);
    }
    if (favorites.includes(id)) {
      const updatedArray = favorites.filter(
        (idForRemoval) => idForRemoval !== id
      );
      setFavorites(updatedArray);
    }
  };

  useEffect(() => {
    localStorage.setItem("arrayOfFavorites", JSON.stringify(favorites));
  }, [favorites]);
  //for button
  const showAlcoholic = () => {
    setIsAlcoholicFilter(true);
    setSearchTerm("");
    setPageNumber(1);
  };
  //for button
  const showNonAlcoholic = () => {
    setIsAlcoholicFilter(false);
    setSearchTerm("");
    setPageNumber(1);
  };
  //also for button
  const resetFilters = () => {
    setIsAlcoholicFilter(null);
  };
  //for button again but this time not related to filters
  const seeFavorites = () => {
    setShowFavorites(true);
    setSearchTerm("");
    setPageNumber(1);
    //setIsAlcoholicFilter(null);
  };
  //for button
  const seeAll = () => {
    setShowFavorites(false);
    setSearchTerm("");
    setPageNumber(1);
    //setIsAlcoholicFilter(null);
  };
  //for input bar
  const handleSearch = () => {
    setSearchTerm(inputValue);
    setPageNumber(1);
  };

  return (
    <>
      <h1>Super cool site with super cool cocktails for super cool people</h1>
      {/*I wish */}
      <hr></hr>

      <div>
        <button onClick={seeFavorites} disabled={showFavorites && !searchTerm}>
          Show favorite coctails
        </button>

        <button onClick={seeAll} disabled={!showFavorites && !searchTerm}>
          Show all cocktails
        </button>
        <button onClick={showAlcoholic} disabled={isAlcoholicFilter === true}>
          Show alcoholic cocktails
        </button>

        <button
          onClick={showNonAlcoholic}
          disabled={isAlcoholicFilter === false}
        >
          Show non-alcoholic cocktails
        </button>
        <button onClick={resetFilters} disabled={isAlcoholicFilter === null}>
          Reset filters
        </button>

        <input
          type="text"
          placeholder="Search for a cocktail..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
        />
        <button onClick={handleSearch}>Search</button>

        <CocktailsComponent
          saveCocktail={saveCocktail}
          favorites={favorites}
          isFavoriteList={showFavorites}
          searchTerm={searchTerm}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          isAlcoholicFilter={isAlcoholicFilter}
        />
      </div>
    </>
  );
}

export default App;
