import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = () => {
  const nameRef = useRef();
  const imgUrlRef = useRef();
  const history = useHistory();
  const [firstLogin,setFirstLogin]=useState(false);

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA0pqJSQ-yEZoPYGgevk5n-EitxkfOOIdg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data.users);
        if (data.users[0].displayName === undefined) {
          setFirstLogin(true);
          nameRef.current.value = "";
          imgUrlRef.current.value = "";
          
        } else {
          nameRef.current.value = data.users[0].displayName;
          imgUrlRef.current.value = data.users[0].photoUrl || "";
          localStorage.setItem("name", data.users[0].displayName);
        }
      })
      .catch((err) => console.error(err));
  }, [history]);

  const formSubmitFunction = async (e) => {
    e.preventDefault();
    const nameInput = nameRef.current.value.trim();
    const imgUrlInput = imgUrlRef.current.value.trim();

    if (!nameInput) {
      alert("Full Name cannot be empty");
      return;
    }

    localStorage.setItem("name", nameInput);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA0pqJSQ-yEZoPYGgevk5n-EitxkfOOIdg",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: nameInput,
            photoUrl: imgUrlInput,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Profile updated successfully", data);
        history.push("/home");
      } else {
        throw new Error(data.error.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating your profile. Please try again.");
    }
  };

  return (
    <Row className="justify-content-md-center m-5">
      {firstLogin && <h5 className="text-center mb-4 text-secondary">
        Please fill your details before moving on
      </h5>}
      <Col xs={12} sm={8} md={6} lg={5} className="border border-3 rounded shadow-sm p-4 bg-light">
        <Form onSubmit={formSubmitFunction}>
          <h1 className="fs-4 mb-4 text-primary">Customer Details</h1>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              ref={nameRef}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Photo URL</Form.Label>
            <Form.Control
              type="url"
              ref={imgUrlRef}
              placeholder="Enter a valid image URL (optional)"
            />
          </Form.Group>
          <Button className="mt-3 w-100" variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfilePage;
