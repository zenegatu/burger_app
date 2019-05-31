import React from 'react';
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});
let wrapper;
beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onAsyncInitIngredients = {() => {} }/>);
});
    describe(<BurgerBuilder/>, () => {

        it('should display controls for each ingredients available', () => {
            wrapper.setProps({ingredients: {salad:0}});
            expect(wrapper.find(BuildControls)).toHaveLength(1);
        })
    });
