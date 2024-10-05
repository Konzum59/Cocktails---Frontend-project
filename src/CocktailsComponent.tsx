import React, { useEffect, useState } from "react";
import PaginatedButtons from "./PaginatedButtons";
import LoadingOrError from "./LoadingOrError";
import CocktailItem from "./CocktailItem";

interface CocktailsComponentProps {
  saveCocktail: (id: number) => void;
  favorites: number[];
  isFavoriteList?: boolean;
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
}) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const maxPages = meta ? Math.ceil(meta.total / meta.perPage) : 0;

  const fetchCocktails = async (page: number) => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://cocktails.solvro.pl/api/v1/cocktails?page=${page}&perPage=15`
      );
      if (isFavoriteList) {
        const iAsumeThisWorksBecauseIDidntKnowHowToUseTheSearchOnTheSite =
          favorites.map((id) => `id[]=${id}`).join("&");
        response = await fetch(
          `https://cocktails.solvro.pl/api/v1/cocktails?${iAsumeThisWorksBecauseIDidntKnowHowToUseTheSearchOnTheSite}&page=1&perPage=15`
        );
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ApiResponse = await response.json();
      setCocktails(data.data);
      setMeta(data.meta);
    } catch (error) {
      setError("Error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails(pageNumber);
  }, [pageNumber, isFavoriteList]);

  const changePage = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div>
      <LoadingOrError loading={loading} error={error} />
      {!loading && !error && (
        <>
          <PaginatedButtons
            currentPage={pageNumber}
            maxPages={maxPages}
            changePage={changePage}
          />
          {cocktails.map((cocktail) => (
            <CocktailItem
              key={cocktail.id}
              cocktail={cocktail}
              saveCocktail={() => saveCocktail(cocktail.id)}
            />
          ))}

          <PaginatedButtons
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
