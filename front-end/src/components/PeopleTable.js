import React from 'react'
import PropTypes from 'prop-types';

const PeopleTable = function({ people, personSelected, personUnselected, sortPeople, sortedBy, sortedDescending, pageForward, pageBackward, deleteUser, onTableEdited, updateUser }) {

    const arrow = sortedDescending === true ? <span>&#8595;</span> : <span>&#8593;</span>;

    const nameHeader = sortedBy === 'name' ? <span>Name {arrow}</span> : <span>Name</span>;
    const emailHeader = sortedBy === 'email' ? <span>Email {arrow}</span> : <span>Email</span>;

    return (
        <div style={{ width: 1400 }}>
            <table>
                <tbody>
                    <tr>
                        <th style={{ cursor: 'pointer'  }} onClick={() => { sortPeople('name') }}>{nameHeader}</th>
                        <th>Age</th>
                        <th>Balance</th>
                        <th style={{ cursor: 'pointer'  }} onClick={() => { sortPeople('email') }}>{emailHeader}</th>
                        <th>Address</th>
                    </tr>
                    {
                        people === undefined ? null :
                        people.map((person) => {
                            return (
                                <tr key={person.Email}>
                                    <td><input onChange={event => onTableEdited(person, { Name: event.target.value })} type='text' defaultValue={person.Name}></input></td>
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
                                    <td style={{ cursor: 'pointer'  }} onClick={() => updateUser(person.Id)}>Update User</td>
                                    <td style={{ cursor: 'pointer'  }} onClick={() => deleteUser(person.Id)}>Delete User</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ cursor: 'pointer'  }} onClick={pageBackward}>
                    &#8592; Page Backward
                </div>
                <div style={{ cursor: 'pointer'  }} onClick={pageForward}>
                     Page Forward &#8594;
                </div>
                
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
    deleteUser: PropTypes.func.isRequired,
    onTableEdited: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};

export default PeopleTable;