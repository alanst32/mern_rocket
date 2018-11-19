import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './header/Header';
import Form from './form/Form';
import UpdateButton from './datatable/UpdateButton';
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
    reactBootstrapTable: {
        justifyContent: 'center',
        textAlign: 'center',
        width: '60%'
    },
    headerDataTable: {
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#c8e6c9'
    },
    rowDataTable: {
         fontSize: '16px'
    },
    tableContainer: {
        color: 'red'
    } 
})

function dateFormatter(cell, row) {
    if (row.dateBirth) {
        return (
            <span>{moment(row.dateBirth).format('DD/MM/YYYY')}</span>
        );
    }
}




class App extends React.Component {
    setRef = myComponent => this.myComponent = myComponent;

    constructor(){
        super();

        this.state={
            users: []
        }

        this.getData = this.getData.bind(this);
    }

    
    /**
     * Load the users
     * @param {*} ev 
     */
    getData() {
        console.log('getData called');
        axios.get('/api/users')
            .then(response => {
                this.setState((state) => state.users = response.data);
            }
        )
    .catch(ex => console.log("error loading users data" + ex));
    }

    /**
     * 
     */
    componentDidMount() {
        this.getData();
    }

    render() {
        const { classes } = this.props;

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
                text: 'Country',
            },
            {
                dataField: 'dateBirth',
                text: 'Date of Birth',
                formatter: dateFormatter,
            },
            {
                dataField: 'update',
                isDummyField: true,
                text: 'Update',
                formatter: (cellContent, row) => {
                    return (
                        <UpdateButton  value={row._id} row={row} reloadData={this.getData}/>
                    );
                }
            }
        ];

        const errorInputMsg = (id) => (
            <span className={classes.errorMsg}>{this.state.error[id]}</span>
        );

        const selectRow = {
            mode: "checkbox",
            clickToSelect: true,
            style: { backgroundColor: "#77A2E0" },
            clickToEdit: true
        };

        return (
            <div className="App">
                <Header totalUsers={this.state.users.length}/>
                <Form users={this.refs['table']} reloadData={this.getData}></Form>
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
                        headerClasses={classes.headerDataTable}
                        rowClasses={classes.rowDataTable}
                        cellEdit={ cellEditFactory({ mode: 'dbclick', blurToSave: true }) } />
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

