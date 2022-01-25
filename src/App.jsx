import "./AppContainer.styled.jsx";
import Container from "./AppContainer.styled.jsx";
import { Component } from "react";
import fetchImages from "./services/Api";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import * as Scroll from "react-scroll";
import toast from "react-hot-toast";

const scroll = Scroll.animateScroll;

class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    sourceModalImage: "",
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query === query && prevState.page === page) {
      return;
    }
    this.setState({ isLoading: true });

    fetchImages(this.state)
      .then(({ hits }) => {
        const images = [...this.state.images, ...hits];
        this.setState({ images });

        if (hits.length === 0) {
          toast.error(
            `Your search "${this.state.query}" did not match any listings.`
          );
        }

        if (this.state.page !== 1) {
          scroll.scrollMore(250);
        }
      })
      .catch((response) => {
        console.log(response);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  handleOnSubmitSearch = (query) => {
    this.setState({ query, page: 1, images: [] });
  };

  handlerOnClickButton = () => {
    const page = this.state.page + 1;
    this.setState({ page });
  };

  render() {
    const { images, isLoading } = this.state;
    const { handleOnSubmitSearch, handlerOnClickButton } = this;

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
}

export default App;
