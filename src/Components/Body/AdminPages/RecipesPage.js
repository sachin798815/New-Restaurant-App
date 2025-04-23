import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./RecipesPage.module.css";
import useAdminCheck from "../../useAdminCheck";
import LoadingPage from "../LoadingPage";

const RecipesPage = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const recipeRef = useRef();
  const categoryRef = useRef();
  const ingredientsRef = useRef();
  const priceRef = useRef();
  const urlRef = useRef();
  const { isAdmin } = useAdminCheck();

  useEffect(() => {
    fetch(
      "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/categories.json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const distinct = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.category === item.category)
            );
          setCategories(distinct);
        }
      });

    fetch(
      "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/recipes.json"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const items = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setRecipes(items);
        }
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const recipe = recipeRef.current.value;
    const category = categoryRef.current.value;
    const ingredients = ingredientsRef.current.value;
    const price = priceRef.current.value;
    const imageUrl = urlRef.current.value;

    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/recipes.json`,
      {
        method: "POST",
        body: JSON.stringify({
          recipe,
          category,
          ingredients,
          price,
          imageUrl,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipes((prev) => [
          ...prev,
          { id: data.name, recipe, category, ingredients, price, imageUrl },
        ]);
      });

    recipeRef.current.value = "";
    categoryRef.current.value = "";
    ingredientsRef.current.value = "";
    priceRef.current.value = "";
    urlRef.current.value = "";
  };

  const deleteHandler = (id) => {
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/recipes/${id}.json`,
      { method: "DELETE" }
    );
    setRecipes(recipes.filter((item) => item.id !== id));
  };

  const editHandler = (item) => {
    recipeRef.current.value = item.recipe;
    categoryRef.current.value = item.category;
    ingredientsRef.current.value = item.ingredients;
    priceRef.current.value = item.price;
    urlRef.current.value = item.imageUrl;

    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/recipes/${item.id}.json`,
      { method: "DELETE" }
    );
    setRecipes(recipes.filter((r) => r.id !== item.id));
  };

  if (!isAdmin) return <LoadingPage />;

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <Container fluid className="px-2 py-3">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={10} lg={9} xl={8}>
            <Card className="shadow">
              <Card.Body>
                <Card.Text className="h4 text-center mb-4">Add Recipe</Card.Text>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3">
                    <Form.Label className="h6">Recipe</Form.Label>
                    <Form.Control type="text" ref={recipeRef} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="h6">Category</Form.Label>
                    <Form.Select ref={categoryRef}>
                      {categories.map((item) => (
                        <option key={item.id}>{item.category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="h6">Ingredients</Form.Label>
                    <Form.Control type="text" ref={ingredientsRef} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="h6">Price</Form.Label>
                    <Form.Control type="text" ref={priceRef} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="h6">Image URL</Form.Label>
                    <Form.Control type="url" ref={urlRef} />
                  </Form.Group>
                  <Button type="submit" variant="success" className="mt-2 w-100">
                    SUBMIT
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="text-center mb-3">
          <h4>Browse added recipes</h4>
        </Row>

        <Row className="gx-2 gy-4 w-100 mx-0 overflow-hidden">
          {recipes.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4 p-0">
              <Card className={styles.card}>
                <Card.Body className="d-flex flex-column text-center">
                  <Card.Title className={styles.cardTitle}>{item.recipe}</Card.Title>
                  <Card.Text>{item.category}</Card.Text>
                  <Card.Img variant="top" src={item.imageUrl} className={styles.cardImage} />
                  <div className={styles.ingredients}>
                    <Card.Text>Ingredients: {item.ingredients}</Card.Text>
                  </div>
                  <Card.Text>Price: {item.price} Rs</Card.Text>
                  <div className="d-flex justify-content-center mt-auto">
                    <Button
                      variant="primary"
                      className={styles.cardBtn}
                      onClick={() => editHandler(item)}
                    >
                      EDIT
                    </Button>
                    <Button
                      variant="danger"
                      className={styles.cardBtn}
                      onClick={() => deleteHandler(item.id)}
                    >
                      DELETE
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RecipesPage;
