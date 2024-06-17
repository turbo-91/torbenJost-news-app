import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArticleCard from "@/components/Card/ArticleCardComp";
import useSWR from "swr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import CountryDropdown from "@/components/CountryDropdown/CountryDropdownComp";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Headline = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
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
  margin-top: 20px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #0070f3;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #005bb5;
    }
  }
`;

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
    <Container>
      <Headline>Top Headlines</Headline>
      <p>From:</p>
      <CountryDropdown
        countryValue={countryValue}
        setCountryValue={handleCountryChange}
      />
      {isLoading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>Failed to load data</ErrorMessage>}
      {data && data.articles && (
        <SliderContainer>
          <Slider ref={sliderRef} {...settings}>
            {data.articles.map((article, index) => (
              <div key={index}>
                <ArticleCard article={article} />
              </div>
            ))}
          </Slider>
          <NavigationButtons>
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
          </NavigationButtons>
        </SliderContainer>
      )}
    </Container>
  );
}
