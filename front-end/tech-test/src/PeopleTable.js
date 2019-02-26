import React from 'react'

const PeopleTable = function({ people, personSelected, personUnselected }) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Balance</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
                {
                    people === undefined ? null :
                    people.map((person) => {
                        return (
                            <tr key={person.Id}>
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
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default PeopleTable;