import { BallTriangle } from "react-loader-spinner";
import PreLoader from "./Loader.styled";

function Loader() {
  return (
    <PreLoader>
      <BallTriangle
        heigth="50"
        width="50"
        color="green"
        ariaLabel="loading-indicator"
      />
    </PreLoader>
  );
}

export default Loader;
