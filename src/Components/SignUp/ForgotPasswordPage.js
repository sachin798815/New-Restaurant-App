import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ForgotPasswordPage = (e) => {
  const emailRef = useRef();
  const resetFunction = () => {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAWtmrqXqGmJoN6ryiPw-uTZdAxw7fDxo",
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
      .then((data) => console.log(data));
  };

  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs={4} className="border border-3 rounded text-center">
          <Form className="p-4" onSubmit={resetFunction}>
            <div className="fs-3 mb-3">Reset Password Here</div>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} autoComplete="on" />
            <Button className="m-3" variant="warning" type="submit">
              RESET
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ForgotPasswordPage;
