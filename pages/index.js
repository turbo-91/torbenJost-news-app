import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/Card/ArticleCardComp";
import useSWR from "swr";

export default function HomePage() {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=21247b89f2cf48c48d0df5ed148af376`
    );
  }, []);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });

  const isLoading = !error && !data && !!url;
  console.log("data:", data);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load data</p>}
      {data && data.articles && (
        <div>
          {data.articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
