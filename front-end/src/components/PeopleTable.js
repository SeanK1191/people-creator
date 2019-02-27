import React from 'react'
import PropTypes from 'prop-types';

const PeopleTable = function({ people, personSelected, personUnselected, sortPeople, sortedBy, sortedDescending, pageForward, pageBackward, deletePerson, onTableEdited, updatePerson }) {

    const arrow = sortedDescending === true ? <span>&#8595;</span> : <span>&#8593;</span>;

    const nameHeader = sortedBy === 'name' ? <span>Name {arrow}</span> : <span>Name</span>;
    const emailHeader = sortedBy === 'email' ? <span>Email {arrow}</span> : <span>Email</span>;

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th aria-label='nameHeader' style={{ cursor: 'pointer', backgroundColor: 'LightGray'  }} onClick={() => { sortPeople('name') }}>{nameHeader}</th>
                        <th>Age</th>
                        <th>Balance</th>
                        <th aria-label='emailHeader' style={{ cursor: 'pointer', backgroundColor: 'LightGray'  }} onClick={() => { sortPeople('email') }}>{emailHeader}</th>
                        <th>Address</th>
                    </tr>
                    {
                        people === undefined ? null :
                        people.map((person) => {
                            return (
                                <tr key={person.Id}>
                                    <td><input onChange={event => onTableEdited(person, { Name: event.target.value })} type='text' defaultValue={person.Name} /></td>
                                    <td><input onChange={event => onTableEdited(person, { Age: event.target.value })} type='number' defaultValue={person.Age} /></td>
                                    <td><input onChange={event => onTableEdited(person, { Balance: event.target.value })} type='number' defaultValue={person.Balance} /></td>
                                    <td><input onChange={event => onTableEdited(person, { Email: event.target.value })} type='text' defaultValue={person.Email} /></td>
                                    <td><input onChange={event => onTableEdited(person, { Address: event.target.value })} type='text' defaultValue={person.Address} /></td>
                                    <td>
                                        {
                                            person.selected ? <span style={{ cursor: 'pointer'  }} onClick={() => { personUnselected(person) }} role='img' aria-label='Minus sign'>&#10134;</span> : 
                                                <span style={{ cursor: 'pointer'  }} onClick={() => { personSelected(person)}} role='img' aria-label='Plus sign'>&#10133;</span>
                                        }
                                    </td>
                                    <td><button style={{ cursor: 'pointer' }} onClick={() => updatePerson(person.Id)}>Update Person</button></td>
                                    <td><button style={{ cursor: 'pointer' }} onClick={() => deletePerson(person.Id)}>Delete Person</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                <button style={{ cursor: 'pointer'  }} onClick={pageBackward}>
                    &#8592; Page Backward
                </button>
                <button style={{ cursor: 'pointer'  }} onClick={pageForward}>
                     Page Forward &#8594;
                </button>
            </div>
        </div>
        
    )
}

PeopleTable.propTypes = {
    people: PropTypes.array,
    personSelected: PropTypes.func.isRequired,
    personUnselected: PropTypes.func.isRequired,
    sortPeople: PropTypes.func.isRequired,
    sortedBy: PropTypes.string.isRequired,
    sortedDescending: PropTypes.bool.isRequired,
    pageForward: PropTypes.func.isRequired,
    pageBackward: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
    onTableEdited: PropTypes.func.isRequired,
    updatePerson: PropTypes.func.isRequired,
};

export default PeopleTable;