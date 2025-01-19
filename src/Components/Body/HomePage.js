import { useEffect } from "react";
import BhojanamImage from "../Images/Bhojanam.jpg";

import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./HomePage.css";

const HomePage = () => {
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
          history.push("/profile");
        } else {
          localStorage.setItem("name",data.users[0].displayName)
        }
      });
  }, [history]);

  return (
    <Container>
      <h1 className="text-center m-4">
        Welcome to Bhojanam – A Culinary Journey Through India!
      </h1>
      <img src={BhojanamImage} alt="Bhojanam" className="img-fluid mb-5 shadow p-3 mb-5 bg-white rounded" />
      <h2>Discover the Essence of India</h2>
      <p className="mb-5">
        At Bhojanam, we invite you to embark on a culinary adventure
        through the vibrant flavors and rich traditions of Indian cuisine.
        Nestled in the heart of Haryana, our restaurant offers an authentic
        dining experience where every dish tells a story.
      </p>
      <h2>Authentic Indian Flavors</h2>
      <p className="mb-5">
        Our menu features a diverse selection of traditional Indian dishes, from
        spicy curries and aromatic biryanis to freshly baked naan and
        tantalizing desserts. Each dish is crafted with the finest ingredients
        and traditional spices to deliver an unforgettable taste of India.
      </p>
      <h2>Warm Hospitality</h2>
      <p className="mb-5">
        Our team is dedicated to providing exceptional service and a warm,
        welcoming atmosphere. Whether you're joining us for a casual meal or a
        special celebration, we strive to make every visit memorable.
      </p>
      <h2>Explore Our Menu</h2>
      <p className="mb-5">
        Browse through our menu to discover a range of appetizers, entrees, and
        desserts that cater to every palate. We also offer vegetarian and
        gluten-free options to ensure everyone can enjoy our offerings.
      </p>
      <h2>Join Us</h2>
      <p className="mb-5">
        Experience the magic of Indian cuisine at [Restaurant Name]. Visit us at
        [Address] or call us at [Phone Number] to make a reservation. We look
        forward to serving you!
      </p>
      <Container className="text-center mb-5"><h4>THANK YOU FOR VISITING....</h4></Container>
      <br />
    </Container>
  );
};
export default HomePage;
