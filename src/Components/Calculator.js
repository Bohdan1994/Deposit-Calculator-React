import React from 'react';
import { Dropdown, Row, Col, DropdownButton, Table, InputGroup,Button,  FormControl } from 'react-bootstrap';
import ReportItem from './ReportItem';
import { DatePicker } from '@y0c/react-datepicker';
import moment from 'moment';

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
      currency: 'UAN',
      among: 0,
      annualRate: 0,
      date: moment().format('YYYY-M-D'),
      percents: 0
      },
      displayData: []
    };
    this.data = {
      currency: 'UAN',
      among: 1000,
      annualRate: 10,
      date: moment().format('YYYY-M-D')
    }

    this.onSubmit = () => {
      this.setState(() =>{
       return {data: {...this.data}}
      }, toCalculate);
    }
    
    this.setAmong = (e) => {
      this.data.among = e.target.value;
    }

    this.setAnnualRate = (e) => {
      this.data.annualRate = e.target.value;
    }

    this.setCurrency = (e) =>{
        this.data.currency = e.target.innerText;
    }

    this.setDate = (val) => {
        this.data.date = val;
    }

    function toCalculate() {
      const data = this.state.data;
      const today = moment().toObject();
      const term = moment(data.date.split('-')).toObject();
      const rate = +data.annualRate;
      const among = +data.among;
      let result = among;

      const daysDiff = (first, last) => moment(last).diff(first, 'days');
      const monthDiff = (first, last) => moment(last).diff(first, 'month');

      const getMonthRate = (days) => {
          let res = result;
          let percentsIncome = 0;
          let percents = 0;
          let resultObj = {initialAmount: parseFloat(res.toFixed(2))}
        for(let i = 1; i <= days; i++){
          percents = ((res / 100) * rate) / 365;
          percentsIncome += percents;
          res += percents;
        }
        result = res;
        resultObj.monthIncome = parseFloat(result.toFixed(2));
        resultObj.monthPercents = parseFloat(percentsIncome.toFixed(2));
        return resultObj;
    }
   
   
    const calcResult = toCreateDisplayData(this.state.data.date);
    this.setState({displayData: calcResult});
    
    function toCreateDisplayData(data){
      let resultArr = [];
      let term = moment(data).toObject();

      const calcFirstMonth = () => {
        const end = moment([today.years, today.months]);
        end.date(end.daysInMonth());
        return getMonthRate(end.date() - today.date);
     };
     const calcLastMonth = () => getMonthRate(term.date);
     const numberOfMonth = monthDiff([today.years, today.months], [term.years, term.months]) + 1;
     const getDaysInMonth = (year, month) => moment([year, month]).daysInMonth();
 
     for(let i = 0; i < numberOfMonth; i++) {
       let item = {};
       if(i == 0) {
         item.income = calcFirstMonth();
         item.date = moment([today.years, today.months, getDaysInMonth(today.years, today.months)]).format('D-M-YY');
       }
       else if(i == numberOfMonth - 1){
         item.income = calcLastMonth();
         item.date = moment([term.years, term.months, getDaysInMonth(term.years, term.months)]).format('D-M-YY');
       }
       else{
          const daysNextMonth = moment([today.years, today.months]).add(i,'M');
          daysNextMonth.date(daysNextMonth.daysInMonth());
          item.income = getMonthRate(daysNextMonth.date()); 
          item.date = moment([today.years, today.months, getDaysInMonth(today.years, today.months)]).add(i,'M').format('D-M-YY');
        
       }
       resultArr.push(item); 
     }
     return resultArr;
    }
  
    }
  }

  render() {
    let props = this.state;
    const reportItems =  this.state.displayData;
    return (
      <Row>
        <Col md={4} className="calc-container">
          <Row>
            <Col className="currency">Валюта</Col>
            <DropdownButton id="dropdown-item-button" title={this.state.data.currency}>
              <Dropdown.Item as="button" onClick={this.setCurrency}>UAN</Dropdown.Item>
              <Dropdown.Item as="button" onClick={this.setCurrency}>USD</Dropdown.Item>
              <Dropdown.Item as="button"  onClick={this.setCurrency}>EUR</Dropdown.Item>
            </DropdownButton>
          </Row>

          <Row>
            <Col className="contribution">Сумма внеску</Col>
            <Col className="input-group">
              <InputGroup>
                <FormControl
                  id="among"
                  placeholder=""
                  onChange={this.setAmong}
                />
                <InputGroup.Append>
                  <InputGroup.Text >$</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col className="currency">Річна ставка</Col>
            <Col className="input-group">
               <InputGroup>
                <FormControl
                  placeholder=""
                  aria-label=""
                  onChange={this.setAnnualRate}
                />
                <InputGroup.Append>
                  <InputGroup.Text >%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col className="contribution">Термін</Col>
            <DatePicker onChange={this.setDate}/>
          </Row>

          <Row>
          <Button variant="primary" block="true" onClick={this.onSubmit}>Розрахувати</Button>
          </Row>
        </Col>

        <Col md={7} className="table-wrapper-scroll-y content-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col">Дата</th>
                <th scope="col">Сума депозиту</th>
                <th scope="col">% дохід</th>
                <th scope="col">Дохід</th>
              </tr>
            </thead>

            <tbody className="table-content">
           { reportItems.map((el) =>  <ReportItem {...el} /> )}
            </tbody>
          </Table>
        </Col>
      </Row>

    )
  }
}


export default Calculator;