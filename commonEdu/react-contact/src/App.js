import { Switch, Route } from "react-router-dom";
import ContactAdd from "./pages/ContactAdd";
import ContactUpdate from "./pages/ContactUpdate";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ContactList} />
      <Route exact path="/add" component={ContactAdd} />
      <Route exact path="/:id/update" component={ContactUpdate} />
      <Route path="/" component={NotFound} />
    </Switch>
  );
}

export default App;
