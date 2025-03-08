import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [images, setImages] = useState([]); 
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    setError(""); // Reset error on new fetch
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=12`
      );
      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data]);
    } catch (err) {
      setError("Error while fetching images");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      
      {error && <span className="error">{error}</span>}

      <div className="images">
        {images.map((data) => (
          <div className="image" key={data.id}>
            <img className="img" src={data.download_url} alt={`Image ${data.id}`} />
          </div>
        ))}
      </div>

      {loading && <p className="loading">Loading...</p>}

      {!loading && !error && (
        <button className="button" onClick={loadMore}>
          Load more...
        </button>
      )}
    </div>
  );
}
