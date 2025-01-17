import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const OrdersPage = () => {
  const [dataList, setDataList] = useState([]);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    fetch(
      `https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/accepted.json`,
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
          const dataList = Object.keys(data)
            .map((key) => {
              const orders = data[key];
              return Object.keys(orders).map((orderKey) => ({
                ...orders[orderKey],
                id: orderKey,
              }));
            })
            .flat();

          const sortedDataList = dataList.sort((a, b) => 
            a.orderStatus === 'pending' ? -1 : (b.orderStatus === 'pending' ? 1 : 0)
          );
          
          setDataList(sortedDataList);
        }
      })
      .catch((error) => console.error(error));
  }, [userName]);

  const deliveredHandler = (order) => {
    fetch(
      `https://restaurant-delivery-app-5c344-default-rtdb.firebaseio.com/accepted/${order.userName}/${order.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...order,
          orderStatus: "delivered",
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        setDataList((prevDataList) =>
          prevDataList.map((item) =>
            item.id === order.id && item.userName === order.userName
              ? { ...item, orderStatus: "delivered" }
              : item
          )
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container className="mt-5">
      {dataList.map((data, index) => (
        <Row key={index} className="mb-4 border-5 shadow p-3 mb-5 bg-white rounded">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Name: {data.userName}</Card.Title>
                <Card.Text>Items:</Card.Text>
                <ul>
                  {data.orderList.map((item, i) => (
                    <li key={i}>{item.recipe}</li>
                  ))}
                </ul>
                <Card.Text>Total Amount: ₹{data.totalAmount}</Card.Text>
                <Card.Text>Status: {data.orderStatus}</Card.Text>
                {data.orderStatus === "pending" ? (
                  <Button
                    variant="success"
                    onClick={() => deliveredHandler(data)}
                  >
                    Delivered
                  </Button>
                ) : (
                  <Button variant="danger" disabled>
                    Confirm Delivered
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default OrdersPage;
