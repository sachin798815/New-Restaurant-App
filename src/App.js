import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Suspense, lazy } from "react";
import LoadingPage from "./Components/Body/LoadingPage";

// Lazy-loaded components
const SignUpPage = lazy(() => import("./Components/SignUp/SignUpPage"));
const TopNavbarComponent = lazy(() => import("./Components/Header/TopNavbarComponent"));
const HomePage = lazy(() => import("./Components/Body/HomePage"));
const CategoriesPage = lazy(() => import("./Components/Body/AdminPages/CategoriesPage"));
const OrdersPage = lazy(() => import("./Components/Body/AdminPages/OrdersPage"));
const ProfilePage = lazy(() => import("./Components/Body/UserPages/ProfilePage"));
const ForgotPasswordPage = lazy(() => import("./Components/SignUp/ForgotPasswordPage"));
const MenuPage = lazy(() => import("./Components/Body/UserPages/MenuPage"));
const MenuDetailPage = lazy(() => import("./Components/Body/UserPages/MenuDetailPage"));
const CheckoutPage = lazy(() => import("./Components/Body/UserPages/CheckoutPage"));
const OrderStatusPage = lazy(() => import("./Components/Body/UserPages/OrderStatusPage"));
const RecipesPage = lazy(() => import("./Components/Body/AdminPages/RecipesPage"));
const ProtectedRoute = lazy(() => import("./Components/ProtectedRoute"));

function App() {
  return (
    <Container fluid className="h-100 w-100 p-0">
      <Suspense fallback={<LoadingPage/>}>
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

          {/* Admin Pages */}
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

          {/* User Pages */}
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
      </Suspense>
    </Container>
  );
}

export default App;
