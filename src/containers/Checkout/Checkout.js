import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    };
    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    };

    /*  componentWillMount(){
          const query = new URLSearchParams(this.props.location.search);
          const updatedIngredients = {};
          for(let param of query.entries()) {
              if(param[0] === 'totalPrice') {
                  this.setState({totalPrice: param[1]})
              }else {
                  updatedIngredients[param[0]] = +param[1];
              }
          }
          this.setState({ingredients: updatedIngredients})
      }*/

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients) {
            const resetOrder = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (<div>
                {resetOrder}
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>)
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);