import { useState } from "react";
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

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const trimmedQuerySpaces = query.trim();

    if (!trimmedQuerySpaces) {
      toast.error("Oops... Please enter a search term!");
      return;
    }
    onSubmit(trimmedQuerySpaces);
    reset();
  };

  const handleInput = (evt) => {
    setQuery(evt.currentTarget.value);
  };

  const reset = () => {
    setQuery("");
  };

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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
