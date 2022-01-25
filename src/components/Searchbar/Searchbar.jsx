import { Component } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { MdImageSearch } from "react-icons/md";
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const query = this.state.query.trim();

    if (!query) {
      toast.error("Oops... Please enter a search term!");
      return;
    }

    this.props.onSubmit(query);
    this.reset();
  };

  handleInput = (evt) => {
    const query = evt.currentTarget.value;
    this.setState({ query });
  };

  reset = () => {
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    const { handleInput, handleSubmit } = this;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <div>
              <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{
                  style: {
                    border: "2px solid red",
                    padding: "18px",
                    fontSize: "16px",
                  },
                }}
              />
            </div>
            <MdImageSearch size="2em" />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={handleInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
