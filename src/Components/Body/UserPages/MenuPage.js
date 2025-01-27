import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./MenuPage.css";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);

  useEffect(() => {
    fetch(
      "https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com//admin/categories.json",
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
          setDistinctCategories(distinctCategories);
          setCategories(itemList);
        }
      })
      .catch((error) => console.error(error));

  }, []);

  return (
    <>
      <h1 className="text-center m-5">Menu</h1>
      {distinctCategories.map((currentDistinctCategory) => (
        <Container key={currentDistinctCategory.id} className="border rounded mb-5 p-1">
          <h2 className="text-center">{currentDistinctCategory.category} List</h2>
          <Carousel className="bg-info">
            {categories
              .filter(
                (currentCategory) =>
                  currentCategory.category === currentDistinctCategory.category
              )
              .map((filteredCategory) => (
                  <Carousel.Item key={filteredCategory.id} className="text-center">
                    <Link to={`/menu/${filteredCategory.category}`}  className="text-decoration-none text-dark">
                    <Carousel.Caption>click to open</Carousel.Caption>
                    <img src={filteredCategory.imageUrl} alt={filteredCategory.category} />
                    </Link>
                </Carousel.Item>
              ))}
          </Carousel>
        </Container>
      ))}
      <br />
    </>
  );
};

export default MenuPage;
