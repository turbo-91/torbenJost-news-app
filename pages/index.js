import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArticleCard from "@/components/Card/ArticleCardComp";
import useSWR from "swr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import CountryDropdown from "@/components/CountryDropdown/CountryDropdownComp";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-style: italic;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

const SliderContainer = styled.div`
  margin-top: 5px;
`;

const CountryDropdownContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;

  button {
    margin: 0;
    padding: 0px;
    background-color: white;
    color: none;
    border: none;
    border-radius: 0px;
    cursor: pointer;

    &:hover {
      opacity: 80%;
    }
  }
`;

export default function HomePage({ favorites, toggleFavorite }) {
  // Data fetching
  const [url, setUrl] = useState(null);
  const [countryValue, setCountryValue] = useState("");
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });
  const isLoading = !error && !data && !!url;
  const handleCountryChange = (value) => {
    setCountryValue(value);
    setUrl(
      `https://newsapi.org/v2/top-headlines?country=${value}&apiKey=10181d5d9ec24883abec4df6256a487e`
    );
  };
  // console.log("data object headline fetch", data);

  // Slider functionality
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Container>
      {/* <Headline>Top Headlines</Headline> */}
      <CountryDropdownContainer>
        <CountryDropdown
          countryValue={countryValue}
          setCountryValue={handleCountryChange}
        />
      </CountryDropdownContainer>
      <NavigationButtons>
        <button onClick={previous}>
          <CircleArrowLeft color="#001233" strokeWidth={1} />
        </button>
        <button onClick={next}>
          <CircleArrowRight color="#001233" strokeWidth={1} />
        </button>
      </NavigationButtons>
      {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>Failed to load data</ErrorMessage>}
      {data && data.articles && (
        <SliderContainer>
          <Slider ref={sliderRef} {...settings}>
            {data.articles.map((article, index) => (
              <div key={index}>
                <ArticleCard
                  key={index}
                  articleId={article._id}
                  article={article}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </Slider>
        </SliderContainer>
      )}
    </Container>
  );
}
