import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel'
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './Form.css';
import { withStyles } from '@material-ui/core/styles';

const inLineStyles = theme => ({
    textFieldInput: {
        fontSize: '16px'
    }
});

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
            this.props.reloadData();
            this.clearForm();
        })
        .catch( err => {
            console.log(err)
        });
    }

    /**
     * Delete the user from DB
     * @param event
     */
    deleteUser(event){
        const userSelected =
            this.props.users.selectionContext.state !== ''
            ? this.props.users.selectionContext.state.selected
            : '';

        if(!userSelected){
            console.log('not seleted');
            return;
        }

        const ids = {
            userId: userSelected
        };

        if (ids.userId.length > 0) {
            axios.post(
                'api/deleteUser',
                JSON.stringify(ids),
                {headers: { 'Content-Type': 'application/json' }}
            )
            .then(res => {
                this.props.reloadData();
                this.clearForm();
            })
            .catch( err => {
                    console.log(err);
            });
        }
    }


    clearForm = () => {
        document.getElementById("myForm").reset();
        this.setState({
            person: {
            firstName: '',
                 lastName: '',
                 country: '',
                 dateBirth: moment()
             }
        });
    }

    /**
     * 
     */
    render(){
        const { classes } = this.props;

        const errorInputMsg = (id) => (
            <span className={styles.errorMsg}>{this.state.error[id]}</span>
        )

        const inputStyles = {
            fontSize: '40px'
        }

        return(
           <form id="myForm" className={styles.myForm} noValidate autoComplete="off">
               <div className={styles.divStyle}>
                    <div className={styles.components}>
                        <TextField id="firstName" 
                                    placeholder="First name"
                                    multiline={false}
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange}
                                    error={this.state.person.firstName.length === 0 ? true : false }
                                    helperText={errorInputMsg("firstName")}/>
                    </div>
                    <div className={styles.components}>
                        <TextField id="lastName"
                                    placeholder="Last Name"
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange}
                                    error={this.state.person.lastName.length === 0 ? true : false }
                                    helperText={errorInputMsg("lastName")}/>
                    </div>
                    <div className={styles.components}>
                        <TextField id="country"
                                    placeholder="Country"
                                    className={styles.textField}
                                    InputProps={{
                                        classes: {
                                          input: classes.textFieldInput
                                        }
                                    }}
                                    onBlur={this.handleChange} error={this.state.person.country.length === 0 ? true : false }
                                    helperText={errorInputMsg("country")}/>
                    </div>
                    <div className={styles.components}>
                        <DatePicker id="dateBirth"
                            placeholderText="Date of Birth"
                            required={true}
                            className={styles.datePicker}
                            selected={this.state.person.dateBirth}
                            onChange={(event) => this.handleDateChange(event)}
                            error={this.state.person.dateBirth.length === 0 ? true : false}
                            helperText={this.state.error.dateBirth}
                            dateFormat="DD/MM/YYYY"/>
                        <InputLabel id="dateBirth">{errorInputMsg("dateBirth")}</InputLabel>
                     </div>
                     <div className={styles.components}>
                        <div className={styles.buttonDiv}>
                            <Button
                                className={styles.button}
                                variant="contained"
                                size="medium"
                                onClick={(event) => this.saveUser(event)}>
                                <SaveIcon className={styles.button} />
                                Save
                            </Button>
                            <Button
                                className={styles.button}
                                variant="contained"
                                size="medium"
                                onClick={(event) => this.deleteUser(event)}>
                                <DeleteIcon className={styles.button} />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
           </form>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(inLineStyles)(Form);
