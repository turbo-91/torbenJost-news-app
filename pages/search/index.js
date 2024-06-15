// pages/SearchPage.js
import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/Card/ArticleCardComp";
import SearchBar from "@/components/SearchBar/SearchBarComp";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function SearchPage() {
  const { data: session } = useSession();
  const [dateRangeFrom, setDateRangeFrom] = useState("");
  const [dateRangeTo, setDateRangeTo] = useState("");
  const [languageValue, setLanguageValue] = useState("");
  const [keyWord, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [url, setUrl] = useState(null);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });
  const isLoading = !error && !data && !!url;

  const handleSearch = () => {
    setUrl(
      `https://newsapi.org/v2/everything?q=${keyWord}&from=${dateRangeFrom}&to=${dateRangeTo}&language=${languageValue}&apiKey=21247b89f2cf48c48d0df5ed148af376`
    );
  };

  useEffect(() => {
    if (data && data.articles) {
      console.log("Fetched search articles:", data.articles);
      setArticles(data.articles);
    }
  }, [data]);

  const handleFavorite = async (article) => {
    try {
      const session = await getSession();
      if (!session) {
        alert("You need to be logged in to favorite articles");
        return;
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "favorite", article }),
      });

      if (response.ok) {
        console.log("Article added to favorites");
        // Optionally, update UI or refetch user data
      } else {
        const errorData = await response.json();
        console.error("Failed to add article to favorites:", errorData.message);
        // Handle error scenario
      }
    } catch (error) {
      console.error("Error adding article to favorites", error);
      // Handle error scenario
    }
  };

  return (
    <>
      <h1>NEWS APP</h1>
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
      {articles.length > 0 && (
        <div>
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
