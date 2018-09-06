import React from 'react';
import {FieldGroup} from 'react-bootstrap'
var DatePicker = require("react-bootstrap-date-picker");



class Form extends React.Component {
    constructor(props, context){

        super(props, context);

        this.state = {
            firstName,
            lastName,
            birthDate,
            country,
        }
    }

    render(){
        const { classes } = this.props;

        return(
            <div className="Form">
                <form>
                    <FieldGroup id="firstNameInput" typen="text" label="Fist name" placeholder="Enter text"/>
                    <FieldGroup id="lastNameInput" type="text" label="Last name" placeholder="Enter text"/>
                    <FieldGroup id="countryInput" type="text" label="Country" placeholder="Enter text"/>
                </form>
            </div>
        );
    }
}


export default Form;
