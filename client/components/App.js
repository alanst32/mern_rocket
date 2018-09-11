import React, { Component } from 'react';

import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Header from './header/Header';
import Form from './form/Form';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



const columns = [
    {
        dataField: 'firstName',
        text: 'First Name'
    },
    {
        dataField: 'lastName',
        text: 'Last Name',
        filter: textFilter()
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

    getData(ev){
        axios.get("/api/users")
            .then(response => {

            ev.setState({users: response.data});
    })
    .catch(ex => console.log("error loading users data" + ex));
    }

    componentDidMount(){
        this.getData(this);
    }

    render() {
        return (
            <div className="App">
                <Header totalUsers={this.state.users.length}/>
                <ul>
                    <Form></Form>
                </ul>
                <ul>
                    <BootstrapTable bootstrap4={true} keyField='_id' data={this.state.users} columns={columns} filter={filterFactory()}/>
                </ul>
            </div>
    );
    }
}

export default App;

