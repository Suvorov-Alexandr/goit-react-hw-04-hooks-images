import "./AppContainer.styled.jsx";
import Container from "./AppContainer.styled.jsx";
import { useState, useEffect } from "react";
import fetchImages from "./services/Api";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import * as Scroll from "react-scroll";
import toast from "react-hot-toast";

const scroll = Scroll.animateScroll;

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    fetchImages(query, page)
      .then(({ hits }) => {
        setImages((prevState) => [...prevState, ...hits]);

        if (hits.length === 0) {
          toast.error(`Your search "${query}" did not match any listings.`);
        }

        if (page !== 1) {
          scroll.scrollMore(250);
        }
      })
      .catch((response) => {
        console.log(response);
      })
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const handleOnSubmitSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handlerOnClickButton = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleOnSubmitSearch}></Searchbar>
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {images.length !== 0 && isLoading !== true && (
        <Button onLoadMoreClick={handlerOnClickButton} />
      )}
    </Container>
  );
}

export default App;
