import React, {Component} from 'react';
import {connect} from 'react-redux'
import Order from '../../components/Order/Order';
import firebaseAxios from '../../axios_firebase';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.access_token, this.props.userID);
    }
    render() {
        let orders = <Spinner/>;
        if(!this.props.loading && this.props.orders.length >= 1) {
            orders = this.props.orders.map(order => (
                    <Order key={order.orderID}
                           ingredients={order.ingredients}
                           price={order.price}
                           id={order.orderID}
                           date={order.orderDate}
                    />
                ))
        } else if (!this.props.orders.length) {
            orders = <h2>NO ORDERS</h2>
        }
        return(<div>{orders}</div>)
    }
}

const mapStateToProps = state => {
return {
    orders: state.order.orders,
    error: state.order.error,
    loading: state.order.loading,
    access_token: state.auth.access_token,
    userID: state.auth.userID,
}
};

const mapDispatchToProps = dispatch => {
return {
    onFetchOrders: (token,userID) => dispatch(actions.async_fetchOrder(token,userID))
}
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,firebaseAxios));