import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/";
import ImageGalleryList from "./ImageGallery.styled";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

function ImageGallery({ images }) {
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <ImageGalleryList>
          {images.map(({ id, webformatURL, tags }) => {
            return (
              <ImageGalleryItem key={id} image={webformatURL} alt={tags} />
            );
          })}
        </ImageGalleryList>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
