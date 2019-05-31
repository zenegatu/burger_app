import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosFirebase from '../../../axios_firebase';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import {updateObj, checkValidity} from "../../../shared/util";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 3,
                    maxlength: 25
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 3,
                    maxlength: 20
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 40
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'fastest'},
                        {value: 'cheapest', display: 'cheapest'}
                    ],
                },

                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    };

    orderHandler = (evt) => {
        evt.preventDefault();
        const contactFormData = {};
        for (let label in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(label)) {
                contactFormData[label] = this.state.orderForm[label].value;
            }
        }

        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customerData: contactFormData,
            userID: this.props.userID,
            orderDate: new Date().toLocaleString()
        };

        this.props.onOrder(order, this.props.token);
    };

    inputChangeHandler = (event, label) => {
        const updatedElement = updateObj(this.state.orderForm[label], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[label].validation),
            touched: true
        });
        const updatedOrderForm =  updateObj(this.state.orderForm, {
        [label] : updatedElement
        });


        updatedOrderForm[label] = updatedElement;
        let formValid = true;
        for(let element in updatedOrderForm) {
            formValid = updatedOrderForm[element].valid && formValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formValid});
    };


    render() {

        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       valeu={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched = {formElement.config.touched}
                       changed={(event) => this.inputChangeHandler(event, formElement.id)}
                />
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.access_token,
        userID: state.auth.userID,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onOrder: (newOrderData,token) => dispatch(orderActions.async_purchase(newOrderData,token))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axiosFirebase ));