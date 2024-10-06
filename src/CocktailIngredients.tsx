import React, { useState } from "react";
import IngredientsDetails from "./IngredientsDetails";

interface Cocktail {
  id: number;
  name: string;
  category: string;
  glass: string;
  instructions: string;
  imageUrl: string;
  alcoholic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CocktailIngredientsProps {
  cocktail: Cocktail;
  saveCocktail: () => void;
  favorites: number[];
  resultsNumber: number;
}
const CocktailIngredients: React.FC<CocktailIngredientsProps> = ({
  cocktail,
  saveCocktail,
  favorites,
  resultsNumber,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleDetails = () => {
    setExpanded(!expanded);
  };

  return (
    <div key={cocktail.id}>
      <h2>{cocktail.name}</h2>
      <p>Category: {cocktail.category}</p>
      <p>Glass type: {cocktail.glass}</p>
      <p>
        {cocktail.alcoholic ? "Contains alcohol" : "Doesn't contain alcohol"}{" "}
      </p>
      <button onClick={() => saveCocktail()}>
        {favorites.includes(cocktail.id)
          ? "Remove from favorites"
          : "Add to favorites"}
      </button>
      {/*<p>Instructions: {cocktail.instructions}</p>*/}
      <img src={cocktail.imageUrl} alt={cocktail.name} />
      <button onClick={toggleDetails}>
        {expanded ? "Hide details" : "Show details"}
      </button>
      {expanded && (
        <IngredientsDetails
          cocktailId={cocktail.id}
          resultsNumber={resultsNumber}
        />
      )}
    </div>
  );
};

export default CocktailIngredients;
