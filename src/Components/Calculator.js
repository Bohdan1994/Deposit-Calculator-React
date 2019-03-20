import React from 'react';
import { Dropdown, Row, Col, DropdownButton, Table, InputGroup,Button,  FormControl } from 'react-bootstrap';
import ReportItem from './ReportItem';
import { DatePicker } from '@y0c/react-datepicker';
import moment from 'moment';

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: '',
      among: 0,
      annualRate: 0,
      date: ''
    };
    this.data = {
      currency: 'UAN',
      among: 1000,
      annualRate: 10,
      date: moment().format('YYYY MM DD')
    }

    this.onSubmit = () => {
      this.setState({...this.data});
      calculate();
      
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
    function calculate(data) {
       console.log(data);
    }
  }

  render() {
   // console.log(this.state);
    let props = this.state;
    return (
      <Row>
        <Col md={4} className="calc-container">
          <Row>
            <Col className="currency">Валюта</Col>
            <DropdownButton id="dropdown-item-button" title={this.state.currency}>
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
              <ReportItem {...props} />
              <ReportItem {...props} />
              <ReportItem {...props} />
            </tbody>
          </Table>
        </Col>
      </Row>

    )
  }
}


export default Calculator;