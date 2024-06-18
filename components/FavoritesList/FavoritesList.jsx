import React, { useState, useEffect } from "react";
import ArticleCard from "../Card/ArticleCardComp";

const FavoritesList = () => {
  const favoriteArticles = [
    {
      source: {
        id: null,
        name: "Yahoo Entertainment",
      },
      author: "Kris Holt",
      title:
        "Apple WWDC 2024: What we expect including iOS 18 updates, AI and more",
      description:
        "It'll soon be Apple's turn to talk about its next major operating system updates, giving developers a chance to get their apps ready ahead of a broad rollout this fall. The company's Worldwide Developers Conference is right around the corner. Apple is sure to…",
      url: "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_753d45f9-854d-4355-95bf-0a56b2ba8b6e",
      urlToImage: null,
      publishedAt: "2024-06-04T16:29:40Z",
      content:
        "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]",
    },
    {
      source: {
        id: null,
        name: "Gizmodo.com",
      },
      author: "Dua Rashid",
      title: "The Best Gadgets of May 2024",
      description:
        "May was a loaded month with Apple and Google both releasing products. Project Astra was definitely the most interesting thing we saw at an otherwise boring Google I/O. Apple also dropped its latest iPad Pros with the all-new M4 chip and OLED displays, a 13-in…",
      url: "https://gizmodo.com/best-gadgets-of-may-2024-1851511825",
      urlToImage:
        "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/a5ea1059c9b89a49ff8bc86d2c62c043.jpg",
      publishedAt: "2024-05-31T19:00:00Z",
      content:
        "Starting at $1,000, the iPad Pro with an M4 chip is beautiful and powerful. And in a lot of ways, try to even out-MacBook the MacBook. Thanks to a new OLED screen and chip, hardware-wise, its as clos… [+158 chars]",
    },
    {
      source: {
        id: null,
        name: "Gizmodo.com",
      },
      author: "Maxwell Zeff",
      title: "Apple Won't Pay for ChatGPT, Will You?",
      description:
        "Apple and OpenAI announced a landmark partnership this week to ingrain ChatGPT into every new iPhone, iPad, and Mac. The agreement has obvious benefits for Apple, giving it the best AI chatbot on the market. However, Apple will not pay OpenAI to use ChatGPT o…",
      url: "https://gizmodo.com/apple-openai-chatgpt-apple-intelligence-iphone-ipad-1851537642",
      urlToImage:
        "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/328bf2c4e2f291bc9a82b9a4ffb80805.jpg",
      publishedAt: "2024-06-13T14:40:00Z",
      content:
        "Apple and OpenAI announced a landmark partnership this week to ingrain ChatGPT into every new iPhone, iPad, and Mac. The agreement has obvious benefits for Apple, giving it the best AI chatbot on the… [+2651 chars]",
    },
  ];

  return (
    <div>
      {favoriteArticles.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        favoriteArticles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            isfavorite={
              localStorage.getItem(article.title) === JSON.stringify(article)
            }
            onRemoveFromFavorites={() => handleRemoveFromFavorites(article)}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesList;
