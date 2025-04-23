import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import useAdminCheck from "../../useAdminCheck";

const CategoriesPage = () => {
  const categoryRef = useRef();
  const urlRef = useRef();
  const [categories, setCategories] = useState([]);
  const { isAdmin } = useAdminCheck();

  useEffect(() => {
    fetch(
      "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/categories.json"
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
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/categories.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, imageUrl }),
      }
    ).then(() => {
      setCategories((prev) => [...prev, { id: imageUrl, category, imageUrl }]);
      categoryRef.current.value = "";
      urlRef.current.value = "";
    });
  };

  const deleteHandler = (id) => {
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/admin/categories/${id}.json`,
      { method: "DELETE" }
    );
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const editHandler = (item) => {
    categoryRef.current.value = item.category;
    urlRef.current.value = item.imageUrl;
    deleteHandler(item.id);
  };

  if (!isAdmin) return <h1>Loading...</h1>;

  return (
    <Container className="p-3">
      <Card className="mt-4 mb-5 text-center shadow rounded border-0">
        <Card.Body>
          <Card.Title className="h2 mb-4">Add Category Here</Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Category</Form.Label>
              <Form.Control type="text" ref={categoryRef} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Image URL</Form.Label>
              <Form.Control type="url" ref={urlRef} required />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-2 px-4">
              SUBMIT
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <br/>
      <Row className="text-center mt-5 mb-3">
        <h2>Browse Added Categories</h2>
      </Row>
      <Row className="g-4">
        {categories.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-truncate">{item.category}</Card.Title>
                <Card.Img
                  src={item.imageUrl}
                  alt={item.category}
                  className="my-3"
                  style={{ height: "150px", objectFit: "cover", borderRadius: "10px" }}
                />
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => editHandler(item)}>
                    EDIT
                  </Button>
                  <Button variant="danger" onClick={() => deleteHandler(item.id)}>
                    DELETE
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesPage;
