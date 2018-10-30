import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Header from './header/Header';
import Form from './form/Form';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const styles = theme => ({
    dataTable: {
        margin: 'auto'
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
    }
];

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            users: []
        };

        this.getData = this.getData.bind(this);
    }

    getData(ev) {
        axios.get("/api/users")
            .then(response => {
                ev.setState({users: response.data});
            }
        )
    .catch(ex => console.log("error loading users data" + ex));
    }

    componentDidMount() {
        this.getData(this);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="App">
                <Header totalUsers={this.state.users.length}/>
                <ul>
                    <Form></Form>
                </ul>
                <ul>
                    <BootstrapTable 
                        striped
                        hover
                        bordered
                        bootstrap4={true} 
                        keyField='_id' 
                        data={this.state.users} 
                        tableStyle={classes.dataTable}
                        columns={columns}
                        className="dataTable"
                        tableStyle="dataTable" 
                        pagination={paginationFactory()}
                        filter={filterFactory()}/>
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

