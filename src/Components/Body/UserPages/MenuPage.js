import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./MenuPage.css";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);


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
