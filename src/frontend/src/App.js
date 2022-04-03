import {Button, Table} from "antd";

import './App.css';

import {getAllUsers} from "./RestClient";
import {useEffect, useState} from "react";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'UserType',
        dataIndex: 'userType',
        key: 'userType',
    },
];

function App() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        getAllUsers()
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }

    useEffect( () => {
        console.log("component is mounted");
        fetchUsers();
    }, []);

  return (
    <div className="App">
        <Button type="primary">login</Button>
        <Table dataSource={users} columns={columns} />
    </div>
  );
}

export default App;
