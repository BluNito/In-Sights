import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Cookies from "js-cookie";
import "./styles/styles.scss";

import Login from "./components/login";
import Register from "./components/register";
import Landing from "./components";
import Story from "./components/story";
import Writer from "./components/writer";

import { autologin } from "./store/actions/authActions";
import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "./utils/publicRoute";
import { mainLoad, setDimensions } from "./store/actions/comActions";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgb(48, 43, 99)",
      main: "rgb(41, 37, 87)",
      dark: "rgb(15, 12, 41)",
    },
  },
});

function App() {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  useEffect(() => {
    console.log("Searching for cookies");
    let cookieData = Cookies.get("is_creds");
    if (cookieData) {
      console.log("Found cookies!");
      store.dispatch(autologin(cookieData));
    } else {
      store.dispatch(mainLoad(false));
    }
    const handleResize = () => {
      store.dispatch(setDimensions(getWindowDimensions()));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Landing} />
            <PrivateRoute exact path="/story/read/:storyId" component={Story} />
            <PrivateRoute path="/story/write" component={Writer} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
