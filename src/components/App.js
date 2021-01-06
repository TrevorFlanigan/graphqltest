import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
