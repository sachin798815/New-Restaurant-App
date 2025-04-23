import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./CartComponent.module.css";

const CartComponent = (props) => {
  const [orderList, setOrderList] = useState([]);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com//orders/${userName}.json`,
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
            ...data[key],
            id: key,
          }));
          setOrderList(itemList);
        }
      })
      .catch((error) => console.error(error));
  }, [userName]);

  const removeHandler = (id) => {
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com//orders/${userName}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    const newOrderList = orderList.filter((item) => item.id !== id);
    setOrderList(newOrderList);
  };

  return (
    <Modal show={props.showCart} onHide={props.onShow} size="md" className={styles.modalResponsive}>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {orderList.map((order) => (
          <Row key={order.id} className={`${styles.orderRow}`}>
            <Col xs={12} sm={4} className={styles.colItem}>
              {order.recipe}
            </Col>
            <Col xs={6} sm={4} className={styles.colItem}>
              Rs {order.price}
            </Col>
            <Col xs={12} sm={4} className={`${styles.colItem} text-end`}>

              <Button
                variant="danger"
                onClick={() => removeHandler(order.id)}
                size="sm"
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Link to="/checkout" className="w-100 text-center">
          <Button variant="primary" onClick={props.onShow} className="w-100">
            CHECKOUT
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default CartComponent;
