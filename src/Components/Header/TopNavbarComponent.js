import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { authActions } from "../../Store/AuthStore";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CartComponent from "./CartComponent";
import { useState } from "react";
import "./TopNavbarComponent.css";

const TopNavbarComponent = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  const showCartHandler = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <Navbar expand="lg" className="bg-warning h-auto sticky-top text-center">
      <Container>
        <Navbar.Brand className="navbar-brand">
          Bhojanam
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-center flex-grow-1">
            {!isAdmin && isAuthenticated && (
              <Nav.Item className="me-3">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  HOME
                </NavLink>
              </Nav.Item>
            )}
            {!isAdmin && isAuthenticated && (
              <Nav.Item className="me-3">
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  MENU
                </NavLink>
              </Nav.Item>
            )}
            {isAdmin && isAuthenticated && (
              <Nav.Item className="me-3">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  CATEGORIES
                </NavLink>
              </Nav.Item>
            )}
            {isAdmin && isAuthenticated && (
              <Nav.Item className="me-3">
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  RECIPES
                </NavLink>
              </Nav.Item>
            )}
            {!isAdmin && isAuthenticated && (
              <Nav.Item className="me-3">
                <NavLink
                  to="/checkout"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  CHECKOUT
                </NavLink>
              </Nav.Item>
            )}
            {!isAdmin && isAuthenticated && (
              <Nav.Item className="me-3">
                <NavLink
                  to="/orderstatus"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  ORDER STATUS
                </NavLink>
              </Nav.Item>
            )}
            {isAdmin && isAuthenticated && (
              <Nav.Item className="me-3">
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  ORDERS
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
          {!isAdmin && isAuthenticated && (
            <Button className="me-1" onClick={showCartHandler}>
              CART
            </Button>
          )}
          {!isAdmin && isAuthenticated && (
            <Link to="/profile">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS5C3hMJAB0qC5MLj1Ry00tZsEka29QJOnrld-b5fVNGavfJnZBiG5duTUIg&s"
                alt="profile"
                style={{ width: "40px" }}
                className="me-1"
              />
            </Link>
          )}
          {isAuthenticated && (
            <Button
              onClick={logoutHandler}
              variant="danger"
              className="ms-auto"
            >
              Logout
            </Button>
          )}
          {showCart && (
            <CartComponent onShow={showCartHandler} showCart={showCart} />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbarComponent;
