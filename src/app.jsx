import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login, Movies, Register, Movie } from "./pages";
import { NavBar } from "./components";
import decode from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    const jwt = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY) || null;
    this.state = {
      user: jwt && decode(jwt),
    };
  }

  handleLogin = () => {
    const jwt = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
    const user = decode(jwt);
    this.setState({ user });
  };

  handleLogout = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);

    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <NavBar user={user} onLogout={this.handleLogout} />
        <div className="container pt-4 wrapper">
          <Switch>
            <Route
              exact
              path="/"
              component={(props) =>
                user ? (
                  <Movies {...props} user={this.state.user} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/movie/:movieID"
              component={(props) =>
                user ? <Movie {...props} /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              component={(props) =>
                user ? (
                  <Redirect to="/" />
                ) : (
                  <Login {...props} onLogin={this.handleLogin} />
                )
              }
            />
            <Route
              exact
              path="/login"
              component={(props) =>
                user ? (
                  <Redirect to="/" />
                ) : (
                  <Login {...props} onLogin={this.handleLogin} />
                )
              }
            />

            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
