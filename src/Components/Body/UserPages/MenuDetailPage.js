import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./MenuDetailPage.module.css";

const MenuDetailPage = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const userName = sessionStorage.getItem("name");

  useEffect(() => {
    fetch(
      "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com//admin/recipes.json",
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
          setRecipes(filteredCategoryItems);
        }
      })
      .catch((error) => console.error(error));
  }, [category]);

  const addToCartHandler = (item) => {
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/orders/${userName}.json`,
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
      <h1 className={styles.heading}>Browse our menu</h1>
      <h2 className={styles.subheading}>Our {category} List</h2>
      <Container>
        <Row className={`border rounded text-center shadow ${styles.menuRow}`}>
          {recipes.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className={`${styles.detailCard}`}>
                <Card.Title className="m-2">{item.recipe}</Card.Title>
                <Card.Body>
                  <Card.Text>{item.category}</Card.Text>
                  <Card.Img src={item.imageUrl} className={styles.cardImg} />
                  <Card.Text className={styles.ingredientsList}>
                    Ingredients: {item.ingredients}
                  </Card.Text>
                  <Card.Text>Price: {item.price} Rs</Card.Text>
                  <Button
                    className="m-2"
                    variant="primary"
                    onClick={() => addToCartHandler(item)}
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
