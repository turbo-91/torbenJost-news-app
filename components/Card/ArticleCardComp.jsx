import Image from "next/image";

// bypass next/Image components domain restriction! Caution! Security concern.
const customLoader = ({ src }) => {
  return src;
};

export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <b>
        ********************************************************************************************************************
      </b>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <p>
        <strong>Source:</strong> {article.source.name}
      </p>
      {article.urlToImage && (
        <Image
          unoptimized={customLoader}
          src={article.urlToImage}
          alt={article.title}
          width={700} // Adjust width as needed
          height={400} // Adjust height as needed
        />
      )}
      <p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </p>
    </div>
  );
}
