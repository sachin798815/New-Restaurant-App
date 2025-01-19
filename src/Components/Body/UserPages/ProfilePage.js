import { useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = () => {
  const nameRef = useRef();
  const imgUrlRef = useRef();
  const history=useHistory();

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBAWtmrqXqGmJoN6ryiPw-uTZdAxw7fDxo",
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
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.users);
        if (data.users[0].displayName === undefined) {
          nameRef.current.value = "";
          imgUrlRef.current.value = "";
        } else {
          nameRef.current.value = data.users[0].displayName;
          imgUrlRef.current.value = data.users[0].photoUrl;
          localStorage.setItem("name",data.users[0].displayName)
        }
      });
  }, []);

  const formSubmitFunction = async (e) => {
    e.preventDefault();
    const nameInput = nameRef.current.value;
    const imgUrlInput = imgUrlRef.current.value;
    localStorage.setItem("name",nameInput);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAWtmrqXqGmJoN6ryiPw-uTZdAxw7fDxo",
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    history.push("/home");
  };

  return (
    <Row className="justify-content-md-center m-5">
      <h5 className="text-center mb-3">Please fill your details before moving on</h5>
      <Col xs={4} className="border border-3 rounded text-center">
        <Form className="p-4" onSubmit={formSubmitFunction}>
          <h1 className="fs-3 mb-3">Customer Details</h1>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" ref={nameRef} />
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control type="url" ref={imgUrlRef} />
          <Button className="m-3" variant="warning" type="submit">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
export default ProfilePage;