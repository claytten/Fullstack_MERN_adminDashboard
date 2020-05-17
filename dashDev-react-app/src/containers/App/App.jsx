import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../redux/actions/authActions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import store from './store';
import ScrollToTop from './ScrollToTop';
import Loading from '../../shared/components/Loading';
import MainWrapper from './MainWrapper';
import PrivateRoute from "./private-route/PrivateRoute";
import Landing from '../Landing/index';
import LogIn from '../Account/LogIn/index';
import Register from '../Account/Register/index';
import WrappedRoutes from './Router/WrappedRoutes/index';

class App extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        loaded: false
      };
    }
  
    componentDidMount() {
      window.addEventListener('load', () => {
        this.setState({ loading: false });
        setTimeout(() => this.setState({ loaded: true }), 500);
      });
      // Check for token to keep user logged in
      if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        // const setCurrent = setCurrentUser(decoded);
        console.log(store.dispatch(setCurrentUser(decoded)));
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
          // Logout user
          store.dispatch(logoutUser());

          // Redirect to login
          window.location.href = "./log_in";
        }
      }
    }
  
    render() {
      const { loaded, loading } = this.state;
      
      return (
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop>
                    <Fragment>
                    {!loaded
                        && (
                        <Loading loading={loading} />
                        )
                    }
                    <div>
                      <MainWrapper>
                        <main>
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/log_in" component={LogIn} />
                            <Route exact path="/register" component={Register} />
                            <PrivateRoute path="/" component={WrappedRoutes} />
                        </Switch>
                        </main>
                      </MainWrapper>
                    </div>
                    </Fragment>
                </ScrollToTop>
            </BrowserRouter>
        </Provider>
      );
    }
  }
  
  export default hot(module)(App);