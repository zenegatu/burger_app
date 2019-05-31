import React from 'react';
import styles from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
   let ingredientsArry = Object.keys(props.ingredients)
       .map(ingKey => {
           return [...Array(props.ingredients[ingKey])].map((_,i) => {
                  return <BurgerIngredient key={ingKey+i} type={ingKey}/>
               })
       }).reduce((prev,next) => {
           return prev.concat(next);
       }, []);
   if (ingredientsArry.length === 0) {
       ingredientsArry = <p>Please add ingredients</p>
   }
    return (
        <div className={styles.Burger}> 
            <BurgerIngredient type='bread-top'/>
            {ingredientsArry}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
};
export default burger;