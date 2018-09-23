import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import { timingSafeEqual } from 'crypto';

const styles = theme => ({
    divStyle: {
        display:'block',
        'text-align': 'left',
        paddingTop: '25px',
    },
    textField: {
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    datePicker: {
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    errorMsg: {
        color: 'red',
        fontSize: '10px',
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: 14
    }
})


class Form extends React.Component {

    constructor(){
        super();

        this.state={
            error: {
                firstName: '',
                lastName: '',
                country: '',
                dateBirth: ''
            },
            person: {
                firstName: '',
                lastName: '',
                country: '',
                dateBirth: moment()
            }
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(event) {
        event.persist();

        var errorMsg = "";
        
        if(event.target.value === ""){
            errorMsg = "Field is required!";
        }
        this.setState((state) => state.error[event.target.id] = errorMsg);

        this.setState((state) => state.person[event.target.id] = event.target.value);
    }

    handleDateChange(date) {
        this.setState({ dateBirth: date });
        this.setState((state) => state.error.dateBirth = "");
    }

    render(){
        const { classes } = this.props;

        const errorInputMsg = (id) => (
            <span className={classes.errorMsg}>{this.state.error[id]}</span>
        )

        return(
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.divStyle}>
                    <TextField id="firstName" placeholder="First name" className={classes.textField} 
                        onBlur={this.handleChange} error={this.state.person.firstName.length === 0 ? true : false }
                        helperText={errorInputMsg("firstName")}/>
                
                </div>
                <div className={classes.divStyle}>
                    <TextField id="lastName" placeholder="Last Name" className={classes.textField} 
                        onBlur={this.handleChange} error={this.state.person.lastName.length === 0 ? true : false }
                        helperText={errorInputMsg("lastName")}/>
                </div>
                <div className={classes.divStyle}>
                    <TextField id="country" placeholder="Country" className={classes.textField} 
                        onBlur={this.handleChange} error={this.state.person.country.length === 0 ? true : false }
                        helperText={errorInputMsg("country")}/>
                </div>
                <div className={classes.divStyle}>
                    <p></p>
                    <DatePicker id="dateBirth" placeholderText="Date of Birth" required={true} 
                        className={classes.datePicker} selected={this.state.dateBirth} 
                        onChange={this.handleDateChange} onBlur={this.handleChange}
                        error={this.state.person.dateBirth.length === 0 ? true : false} helperText={this.state.error.dateBirth}/>
                    <InputLabel id="dateBirth">{errorInputMsg("dateBirth")}</InputLabel>
                </div>
                <div className={classes.divStyle}>
                    <p></p>
                    <Button className={classes.button} variant="contained" size="small" className={classes.button}>
                        <SaveIcon className={classes.button} />
                        Save
                    </Button>
                </div>
            </form>
        );
    }
}


Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
