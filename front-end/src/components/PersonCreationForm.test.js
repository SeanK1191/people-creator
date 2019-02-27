import React from 'react';
import { shallow } from 'enzyme';
import PersonCreationForm from './PersonCreationForm';

it('renders title', () => {
    const wrapper = shallow(<PersonCreationForm refreshPeople={() => {}} />);

    expect(wrapper.find('#formTitle').text()).toBe('Person Creation Form');
});