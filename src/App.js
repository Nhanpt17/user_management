import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Layout from "./pages/Layout";
import { Link } from "react-router-dom";

// Route bảo vệ: Kiểm tra nếu chưa đăng nhập thì chuyển hướng về Login
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <Router>
      <Switch>
        {/* Nếu đã đăng nhập, vào "/" sẽ chuyển sang dashboard */}
        <Route exact path="/">
          {localStorage.getItem("token") ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route
          path="/login"
          render={(props) =>
            localStorage.getItem("token") ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login {...props} />
            )
          }
        />
        {/* Các trang  ko yêu cầu đăng nhập */}
        
        <Route path="/register" component={Register} />

        {/* Các trang yêu cầu đăng nhập */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
