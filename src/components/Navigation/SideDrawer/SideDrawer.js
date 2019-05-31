import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrapper from '../../../hoc/Wrapper/Wrapper';


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (

    <Wrapper>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ') } onClick={props.closed}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems isAuth={props.isLoggedIn}/>
            </nav>
        </div>
    </Wrapper>
    )
};
export default sideDrawer;