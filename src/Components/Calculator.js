import React from 'react';
import { Dropdown, Row, Col, DropdownButton, Table, InputGroup,Button,  FormControl } from 'react-bootstrap';
import DateChooser from './DatePicker';
import ReportItem from './ReportItem';

class Calculator extends React.Component {
  constructor() {
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
        annualRate: document.getElementById('year-rate').value,
        term: document.getElementsByClassName('picker-input__text')[0].value
      });
    }
  }

  render() {
    const props = this.state;
    return (
      <Row>
        <Col md={4} className="calc-container">
          <Row>
            <Col className="col currency">Валюта</Col>
            <DropdownButton id="dropdown-item-button" title="UAN">
              <Dropdown.Item as="button">UAN</Dropdown.Item>
              <Dropdown.Item as="button">USD</Dropdown.Item>
              <Dropdown.Item as="button">EUR</Dropdown.Item>
            </DropdownButton>
          </Row>

          <Row>
            <Col className="contribution">Сумма внеску</Col>
            <Col className="input-group">
              <InputGroup>
                <FormControl
                  placeholder=""
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Append>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col className="currency">Річна ставка</Col>
            <Col className="col input-group">
               <InputGroup>
                <FormControl
                  placeholder=""
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Append>
                  <InputGroup.Text >%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col className="contribution">Сумма внеску</Col>
            <DateChooser className="col" />
          </Row>

          <Row>
          <Button variant="primary" block="true">Розрахувати</Button>
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