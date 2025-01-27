import "./App.css";
import SignUpPage from "./Components/SignUp/SignUpPage";
import TopNavbarComponent from "./Components/Header/TopNavbarComponent";
import HomePage from "./Components/Body/HomePage";
import { Container} from "react-bootstrap";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import CategoriesPage from "./Components/Body/AdminPages/CategoriesPage";
import RecipesPage from "./Components/Body/AdminPages/RecipesPage";
import OrdersPage from "./Components/Body/AdminPages/OrdersPage";
import ProfilePage from "./Components/Body/UserPages/ProfilePage";
import ForgotPasswordPage from "./Components/SignUp/ForgotPasswordPage";
import MenuPage from "./Components/Body/UserPages/MenuPage";
import MenuDetailPage from "./Components/Body/UserPages/MenuDetailPage";
import CheckoutPage from "./Components/Body/UserPages/CheckoutPage";
import OrderStatusPage from "./Components/Body/UserPages/OrderStatusPage";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Container fluid className="h-100 w-100 p-0">
      {/* Navbar */}
      <TopNavbarComponent />

      {/* Main Content */}
      <Switch>
        {!isAuthenticated && (
          <Route path="/" exact>
            <SignUpPage />
          </Route>
        )}
        {isAuthenticated && (
          <Route path="/" exact>
            <SignUpPage/>
          </Route>
        )}
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/categories">
          <CategoriesPage/>
        </Route>
        <Route path="/recipes">
          <RecipesPage/>
        </Route>
        <Route path="/orders">
          <OrdersPage/>
        </Route>
        <Route path="/profile">
          <ProfilePage/>
        </Route>
        <Route path="/password">
          <ForgotPasswordPage/>
        </Route>
        <Route path="/menu" exact>
          <MenuPage/>
        </Route>
        <Route path="/menu/:category">
        <MenuDetailPage/>
        </Route>
        <Route path="/checkout">
        <CheckoutPage/>
        </Route>
        <Route path="/orderstatus">
        <OrderStatusPage/>
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
