import React from 'react';
import Classes from './Order.css'

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }
    const ingredientsOutput = ingredients.map(aIngredient => {
        return <tr key={aIngredient.name} style={{textTransform: 'capitalize'}}>
            <td>{aIngredient.name}</td>
            <td>{aIngredient.amount}</td>
        </tr>
    });

    return (
        <div className={Classes.Order}>
            <table>
                <tbody>
                <tr>
                    <td>Order Date</td>
                    <td>{props.date}</td>
                </tr>
                <tr>
                    <td>Order Nr.</td>
                    <td>{props.id.substr(props.id.length-5,props.id.length).toUpperCase()}</td>
                </tr>
                <tr style={{backgroundColor: 'black', color: 'white'}}>
                    <td>INGREDIENTS</td>
                </tr>
                {ingredientsOutput}
                <tr>
                    <td><strong>Total Price</strong></td>
                    <td><strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
};
export default order;