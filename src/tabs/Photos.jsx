import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Text from '../components/Text/Text';
import { getPhotos } from '../apiService/photos';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const Photos = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getQuery = (inputValue, isNewRequest = false) => {
    setQuery(inputValue);
    if (isNewRequest) {
      setImages([]);
      setPage(1);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const getImages = async () => {
      try {
        setLoading(true);
        const data = await getPhotos(query, page);
        setImages(prevImages => [...prevImages, ...data.photos]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Form onSubmit={getQuery} />
      {images.length === 0 && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {error ? (
        <ErrorMessage errorText={error} />
      ) : (
        <PhotosGallery images={images} />
      )}
      {loading && <Loader />}
      {images.length > 0 && <Button onClick={handleClick}>Load more</Button>}
    </>
  );
};

export default Photos;
