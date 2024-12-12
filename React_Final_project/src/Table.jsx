import React from 'react'

const Table = ({ data }) => {

    const headers = Object.keys(data[0]);

    return (
        <div style={{ marginLeft: "10%", marginTop: "2%", marginBottom: "2%" }}>
            <table border="1" style={{ borderCollapse: "collapse", width: "80%", backgroundColor: 'white' }}>
                <thead>
                    <tr>
                        {
                            headers.map((header, index) => {
                                return <th key={index}>{header}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* Show the data in table */}
                    {
                        data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((item, indexOfItem) => (
                                    Array.isArray(item) == true ?
                                        <td key={indexOfItem}><Table data={item} /></td> :
                                        <td key={indexOfItem}>{item}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table