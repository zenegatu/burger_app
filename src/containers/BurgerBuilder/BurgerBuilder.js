import React, {Component} from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from '../../axios_firebase';
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
    state = {purchasing: false};

    componentDidMount() {
       this.props.onAsyncInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const ingCpy = {...ingredients};
        const sum = Object.keys(ingCpy).map(ingKey => {
            return ingCpy[ingKey]
        }).reduce((count, el) => {
            return count + el;
        }, 0)
        return sum > 0
    };
   /* addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngedients = {...this.state.ingredients};
        updatedIngedients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState(
            {
                ingredients: updatedIngedients,
                totalPrice: newPrice
            }
        )
        this.updatePurchaseState(updatedIngedients);
    };
    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;
        const updatedIngedients = {...this.state.ingredients};
        updatedIngedients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const priceDeduction = oldPrice - INGREDIENT_PRICES[type];
        this.setState(
            {
                ingredients: updatedIngedients,
                totalPrice: priceDeduction
            }
        );
        this.updatePurchaseState(updatedIngedients);
    };*/
    purchaseHandler = () => {
        if(this.props.isLoggedIn) {
            this.setState({purchasing:true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    };
    purchaseCancelledHandler = () => {
        this.setState({
            purchasing: false
        })
    };
    purchaseContinuedHandler = () => {

      /*  const queryParams = [];
        for(let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push(`totalPrice=${this.props.totalPrice}`);
        const queryString = queryParams.join('&');*/
      this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
            // search: `?${queryString}`
        });
    };

    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p>:<Spinner/>
        if (this.props.ingredients) {
            burger = <Wrapper>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    ingredientsAdded={this.props.onIngredientAdded}
                    ingedientsRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordering={this.purchaseHandler}
                    price={this.props.totalPrice}
                    isAuth={this.props.isLoggedIn}
                />
            </Wrapper>
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelledHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                totalPrice={Number.parseFloat( this.props.totalPrice ).toFixed( 2 )}
            />;
        }
        return (
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Wrapper> 
        )
    }
}
const mapStateToProps = (state) => {
return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isLoggedIn: state.auth.access_token !== null,
    redirectPath: state.auth.authRedirectPath,

}
};
const mapDispatchToProps = (dispatch) => {
return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onAsyncInitIngredients: () => dispatch(actions.async_initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
}
};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axiosInstance));