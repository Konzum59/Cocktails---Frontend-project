import React, { useEffect, useState } from 'react';


interface FavoritesProps{
favoritesId: number[]

}
interface Meta {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
  }
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
  
  interface ApiResponse {
    meta: Meta;
    data: Cocktail[];
  }

const Favorites: React.FC = (favoritesId) => {
    const[favoriteCocktails, setFavoriteCocktails] = useState<Cocktail[]>()
    const [meta, setMeta] = useState<Meta | null>(null);
const [loading, setLoading] = useState<boolean>(false)
const [error, setError] = useState<string|null>( null)

const fetchCocktails = async () => {
    setLoading(true)
    try {
      const iAsumeThisWorksBecauseIDidntKnowHowToUseTheSearchOnTheSite = favoritesId.map(id => `id[]=${id}`).join('&');
      const response = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails?${iAsumeThisWorksBecauseIDidntKnowHowToUseTheSearchOnTheSite}&page=1&perPage=15`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFavoriteCocktails(data);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
setLoading(false)  
};
  

  fetchCocktails();
}
return(

)