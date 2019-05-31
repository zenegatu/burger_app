import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});
const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
})

class App extends Component {
    componentDidMount () {
        this.props.onAutoReLogin();
    }
  render() {
        let routes = (
            <Switch>
                <Route path='/' exact component={BurgerBuilder}/>
                <Route path='/auth' component={asyncAuth}/>
                <Redirect to="/"/>
            </Switch>

        );
        if (this.props.isLoggedIn) {
            routes = (
                <Switch>
                    <Route path='/' exact component={BurgerBuilder}/>
                    <Route path='/orders' exact component={asyncOrders}/>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/auth' component={asyncAuth}/>
                    <Route path='/logout' component={Logout}/>
                    <Redirect to="/"/>

                </Switch>
            )
        }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.access_token !== null
    }
}
const mapDispatchToProps = dispatch =>  {
    return {
        onAutoReLogin: () => dispatch(actions.autoReLogin())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
