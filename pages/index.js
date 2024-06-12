import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/Card/ArticleCardComp";
import useSWR from "swr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import CountryDropdown from "@/components/CountryDropdown/CountryDropdownComp";

export default function HomePage() {
  // Data fetching
  const [url, setUrl] = useState(null);
  const [countryValue, setCountryValue] = useState("");
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });
  const isLoading = !error && !data && !!url;

  const handleCountryChange = (value) => {
    setCountryValue(value);
    setUrl(
      `https://newsapi.org/v2/top-headlines?country=${value}&apiKey=21247b89f2cf48c48d0df5ed148af376`
    );
  };

  // console.log data whenever it changes (country dropdown)
  useEffect(() => {
    // Log data whenever it changes
    console.log("Fetched data:", data);
  }, [data]);

  // Slider functionality
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <CountryDropdown
        countryValue={countryValue}
        setCountryValue={handleCountryChange}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load data</p>}
      {data && data.articles && (
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {data.articles.map((article, index) => (
              <div key={index}>
                <ArticleCard article={article} />
              </div>
            ))}
          </Slider>
          <div style={{ textAlign: "center" }}>
            <button className="button" onClick={previous}>
              Previous
            </button>
            <button className="button" onClick={next}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
