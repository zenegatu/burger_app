import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    };
    drawerToggleHandler = () => {
        this.setState(
            (prevState) => {
                return { showSideDrawer: !prevState.showSideDrawer}
            }
        )
    };
    render() {
        return (
            <Wrapper>
                <Toolbar
                    drawerToggleCliked={this.drawerToggleHandler}
                    isLoggedIn={this.props.isAuthenticated}
                   />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isLoggedIn={this.props.isAuthenticated}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
};
const mapPropsToState = (state) => {
    return {
        isAuthenticated: state.auth.access_token !== null,
    }
    }
export default connect(mapPropsToState)(Layout);