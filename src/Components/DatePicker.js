import React, { Component } from 'react';
import {DatePicker as DatePicke} from '@y0c/react-datepicker';

class DatePicker extends DatePicke {
    constructor(){
        super();
        
    }
    render () {
        return (<DatePicker/>)
    }
}

export default DatePicker;