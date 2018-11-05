import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import { timingSafeEqual } from 'crypto';

const styles = theme => ({
    container: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    divStyle: {
        display:'block',
        paddingTop: 25,
    },
    textField: {
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    textFieldInput: {
        fontSize: 16
    },
    text: {
        input: {
            fontSize: 16
        }
    },
    datePicker: {
        width: '400px',
        fontSize: 16,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    errorMsg: {
        color: 'red',
        fontSize: '16px',
        width: '400px',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    buttonDiv: {
        display: 'in-line'
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
                dateBirth: '',
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
        this.saveUser = this.saveUser.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    /**
     * Handle the change of the inputs
     * @param {*} event 
     */
    handleChange(event) {
        event.persist();
        let errorMsg = '';
        
        if(event.target.value === '') {
            errorMsg = 'Field is required!';
            this.setState((state) => this.state.error.isError = true);
        }
        this.setState((state) => state.error[event.target.id] = errorMsg);
        this.setState((state) => state.person[event.target.id] = event.target.value);
    }

    /**
     * Handle the date input
     * @param {*} date 
     */
    handleDateChange(date) {
        this.setState((state) => state.person.dateBirth = date);
    }
      
    /**
     * Verify is the date component has been changed
     * @param {*} nextProps 
     * @param {*} nextState 
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.person.dateBirth !== nextState.dateBirth) {
            return true;
        }
        return false;
    }

    /**
     * Validate the form before saving the user
     */
    isFormValid() {
        let result = true;

        Object.keys(this.state.person).map( (key) => {
            let field = this.state.person[key];
            if(field === null || field === '') {
                this.setState((state) => state.error[key] = 'Field is required');
                result = false;
            }
        });
        return result;
    } 
    
    /**
     * Save user profile
     * @param {*} event 
     */
    saveUser(event) {
        if(!this.isFormValid()) {
            return;
        }

        axios.put(
            '/api/user', 
            JSON.stringify(this.state.person), 
            {headers: { 'Content-Type': 'application/json' }}
        )
        .then( res => {
            window.location.reload();
        })
        .catch( err => {
            console.log(err)
        });
    }

    deleteUser(event){
        console.log(event);
        console.log(this.state.selectRowProp);
    }

    /**
     * 
     */
    render(){
        const { classes } = this.props;

        const errorInputMsg = (id) => (
            <span className={classes.errorMsg}>{this.state.error[id]}</span>
        )

        return(
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.divStyle}>
                    <TextField id="firstName" 
                        placeholder="First name" 
                        multiline={false}
                        className={classes.textField} 
                        InputProps={{classes: {
                              input: classes.textFieldInput,
                            },
                        }}
                        onBlur={this.handleChange} 
                        error={this.state.person.firstName.length === 0 ? true : false }
                        helperText={errorInputMsg("firstName")}/>
                </div>
                <div className={classes.divStyle}>
                    <TextField id="lastName" 
                        placeholder="Last Name"
                        className={classes.textField} 
                        InputProps={{classes: {
                            input: classes.textFieldInput,
                          },
                        }} 
                        onBlur={this.handleChange} 
                        error={this.state.person.lastName.length === 0 ? true : false }
                        helperText={errorInputMsg("lastName")}/>
                </div>
                <div className={classes.divStyle}>
                    <TextField id="country" 
                        placeholder="Country" 
                        className={classes.textField} 
                        InputProps={{classes: {
                            input: classes.textFieldInput,
                          },
                        }}
                        onBlur={this.handleChange} error={this.state.person.country.length === 0 ? true : false }
                        helperText={errorInputMsg("country")}/>
                </div>
                <div className={classes.divStyle}>
                    <p></p>
                    <DatePicker id="dateBirth" 
                        placeholderText="Date of Birth" 
                        required={true} 
                        className={classes.datePicker} 
                        selected={this.state.person.dateBirth}
                        onChange={(event) => this.handleDateChange(event)}
                        error={this.state.person.dateBirth.length === 0 ? true : false} 
                        helperText={this.state.error.dateBirth}
                        dateFormat="DD/MM/YYYY"/>
                    <InputLabel id="dateBirth">{errorInputMsg("dateBirth")}</InputLabel>
                </div>
                <div className={classes.divStyle}>
                    <p></p>
                    <div className={classes.buttonDiv}>
                        <Button 
                            className={classes.button} 
                            variant="contained" 
                            size="small" 
                            onClick={(event) => this.saveUser(event)}>
                            <SaveIcon className={classes.button} />
                            Save
                        </Button>
                        <Button 
                            className={classes.button}
                            variant="contained"
                            size="small"
                            onClick={(event) => this.deleteUser(event)}>
                            <DeleteIcon className={classes.button} />
                            Delete    
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
