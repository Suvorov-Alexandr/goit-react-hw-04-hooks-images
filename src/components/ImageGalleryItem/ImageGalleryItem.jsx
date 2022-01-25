import PropTypes from "prop-types";
import { GalleryItem, GalleryImage } from "./ImageGalleryItem.styled";

function ImageGalleryItem({ image, alt }) {
  return (
    <GalleryItem>
      <GalleryImage src={image} alt={alt} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
