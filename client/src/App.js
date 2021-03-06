import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import Navbar from "./components/layout/Navbar";
import BottomNavbar from "./components/layout/BottomNavbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
// Regions flow
import Regions from "./components/regions/Regions";
import CreateRegions from "./components/regions/CreateRegions";
import ManageRegions from "./components/regions/ManageRegions";
import DateFnsUtils from "@date-io/date-fns";

import "./App.css";
import RegionDetailView from "./components/regions/RegionDetailView";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
const theme = createMuiTheme({
  palette: {
    default: {
      main: "#ffffff !important",
    },
    primary: {
      main: "#ffae12",
      contrastText: "#fff",
    },
    secondary: {
      main: "#b0bec5",
    },
  },
  typography: {
    h5: {
      fontFamily: ["Red Hat Text", "sans-serif"].join(","),
      textTransform: "none",
    },
    h4: {
      fontFamily: ["Red Hat Text", "sans-serif"].join(","),
      textTransform: "none",
    },
    h3: {
      fontFamily: ["Red Hat Text", "sans-serif"].join(","),
      textTransform: "none",
    },
    h2: {
      fontFamily: ["Red Hat Text", "sans-serif"].join(","),
      textTransform: "none",
    },
    h1: {
      fontFamily: ["Red Hat Text", "sans-serif"].join(","),
      textTransform: "none",
    },
    body2: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      textTransform: "none",
      fontWeight: "strong",
    },
    body1: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      textTransform: "none",
    },
  },
});
class App extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    store.dispatch(logoutUser());
  };
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
              <div className="App">
                <Navbar />
                <Route exact path="/" component={Regions} />
                {/* <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} /> */}
                {/* <Switch> */}
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/regions" component={Regions} />
                <Route exact path="/create-regions" component={CreateRegions} />
                <Route exact path="/manage-regions" component={ManageRegions} />
                <Route
                  exact
                  path="/manage-regions/:countryName"
                  component={RegionDetailView}
                />
                {/* </Switch> */}
                <BottomNavbar />
              </div>
            </Router>
          </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
