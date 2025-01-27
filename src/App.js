import "./App.css";
import SignUpPage from "./Components/SignUp/SignUpPage";
import TopNavbarComponent from "./Components/Header/TopNavbarComponent";
import HomePage from "./Components/Body/HomePage";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import CategoriesPage from "./Components/Body/AdminPages/CategoriesPage";
import OrdersPage from "./Components/Body/AdminPages/OrdersPage";
import ProfilePage from "./Components/Body/UserPages/ProfilePage";
import ForgotPasswordPage from "./Components/SignUp/ForgotPasswordPage";
import MenuPage from "./Components/Body/UserPages/MenuPage";
import MenuDetailPage from "./Components/Body/UserPages/MenuDetailPage";
import CheckoutPage from "./Components/Body/UserPages/CheckoutPage";
import OrderStatusPage from "./Components/Body/UserPages/OrderStatusPage";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import RecipesPage from "./Components/Body/AdminPages/RecipesPage.js";

function App() {

  return (
    <Container fluid className="h-100 w-100 p-0">
      {/* Navbar */}
      <TopNavbarComponent />

      {/* Main Content */}
      <Switch>
        <Route path="/" exact>
          <SignUpPage />
        </Route>
        <Route path="/password">
          <ForgotPasswordPage />
        </Route>

        {/*Admin Pages*/}
        <Route path="/categories">
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        </Route>
        <Route path="/recipes">
          <ProtectedRoute>
            <RecipesPage />
          </ProtectedRoute>
        </Route>
        <Route path="/orders">
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        </Route>

        {/*User Pages*/}
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/menu" exact>
          <MenuPage />
        </Route>
        <Route path="/menu/:category">
          <MenuDetailPage />
        </Route>
        <Route path="/checkout">
          <CheckoutPage />
        </Route>
        <Route path="/orderstatus">
          <OrderStatusPage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
