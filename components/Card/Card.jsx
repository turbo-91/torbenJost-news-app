export default function ArticleCard({ data, error, isLoading }) {
  if (error) {
    return <div>Failed to load data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Results:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
