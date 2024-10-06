import React, { useState, useEffect } from "react";
import LoadingOrError from "./LoadingOrError";
import IngredientData from "./IngredientData/IngredientData";

//This one shows stuff when the mouse is over ingredient. Now im i think thats it isnt really intuative to point your mouse on the ingredient to see details, amyby there should be some symbol to indicate that

interface Ingredient {
  id: number;
  name: string;
  description: string;
  alcohol: boolean;
  type: string;
  percentage: number | null;
  imageUrl: string;
  measure: string;
}

interface IngredientsDetailsProps {
  cocktailId: number;
  resultsNumber: number;
}

interface IngredientsDetailsResponse {
  id: number;
  name: string;
  category: string;
  glass: string;
  instructions: string;
  imageUrl: string;
  alcoholic: boolean;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
}

const IngredientsDetails: React.FC<IngredientsDetailsProps> = ({
  cocktailId,
  resultsNumber,
}) => {
  const [details, setDetails] = useState<IngredientsDetailsResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOver, setIsOver] = useState<Ingredient | null>(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(
          `https://cocktails.solvro.pl/api/v1/cocktails/${cocktailId}`
        );
        const data = await response.json();
        setDetails(data.data);
      } catch (error) {
        setError("Could not fetch cocktail details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCocktailDetails();
  }, [cocktailId]);

  return (
    <div>
      <LoadingOrError loading={loading} error={error} results={resultsNumber} />
      {details && (
        <>
          <hr></hr>
          <h3>{details.name}</h3>
          <p>Category: {details.category}</p>
          <p>Glass: {details.glass}</p>
          <p>Ingredients:</p>
          <ul>
            {details.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {/*<img src={ingredient.imageUrl} alt={ingredient.name} />*/}
                <div
                  onMouseEnter={() => setIsOver(ingredient)}
                  onMouseLeave={() => setIsOver(null)}
                >
                  <strong>
                    {ingredient.name} - {ingredient.measure}{" "}
                  </strong>
                  {isOver === ingredient ? (
                    <IngredientData
                      description={ingredient.description}
                      alcohol={ingredient.alcohol}
                      percentage={ingredient.percentage}
                      type={ingredient.type}
                      imageUrl={ingredient.imageUrl}
                      name={ingredient.name}
                    />
                  ) : null}
                </div>
              </li>
            ))}
            <h4>Instructions: </h4>
            {details.instructions}
          </ul>
          <hr></hr>
        </>
      )}
    </div>
  );
};

export default IngredientsDetails;
