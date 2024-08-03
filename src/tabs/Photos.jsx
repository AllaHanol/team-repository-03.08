import { getPhotos } from "apiService/photos";
import { Button, Form, Loader, PhotosGallery, Text } from "components";
import { useEffect, useState } from "react";

export const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const { per_page, total_results, photos } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
    setError(null);
  };
  const onLoadMoreBtn = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      {images.length > 0 && <PhotosGallery images={images} />}
      {isVisible && (
        <Button onClick={onLoadMoreBtn} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </Button>
      )}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {loading && <Loader />}
      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
};
