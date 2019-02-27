import React from 'react';
import { shallow } from 'enzyme';
import PeopleTable from './PeopleTable';

const people = [];
const mockFunction = () => {

}

it('renders name ascending arrow', () => {
        const wrapper = shallow(
            <PeopleTable 
                people={people} 
                personSelected={mockFunction} 
                personUnselected={mockFunction} 
                sortPeople={mockFunction}
                sortByEmail={mockFunction} 
                sortByName={mockFunction} 
                sortedBy={'name'}
                sortedDescending={false}
                pageForward={mockFunction} 
                pageBackward={mockFunction}
                deletePerson={mockFunction}
                onTableEdited={mockFunction}
                updatePerson={mockFunction} 
                />)

        expect(wrapper.find(`th[aria-label='nameHeader']`).text()).toBe('Name ↑');
});

it('renders name descending arrow', () => {
    const wrapper = shallow(
        <PeopleTable 
            people={people} 
            personSelected={mockFunction} 
            personUnselected={mockFunction} 
            sortPeople={mockFunction}
            sortByEmail={mockFunction} 
            sortByName={mockFunction} 
            sortedBy={'name'}
            sortedDescending={true}
            pageForward={mockFunction} 
            pageBackward={mockFunction}
            deletePerson={mockFunction}
            onTableEdited={mockFunction}
            updatePerson={mockFunction} 
            />)

    expect(wrapper.find(`th[aria-label='nameHeader']`).text()).toBe('Name ↓');
});

it('renders email ascending arrow', () => {
    const wrapper = shallow(
        <PeopleTable 
            people={people} 
            personSelected={mockFunction} 
            personUnselected={mockFunction} 
            sortPeople={mockFunction}
            sortByEmail={mockFunction} 
            sortByName={mockFunction} 
            sortedBy={'email'}
            sortedDescending={false}
            pageForward={mockFunction} 
            pageBackward={mockFunction}
            deletePerson={mockFunction}
            onTableEdited={mockFunction}
            updatePerson={mockFunction} 
            />)

    expect(wrapper.find(`th[aria-label='emailHeader']`).text()).toBe('Email ↑');
});

it('renders email descending arrow', () => {
const wrapper = shallow(
    <PeopleTable 
        people={people} 
        personSelected={mockFunction} 
        personUnselected={mockFunction} 
        sortPeople={mockFunction}
        sortByEmail={mockFunction} 
        sortByName={mockFunction} 
        sortedBy={'email'}
        sortedDescending={true}
        pageForward={mockFunction} 
        pageBackward={mockFunction}
        deletePerson={mockFunction}
        onTableEdited={mockFunction}
        updatePerson={mockFunction} 
        />)

expect(wrapper.find(`th[aria-label='emailHeader']`).text()).toBe('Email ↓');
});