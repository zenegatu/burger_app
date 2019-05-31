import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/util';

const initialState = {
    ingredients: null,
    totalPrice: 1.50,
    error: false,
    building: false
};
const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    cheese: 0.5,
    meat: 1.4
};
const reducer = (state = initialState, action) => {
    const addIngredient = (state,action) => {
        const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
        const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        };
        return updateObj(state,updatedState);
    };
    const removeIngregient = (state,action) => {
        const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
        const updatedIngs = updateObj(state.ingredients, updatedIng);
        const updatedSt = {
            ingredients: updatedIngs,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        };
        return updateObj(state,updatedSt);
    };
    const initIngredients = (state,action) => {
        const updatedProps = {
            ingredients: action.ingredients,
            error: false,
            totalPrice: 1.50,
            building: false
        };
        return updateObj(state,updatedProps);
    };
    const initIngError = (state,action) => {
        return updateObj(state,{error:true});
    }
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngregient(state,action);
        case actionTypes.INIT_INGREDIENTS: return initIngredients(state,action);
        case actionTypes.INIT_INGREDIENTS_ERROR:return initIngError(state,action);
        default:return state;
    }
};
export default reducer;