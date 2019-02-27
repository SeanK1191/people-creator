import React from 'react'

const PeopleTable = function({ people, personSelected, personUnselected, sortPeople, sortedBy, sortedDescending, pageForward, pageBackward, deleteUser }) {

    const arrow = sortedDescending === true ? <span>&#8595;</span> : <span>&#8593;</span>;

    const nameHeader = sortedBy === 'name' ? <span>Name {arrow}</span> : <span>Name</span>;
    const emailHeader = sortedBy === 'email' ? <span>Email {arrow}</span> : <span>Email</span>;

    return (
        <div style={{ width: 1000 }}>
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
                                    <td>{person.Name}</td>
                                    <td>{person.Age}</td>
                                    <td>{person.Balance}</td>
                                    <td>{person.Email}</td>
                                    <td>{person.Address}</td>
                                    <td>
                                        {
                                            person.selected ? <span style={{ cursor: 'pointer'  }} onClick={() => { personUnselected(person) }} role='img' aria-label='Minus sign'>&#10134;</span> : 
                                                <span style={{ cursor: 'pointer'  }} onClick={() => { personSelected(person)}} role='img' aria-label='Plus sign'>&#10133;</span>
                                        }
                                    </td>
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

export default PeopleTable;