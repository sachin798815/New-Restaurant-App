import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const OrderStatusPage = () => {
  const [dataList, setDataList] = useState([]);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/accepted/${userName}.json`,
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
          const dataList = Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
          }));
          // Reverse the order of items, for lastest at top
          setDataList(dataList.reverse());
        }
      })
      .catch((error) => console.error(error));
  }, [userName]);

  return (
    <Container className="mt-5">
      {dataList.map((data) => (
        <Row key={data.id} className="mb-4">
          <Col>
            <Card className="shadow p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title>Order ID: {data.id}</Card.Title>
                <Card.Text>Items:</Card.Text>
                <ul>
                  {data.orderList.map((item, index) => (
                    <li key={index}>{item.recipe}</li>
                  ))}
                </ul>
                <Card.Text>Total Amount: ₹{data.totalAmount}</Card.Text>
                <Card.Text>Status: {data.orderStatus}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default OrderStatusPage;
