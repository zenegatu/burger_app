import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label:'Salad',  type:'salad'},
    {label:'Bacon',  type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat',   type:'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> Current Price: <strong>{props.price.toFixed(2)}</strong></p>

        {controls.map(ctrl => (
            <BuildControl
                key = {ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientsAdded(ctrl.type)}
                removed={() => props.ingedientsRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            disabled={!props.purchasable}
            className={classes.OrderButton}
            onClick={props.ordering}
        >
            {props.isAuth ? 'ORDER NOW': 'LOGIN or REGISTER to ORDER'  }
        </button>
    </div>
);
export default buildControls;