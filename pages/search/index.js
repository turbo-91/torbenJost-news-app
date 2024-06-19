import ArticleCard from "@/components/Card/ArticleCardComp";
import SearchBar from "@/components/SearchBar/SearchBarComp";
import useSWR from "swr";
import { useState } from "react";

export default function SearchPage({ favorites, toggleFavorite }) {
  // States to store date range & language dropdown value
  const [dateRangeFrom, setDateRangeFrom] = useState("");
  const [dateRangeTo, setDateRangeTo] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [keyWord, setKeyword] = useState("");

  // Data fetching
  const [url, setUrl] = useState(null);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });
  const isLoading = !error && !data && !!url;
  const handleSearch = () => {
    setUrl(
      `https://newsapi.org/v2/everything?q=${keyWord}&from=${dateRangeFrom}&to=${dateRangeTo}&language=${languageValue}&apiKey=10181d5d9ec24883abec4df6256a487e`
    );
    console.log("state nach suchanfrage", favorites);
  };
  return (
    <>
      <SearchBar
        dateRangeFrom={dateRangeFrom}
        setDateRangeFrom={setDateRangeFrom}
        dateRangeTo={dateRangeTo}
        setDateRangeTo={setDateRangeTo}
        languageValue={languageValue}
        setLanguageValue={setLanguageValue}
        keyWord={keyWord}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load data</p>}
      {data && data.articles && (
        <div>
          {data.articles.map((article, index) => (
            <ArticleCard
              key={index}
              articleId={article.id}
              article={article}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
