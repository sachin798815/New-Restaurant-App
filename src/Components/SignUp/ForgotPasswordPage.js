import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ForgotPasswordPage = () => {
  const emailRef = useRef();

  const resetFunction = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA0pqJSQ-yEZoPYGgevk5n-EitxkfOOIdg",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          requestType: "PASSWORD_RESET",
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} sm={10} md={8} lg={6} xl={5} className="border border-3 rounded p-4">
        <Form onSubmit={resetFunction} className="text-center">
          <div className="fs-3 mb-4">Reset Password Here</div>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required autoComplete="on" />
          </Form.Group>
          <Button className="w-100" variant="warning" type="submit">
            RESET
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;
