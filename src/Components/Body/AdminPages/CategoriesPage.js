import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const categoryRef = useRef();
  const urlRef = useRef();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(
      "https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/admin/categories.json",
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
          setCategories(itemList);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const category = categoryRef.current.value;
    const imageUrl = urlRef.current.value;
    fetch(
      `https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/admin/categories.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, imageUrl }),
      }
    ).then(
      setCategories((prev) => {
        return [...prev, { id: imageUrl, category, imageUrl }];
      })
    );
    categoryRef.current.value="";
    urlRef.current.value="";
  };

  const deleteHandler = (id) => {
    fetch(
      `https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/admin/categories/${id}.json`,
      {
        method: "DELETE",
      }
    );
    const newCategories = categories.filter((item) => item.id !== id);
    setCategories(newCategories);
  };

  const editHandler=(item)=>{
    categoryRef.current.value=item.category;
    urlRef.current.value=item.imageUrl;
    fetch(
        `https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/admin/categories/${item.id}.json`,
        {
          method: "DELETE",
        }
      );
      const newCategories = categories.filter((citem) => citem.id !== item.id);
      setCategories(newCategories);
  }

  return (
    <Container className="shadow p-3 mb-5 bg-white rounded">
      <Card className="m-5 text-center border-5 shadow p-3 mb-5 bg-white rounded">
        <Card.Text className="m-3 h2">Add Category here</Card.Text>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Label className="h5">Category</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              ref={categoryRef}
              autoFocus
            ></Form.Control>
            <Form.Label className="h5">Image URL</Form.Label>
            <Form.Control
              type="url"
              className="mb-3"
              ref={urlRef}
            ></Form.Control>
            <Button type="submit" className="mt-3">SUBMIT</Button>
          </Form>
        </Card.Body>
      </Card>
      <br />
      <br />
      <br />
      <Container className="m-2">
        <Row className="text-center m-4"><h2>Browse added categories</h2></Row>
        <Row className="p-2">
          {categories.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card key={item.id} className="m-3 category-card border-2 shadow p-3 mb-5 bg-white rounded">
                <Card.Title className="m-2 category-title">
                  {item.category}
                </Card.Title>
                <Card.Img
                  src={item.imageUrl}
                  className="category-img"
                ></Card.Img>
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
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};
export default CategoriesPage;
