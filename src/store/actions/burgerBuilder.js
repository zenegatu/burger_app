import * as actionTypes from './actionTypes';
import remote from '../../axios_firebase'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
    };

    const initIngredients = (ingredients) => {
        return {
            type: actionTypes.INIT_INGREDIENTS,
            ingredients:ingredients
        }
    };
    const initIngredientsError = () => {
        return {
            type: actionTypes.INIT_INGREDIENTS_ERROR
        }
    };
    export const async_initIngredients = () => {
        return dispatch => {
            remote.get('/ingredients.json')
                .then(response => {
                    dispatch(initIngredients(response.data));
                })
                .catch(error => {
                    dispatch(initIngredientsError());
                })
        }
    };

