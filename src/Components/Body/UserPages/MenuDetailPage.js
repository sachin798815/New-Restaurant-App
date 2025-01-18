import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./MenuDetailPage.css";

const MenuDetailPage = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    fetch(
      "https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/admin/recipes.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const itemList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          const filteredCategoryItems = itemList.filter(
            (item) => item.category === category
          );
          // console.log(filteredCategoryItems);
          setRecipes(filteredCategoryItems);
        }
      })
      .catch((error) => console.error(error));
  }, [category]);

  const addToCartHandler = (item) => {
    fetch(
      `https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/orders/${userName}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          userName: userName,
          recipe: item.recipe,
          price: item.price,
        }),
      }
    );
  };
  return (
    <>
      <h1 className="m-5">Browse our menu</h1>
      <h2 className="m-5">Our {category} List</h2>
      <Container>
        <Row className="border border-1 rounded text-center p-2 shadow mb-5 bg-white rounded">
          {recipes.map((item) => (
            <Col key={item.id} xs={3}>
              <Card className="m-2 p-2 detail-card">
                <Card.Title className="m-2">{item.recipe}</Card.Title>
                <Card.Body>
                  <Card.Text>{item.category}</Card.Text>
                  <Card.Img src={item.imageUrl} className="mb-2"></Card.Img>
                  <Card.Text className="ingredients-list">Ingredients : {item.ingredients}</Card.Text>
                  <Card.Text>Price : {item.price} Rs</Card.Text>
                  <Button
                    className="m-2"
                    variant="primary"
                    onClick={() => {
                      addToCartHandler(item);
                    }}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
    </>
  );
};
export default MenuDetailPage;
