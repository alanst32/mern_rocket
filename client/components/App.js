import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './header/Header';
import moment from 'moment';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
    App: {
        justifyContent: 'center',
        textAlign: 'center',
    },
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
    },
    buttonTable: {
        margin: theme.spacing.unit,
        fontSize: 10
    },
    reactBootstrapTable: {
        justifyContent: 'center',
        textAlign: 'center',
        width: '60%'
    },   
    tableContainer: {
        color: 'red'
    } 
})

const columns = [
    {
        dataField: 'firstName',
        text: 'First Name'
    },
    {
        dataField: 'lastName',
        text: 'Last Name',
        filter: textFilter()
    },
    {
        dataField: 'country',
        text: 'Country'
    },
    {
        dataField: 'dateBirth',
        text: 'Date of Birth'
    },
    {
        dataField: '',
        text: '',
        formatter: (cellContent, row) => (
            <div>
                <Button 
                    className={classes.buttonTable}
                    variant="contained"
                    size="small"
                    onClick={(event) => this.updateUser(event)}>
                    Update
                </Button>
            </div>
        )
    }
];



const keysSelected = new Set();

class App extends React.Component {
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
            },
            users: []
           
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getData = this.getData.bind(this);
        this.updateUser = this.updateUser.bind(this);
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
     * Load the users
     * @param {*} ev 
     */
    getData(ev) {
        axios.get('/api/users')
            .then(response => {
                Object.keys(response.data).map( (index) => {
                    let user = response.data[index];
                    user.dateBirth = moment(user.dateBirth).format('DD/MM/YYYY');
                    ev.setState((state) => state.users[index] = user);
                });
            }
        )
    .catch(ex => console.log("error loading users data" + ex));
    }

    componentDidMount() {
        this.getData(this);
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
            this.getData(this);
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
        const ids = {
            userId: this.refs['table'].selectionContext.state.selected
        };
        
        if (ids.userId.length > 0) {
            axios.post(
                'api/deleteUser',
                JSON.stringify(ids),
                {headers: { 'Content-Type': 'application/json' }}
            )
            .then(res => {
                this.getData(this);
            })
            .catch( err => {
                    console.log(err)
            });
        }
    }

    updateUser(event){
        console.log(event);
    }

    render() {
        const { classes } = this.props;

        const errorInputMsg = (id) => (
            <span className={classes.errorMsg}>{this.state.error[id]}</span>
        );

        const selectRow = {
            mode: "checkbox",
            clickToSelect: true,
            clickToEdit: true,
            style: { backgroundColor: "#77A2E0" }
        };

        return (
            <div className="App">
                <Header totalUsers={this.state.users.length}/>
                <ul>
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
                </ul>
                <ul>
                    <BootstrapTable 
                        striped
                        hover
                        bordered
                        bootstrap4={true} 
                        keyField="_id" 
                        ref="table"
                        data={this.state.users} 
                        selectRow={selectRow}
                        columns={columns}
                        pagination={paginationFactory()}
                        filter={filterFactory()} 
                        cellEdit={ cellEditFactory({mode: "dbclick"}) }/>
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

