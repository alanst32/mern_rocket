import React from 'react';
import {FieldGroup} from 'react-bootstrap'
import text from 'react-bootstrap-table2-filter/lib/src/components/text';




class Form extends React.Component {
    constructor(props, context){

        super(props, context);

        this.state = {
            firstName: text,
            lastName: text,
            birthDate: text,
            country: text,
        }
    }

    render(){
        const { classes } = this.props;

        return(
            <div className="Form">
                <form>
                    <FieldGroup id="firstName" type="text" label="First name" placeholder="Enter text"/>
                    <FieldGroup id="lastName" type="text" label="Last name" placeholder="Enter text"/>
                    <FieldGroup id="country" type="text" label="Country" placeholder="Enter text"/>
                </form>
            </div>
        );
    }
}


export default Form;
