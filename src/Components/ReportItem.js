import React, { Component } from 'react'

class ReportItem extends Component {
    render(){
        const item = this.props;
        return (
        <tr>
        <td>{item.date}</td>
        <td>{item.income.initialAmount}</td>
        <td>{item.income.monthPercents}</td>
        <td>{item.income.monthIncome}</td>
    </tr>
        );
}
}

export default ReportItem;