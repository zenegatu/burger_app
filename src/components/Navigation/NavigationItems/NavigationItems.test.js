import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});
let wrapper;
beforeEach(() => {
    wrapper = shallow(<NavigationItems/>);
})

describe('<NavigationItems/>', () => {
    it('should have TWO NavigationItems when NOT logged in', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should have THREE NavigationItems when LOGGED IN', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
})