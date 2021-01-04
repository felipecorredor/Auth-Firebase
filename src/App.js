import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Admin } from './components/Admin';
import { Auth } from './components/Auth';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { auth } from './firebase';
import { PrivateRoute } from './PrivateRoute';

function App() {

  const [isAuth, setIsAuth] = useState(false)
  React.useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        if (user) {
          setIsAuth(true)
        }        
      } else {
        setIsAuth(null)
      }
    });
  }, [])


  return isAuth !== false ? (
    <Router>
      <Layout isAuth={isAuth}>                
        <Switch>
          <Route type="public" exact path="/" component={Home} />          
          <Route type="public" exact path="/login" component={Auth} />
          <PrivateRoute isAuth={isAuth} type="private" exact path="/admin" component={Admin} />
        </Switch>        
      </Layout>
    </Router>    
  ) : (
    <p>Loading...</p>
  )  
  
}

export default App;
