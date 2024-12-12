import React from 'react'

const Table = ({ data }) => {

    const headers = Object.keys(data[0]);

    return (
        <div style={{marginLeft: "10%"}}>
             <table border="1" style={{ borderCollapse: "collapse", width: "80%" }}>
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
                    {
                        data.map((row, index) => {
                            return <tr key={index}>
                                {Object.values(row).map((item, indexOfItem) => {
                                    return <td key={indexOfItem}>{item}</td>
                                })}
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table