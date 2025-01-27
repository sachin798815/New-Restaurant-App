import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CheckoutPage = () => {
  const [orderList, setOrderList] = useState([]);
  const userName = localStorage.getItem("name");
  const [totalAmount, setTotalAmount] = useState(0);
  const history=useHistory();

  useEffect(() => {
    fetch(
      `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/orders/${userName}.json`,
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
          setTotalAmount(
            itemList.reduce((acc, item) => Number(acc) + Number(item.price), 0)
          );
        }
      })
      .catch((error) => console.error(error));
  }, [userName]);

  const placeOrderHandler=(e)=>{
    e.preventDefault();
    fetch(
        `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/accepted/${userName}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            orderList: orderList,
            totalAmount:totalAmount,
            orderStatus:"pending"
          }),
        }
      );
      fetch(
        `https://new-restaurant-app-8f44a-default-rtdb.firebaseio.com/orders/${userName}.json`,
        {
          method: "DELETE"
        }
      )
      history.push("/orderstatus")
  }
  return (
    <Container className="border rounded text-center container-sm p-2 mt-3 shadow p-3 mb-5 bg-white rounded">
        <h1 className="text-center my-4">Checkout</h1>
      <Form>
        {orderList.map((order) => (
          <li key={order.id} className="m-3">
            <span>{order.recipe} </span>
            <span>Rs {order.price}</span>
          </li>
        ))}
        <div className="fs-5 mb-3">Total amount : {totalAmount} Rs</div>
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter your address" />
        <Button type="submit" className="m-3" onClick={placeOrderHandler}>Place Order</Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
