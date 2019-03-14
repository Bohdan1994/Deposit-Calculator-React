import React from 'react';
import DatePicker from './DatePicker';
import ReportItem from './ReportItem'

class Calculator extends React.Component {
  constructor(){
    super();
    this.state = {
      currency: 'UAN',
      among: '1000',
      annualRate: 18,
      term: 1
    };
    this.onSubmit = () => {
        this.setState({
          currency: 'UAN',
          among: document.getElementById('among-of-contribution').value,
          annualRate: document.getElementById('year-rate').value
        });
    }
  }

  render(){
    const props = this.state;
    return(
      <div className="row">
        <div className="col-md-4 calc-container">
            <div className="row">
                <div className="col currency">Валюта</div>
                <div className="col dropdown curreCheckbox"></div>
                <button className="btn btn-primary dropdown-toggle" type="button" id="currencyDropDownMenu" data-togle="dropdown" aria-haspopup="true" aria-expanded="false"> {String.fromCharCode(8372)} UAN</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item UAN" type="button">{String.fromCharCode(8372)}UAN</button>
                    <button className="dropdown-item USD" type="button">{String.fromCharCode(36)}USD</button>
                    <button className="dropdown-item EUR" type="button">{String.fromCharCode(8364)}EUR</button>
                </div>
            </div>

        <div className="row">
      <div className="col contribution">Сумма внеску</div>
      <div className="col input-group">
        <input type="text" className="form-control" id="among-of-contribution"/>
        <div className="input-group-append">
          <span className="input-group-text">$</span>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col currency">Річна ставка</div>
      <div className="col input-group">
        <input type="text" className="form-control" id="year-rate"/>
        <div className="input-group-append">
          <span className="input-group-text">%</span>
        </div>
      </div>
    </div>

    <div className="row">
    <div className="col contribution">Сумма внеску</div>
    <DatePicker className="col"/>
    </div>

    <div className="row">
      <button type="button" className="btn btn-primary btn-lg btn-block" id="calculate" onClick={this.onSubmit}>Розрахувати</button>
    </div>
    </div>
     <div className="col-md-7 table-wrapper-scroll-y content-container">
     <table className="table table-bordered table-striped">
         <thead>
             <tr>
                 <th scope="col">Дата</th>
                 <th scope="col">Сума депозиту</th>
                 <th scope="col">% дохід</th>
                 <th scope="col">Дохід</th>  
             </tr>
         </thead>

         <tbody className="table-content">
             <ReportItem {...props}/>
          </tbody>
     </table>
 </div>
 </div>
)
  }
}


export default Calculator;