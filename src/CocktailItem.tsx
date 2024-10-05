import React, { useState } from "react";
import CocktailDetails from "./CocktailDetails";

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

interface CocktailItemProps {
  cocktail: Cocktail;
  saveCocktail: () => void;
}
const CocktailItem: React.FC<CocktailItemProps> = ({
  cocktail,
  saveCocktail,
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
      <button onClick={() => saveCocktail()}>Add to favorites</button>
      {/*<p>Instructions: {cocktail.instructions}</p>*/}
      <img src={cocktail.imageUrl} alt={cocktail.name} />
      <button onClick={toggleDetails}>
        {expanded ? "Hide details" : "Show details"}
      </button>
      {expanded && <CocktailDetails cocktailId={cocktail.id} />}
    </div>
  );
};

export default CocktailItem;
