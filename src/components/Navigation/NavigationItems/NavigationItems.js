import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems= (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact={true} >Burger Builder</NavigationItem>
        {props.isAuth  ? <NavigationItem link='/orders' >Orders</NavigationItem>:null}
        {props.isAuth ?  <NavigationItem  link='/logout'>Logout</NavigationItem>:
            <NavigationItem  link='/auth'>Login or Register</NavigationItem>
        }
    </ul>
);
export default navigationItems;