import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./MenuPage.module.css";

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
    <br/>
      <h1 className={`${styles.heading} ${styles.textCenter}`}>Menu</h1>
      {distinctCategories.map((currentDistinctCategory) => (
        <Container
          key={currentDistinctCategory.id}
          className={styles.borderBox}
        >
          <h2 className={`${styles.subheading} ${styles.textCenter}`}>
            {currentDistinctCategory.category} List
          </h2>
          <Carousel className={styles.carouselContainer}>
            {categories
              .filter(
                (currentCategory) =>
                  currentCategory.category === currentDistinctCategory.category
              )
              .map((filteredCategory) => (
                <Carousel.Item
                  key={filteredCategory.id}
                  className={styles.carouselItem}
                >
                  <Link
                    to={`/menu/${filteredCategory.category}`}
                    className={styles.link}
                  >
                    <Carousel.Caption className={styles.carouselCaption}>
                      click to open
                    </Carousel.Caption>
                    <img
                      src={filteredCategory.imageUrl}
                      alt={filteredCategory.category}
                      className={styles.carouselImage}
                    />
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
