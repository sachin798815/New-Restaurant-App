import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authActions } from "../../Store/AuthStore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const loginToggleFunction = () => {
    setIsLogin((prev) => !prev);
  };

  const onSubmitFunction = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current?.value || "";
    const enteredPassword = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (!isLogin && enteredPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          enteredEmail,
          enteredPassword
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          enteredEmail,
          enteredPassword
        );
      }

      const user = userCredential.user;
      console.log("Logged in user:", user);

      const emailString = enteredEmail.split("@")[0];
      dispatch(
        authActions.login({
          token: user.stsTokenManager.accessToken,
          email: emailString,
          localId: user.uid,
        })
      );

      setErrorMessage(null);
      history.replace("/home");
    } catch (error) {
      console.error("Authentication error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className="p-4 border border-3 rounded mx-1">
          <Form onSubmit={onSubmitFunction} autoComplete="on" className="text-center">
            <div className="fw-bold fs-2 mb-3">
              {isLogin ? "Login" : "Sign Up"}
            </div>
            {errorMessage && (
              <p className="text-danger">
                {errorMessage}, please retry with correct credentials
              </p>
            )}
            <Form.Control
              type="email"
              placeholder="E-mail"
              ref={emailRef}
              className="mb-3"
              required
              autoComplete="on"
            />
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="mb-3"
              required
            />
            {!isLogin && (
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                className="mb-3"
                required
              />
            )}
            {isLogin && (
              <Form.Group className="mb-2 text-center">
                <Link to="/password" className="text-decoration-none">
                  Forgot password?
                </Link>
              </Form.Group>
            )}
            <Button type="submit" className="my-3 w-100 rounded-pill">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
          <Button
            variant="light"
            onClick={loginToggleFunction}
            className="w-100 mt-3"
          >
            {isLogin
              ? "Don't Have an account? Sign Up here"
              : "Have an account? Sign In here"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
