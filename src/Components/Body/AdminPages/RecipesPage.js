import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./RecipesPage.css";
import useAdminCheck from "../../useAdminCheck";

const RecipesPage = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const recipeRef = useRef();
  const categoryRef = useRef();
  const ingredientsRef = useRef();
  const priceRef = useRef();
  const urlRef = useRef();
  const {isAdmin} = useAdminCheck();

  useEffect(() => {
    fetch(
      "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/categories.json",
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

          // Filter distinct categories
          const distinctCategories = itemList.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.category === item.category)
          );
          setCategories(distinctCategories);
        }
      })
      .catch((error) => console.error(error));

    fetch(
      "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/recipes.json",
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

          setRecipes(itemList);
        }
      })
      .catch((error) => console.error(error));
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe,
          category,
          ingredients,
          price,
          imageUrl,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes((prev) => {
          return [
            ...prev,
            { id: data.name, recipe, category, ingredients, price, imageUrl },
          ];
        });
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
      {
        method: "DELETE",
      }
    );
    const newRecipes = recipes.filter((item) => item.id !== id);
    setRecipes(newRecipes);
  };

  const editHandler = (item) => {
    recipeRef.current.value = item.recipe;
    categoryRef.current.value = item.category;
    ingredientsRef.current.value = item.ingredients;
    priceRef.current.value = item.price;
    urlRef.current.value = item.imageUrl;
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/recipes/${item.id}.json`,
      {
        method: "DELETE",
      }
    );
    const newRecipes = recipes.filter((citem) => citem.id !== item.id);
    setRecipes(newRecipes);
  };

  if (!isAdmin) {
    return <h1>Access Denied</h1>;
  }

  return (
    <Container>
      <Card className="m-5 text-center border-5 shadow p-3 mb-5 bg-white rounded">
        <Card.Text className="m-3 h2">Add Recipe here</Card.Text>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Label className="h5">Recipe</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              ref={recipeRef}
              autoFocus
            ></Form.Control>
            <Form.Label className="h5">Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              ref={categoryRef}
              className="mb-3"
            >
              {categories.map((item) => (
                <option key={item.id}>{item.category}</option>
              ))}
            </Form.Select>
            <Form.Label className="h5">Ingredients</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              ref={ingredientsRef}
            ></Form.Control>
            <Form.Label className="h5">Price</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              ref={priceRef}
            ></Form.Control>
            <Form.Label className="h5">Image URL</Form.Label>
            <Form.Control
              type="url"
              className="mb-3"
              ref={urlRef}
            ></Form.Control>
            <Button type="submit">SUBMIT</Button>
          </Form>
        </Card.Body>
      </Card>
      <br />
      <br />
      <br />
      <Container className="m-2">
        <Row className="text-center m-4">
          <h2>Browse added recipes</h2>
        </Row>
        <Row className="p-2">
          {recipes.map((item) => (
            <Col key={item.id} xs={3}>
              <Card className="m-3 recipe-card border-2 shadow mb-5 bg-white rounded">
                <Card.Title className="m-2 recipe-title">
                  {item.recipe}
                </Card.Title>
                <Card.Body className="text-center">
                  <Card.Text className="text-center">{item.category}</Card.Text>
                  <Card.Img
                    src={item.imageUrl}
                    className="mb-2 recipe-img"
                  ></Card.Img>
                  <Card.Text className="ingredients-list">
                    Ingredients: {item.ingredients}
                  </Card.Text>
                  <Card.Text>Price: {item.price} Rs</Card.Text>
                  <Button
                    className="m-2"
                    variant="primary"
                    onClick={() => {
                      editHandler(item);
                    }}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => {
                      deleteHandler(item.id);
                    }}
                  >
                    DELETE
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default RecipesPage;
