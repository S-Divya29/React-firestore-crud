import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contacts from './pages/Contacts';
import Layout from './components/Layout'

import Create1 from './pages/Create1'

function App() {
  return (
    <div className="app">
     <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Contacts />
            </Route>
            <Route path="/create">
              <Create1 />
            </Route>
          </Switch>
        </Layout>
      </Router>
      
    </div>
  );
}

export default App;