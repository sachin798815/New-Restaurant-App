import { Spinner } from "react-bootstrap";

const LoadingPage = ({ text = "Loading..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "300px" }}>
      <Spinner animation="border" variant="primary" role="status" />
      <span className="mt-3">{text}</span>
    </div>
  );
};

export default LoadingPage;
