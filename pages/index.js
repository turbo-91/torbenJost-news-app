// import React, { useEffect, useState } from "react";
// import ArticleCard from "@/components/Card/ArticleCardComp";
// import useSWR from "swr";

// export default function HomePage() {
//   const [url, setUrl] = useState(null);

//   useEffect(() => {
//     setUrl(
//       `https://newsapi.org/v2/top-headlines?country=us&apiKey=21247b89f2cf48c48d0df5ed148af376`
//     );
//   }, []);

//   const fetcher = (url) => fetch(url).then((res) => res.json());
//   const { data, error } = useSWR(url, fetcher, { shouldRetryOnError: false });

//   const isLoading = !error && !data && !!url;
//   console.log("data:", data);

//   return (
//     <div>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>Failed to load data</p>}
//       {data && data.articles && (
//         <div>
//           {data.articles.map((article, index) => (
//             <ArticleCard key={index} article={article} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useRef } from "react";
import Slider from "react-slick";

function PreviousNextMethods() {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        <div key={1}>
          <h3>1</h3>
        </div>
        <div key={2}>
          <h3>2</h3>
        </div>
        <div key={3}>
          <h3>3</h3>
        </div>
        <div key={4}>
          <h3>4</h3>
        </div>
        <div key={5}>
          <h3>5</h3>
        </div>
        <div key={6}>
          <h3>6</h3>
        </div>
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
  );
}

export default PreviousNextMethods;
