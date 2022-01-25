import PropTypes from "prop-types";
import { Component } from "react";
import { Overlay, ModalWindow } from "./Modal.styled";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handlePressEscapeKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handlePressEscapeKey);
  }

  handleBackdropOnClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  handlePressEscapeKey = (evt) => {
    if (evt.code === "Escape") {
      this.props.closeModal();
    }
  };

  render() {
    const { handleBackdropOnClick } = this;
    const { alt, sourceModalImage } = this.props;

    return createPortal(
      <Overlay onClick={handleBackdropOnClick}>
        <ModalWindow>
          <img src={sourceModalImage} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  alt: PropTypes.string,
  sourceModalImage: PropTypes.string.isRequired,
};

export default Modal;
