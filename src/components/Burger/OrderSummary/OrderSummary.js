import React from 'react';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const order = Object.keys(props.ingredients).map((ingKey) => {
        return <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}</span>:{props.ingredients[ingKey]} </li>;
    });

    return (
    <Wrapper>
        <h3>Your Order Summary</h3>
        <p>Burger with the following ingredients:</p>
        <ul>
            {order}
        </ul>
            <p><strong>Price: {props.totalPrice}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Wrapper>
    );
};

   export default orderSummary;

