import React, { Component } from 'react'

class ReportItem extends Component {
    render(){
        const data = this.props;
        return (
        <tr>
        <td>{data.term}</td>
        <td>{data.among}</td>
        <td></td>
        <td>10000</td>
    </tr>
        );
}
}

export default ReportItem;