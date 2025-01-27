import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
          console.log(data)
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
    <Modal show={props.showCart} onHide={props.onShow} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderList.map((order) => (
          <Row key={order.id} className="m-3">
            <Col>{order.recipe} </Col>
            <Col>Rs {order.price}</Col>
            <Col>
              <Button
                variant="danger"
                onClick={() => {
                  removeHandler(order.id);
                }}
                className="ms-3"
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Link to="/checkout">
          <Button variant="primary" onClick={props.onShow}>
            CHECKOUT
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};
export default CartComponent;
