import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObj, checkValidity} from "../../shared/util";

class Auth extends Component {
    state = {
        loginFormElements: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isValid: false,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
        },
        isLogin: true
    };
    componentDidMount () {
        if( !this.props.isBuildingBurger && this.props.redirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }
    switchAuthModeHandler = () => {
       this.setState(prevState => {
           return {isLogin: !prevState.isLogin}
       })
    }
    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObj(this.state.loginFormElements, {
            [controlName]: updateObj(this.state.loginFormElements[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.loginFormElements[controlName].validation),
                touched: true
        })
    });
        this.setState({loginFormElements: updatedControls})
    };
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.loginFormElements.email.value,
            this.state.loginFormElements.password.value,
            this.state.isLogin
        );
    }
    render() {
        const formElemtsArry = [];
        for (let key in this.state.loginFormElements) {
            formElemtsArry.push({id: key, config: this.state.loginFormElements[key]})
        }
        let loginInputElmts =
                    formElemtsArry.map(formElement => (
                        <Input key={formElement.id}
                               elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               valeu={formElement.config.value}
                               invalid={!formElement.config.valid}
                               shouldValidate={formElement.config.validation}
                               touched={formElement.config.touched}
                               changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                    ));

        if(this.props.loading) {
            loginInputElmts = <Spinner/>
        }
        let errMsg = null;
        if(this.props.error) {
            errMsg = (<p>{this.props.error.message}</p>);
        }

        let loginRedirect = null;
        if(this.props.isLoggedIn){
            loginRedirect = <Redirect to={this.props.redirectPath}/>
        }

        return (
            <div className={classes.LoginData}>
                {loginRedirect}
                <h4> {this.state.isLogin ? 'LOGIN' : 'REGISTER'}</h4>
                {errMsg}
                <form onSubmit={this.onSubmitHandler}>
                    {loginInputElmts}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button btnType='Danger'
                        clicked={this.switchAuthModeHandler}
                ><small>SWITCH TO</small> <strong>{this.state.isLogin ? 'REGISTER' : 'LOGIN'}</strong></Button>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,psw,isLogin) => dispatch(actions.async_auth(email,psw,isLogin)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

    }
}
const mapStateToProps = state => {
    return {
        aToken: state.auth.access_token,
        error: state.auth.error,
        loading: state.auth.loading,
        isLoggedIn: state.auth.access_token !== null,
        redirectPath: state.auth.authRedirectPath,
        isBuildingBurger: state.burgerBuilder.building
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);