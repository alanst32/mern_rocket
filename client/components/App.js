import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Header from './header/Header';
import Form from './form/Form';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

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
    }
];

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            users: [],
            selectRowProp: {
                mode: 'checkbox'
            }
        };

        this.getData = this.getData.bind(this);
    }

    getData(ev) {
        axios.get('/api/users')
            .then(response => {
                Object.keys(response.data).map( (index) => {
                    let user = response.data[index];
                    user.dateBirth = moment(user.dateBirth).format('DD/MM/YYYY');
                    console.log(user);
                    ev.setState((state) => state.users[index] = user);
                });
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
                        selectRow={ this.state.selectRowProp }
                        columns={columns}
                        trClassName={classes.reactBootstrapTable}
                        pagination={paginationFactory()}
                        filter={filterFactory()}
                        tableStyle={ { border: '#0000FF 2.5px solid' } } />
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

