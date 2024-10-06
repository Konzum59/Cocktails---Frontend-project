import React, { useEffect, useState } from "react";
import PageButtons from "./PageButtons";
import LoadingOrError from "./LoadingOrError";
import CocktailIngredients from "./CocktailIngredients";
import madGif from "./assets/images/NecoArcMad.gif";
interface CocktailsComponentProps {
  saveCocktail: (id: number) => void;
  favorites: number[];
  isFavoriteList?: boolean;
  searchTerm: string;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  isAlcoholicFilter: boolean | null;
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

const CocktailsComponent: React.FC<CocktailsComponentProps> = ({
  saveCocktail,
  favorites,
  isFavoriteList = false,
  searchTerm,
  pageNumber,
  setPageNumber,
  isAlcoholicFilter,
}) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);

  const maxPages: number = meta ? Math.ceil(meta.total / meta.perPage) : 0;
  const fetchCocktails = async (page: number) => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://cocktails.solvro.pl/api/v1/cocktails?page=${page}&perPage=15`
      );
      if (isFavoriteList) {
        const forLink: string = favorites.map((id) => `id[]=${id}`).join("&");
        const filter: string | null =
          isAlcoholicFilter !== null ? `&alcoholic=${isAlcoholicFilter}` : "";
        console.log(
          `https://cocktails.solvro.pl/api/v1/cocktails?${forLink}${filter}&page=${page}&perPage=15`
        );
        response = await fetch(
          `https://cocktails.solvro.pl/api/v1/cocktails?${forLink}${filter}&page=${page}&perPage=15`
        );
      }
      if (searchTerm) {
        response = await fetch(
          `https://cocktails.solvro.pl/api/v1/cocktails?name=${searchTerm}&page=${page}&perPage=15`
        );
      }
      if (isAlcoholicFilter !== null && !isFavoriteList) {
        response = await fetch(
          `https://cocktails.solvro.pl/api/v1/cocktails?alcoholic=${isAlcoholicFilter}&page=${page}&perPage=15`
        );
      }
      const data: ApiResponse = await response.json();
      setCocktails(data.data);
      setMeta(data.meta);
      setTotalResults(data.meta.total);
    } catch (error) {
      setError("Error, can't fetch the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails(pageNumber);
  }, [pageNumber, isFavoriteList, searchTerm, isAlcoholicFilter]);

  const changePage = (page: number) => {
    setPageNumber(page);
  };
  if (favorites.length == 0 && isFavoriteList) {
    return (
      <>
        <h2>No favorites added, what are you waiting for, add some!!</h2>
        <img src={madGif} />
      </>
    );
  }
  return (
    <div>
      <LoadingOrError loading={loading} error={error} results={totalResults} />
      {!loading && !error && totalResults != 0 && (
        <>
          <PageButtons
            currentPage={pageNumber}
            maxPages={maxPages}
            changePage={changePage}
          />
          {cocktails.map((cocktail) => (
            <CocktailIngredients
              key={cocktail.id}
              cocktail={cocktail}
              saveCocktail={() => saveCocktail(cocktail.id)}
              favorites={favorites}
              resultsNumber={totalResults}
            />
          ))}

          <PageButtons
            currentPage={pageNumber}
            maxPages={maxPages}
            changePage={changePage}
          />
        </>
      )}
    </div>
  );
};

export default CocktailsComponent;
