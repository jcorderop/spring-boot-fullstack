import {useEffect, useState} from 'react'
import {deleteUser, getUsersByType} from "./restClient";
import {
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Divider,
    Empty,
    Layout,
    Menu,
    Popconfirm,
    Radio,
    Spin,
    Table,
    Tag
} from 'antd';
import {
    DesktopOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import './App.css';
import UserDrawerForm from "./UserDrawerForm";
import {errorNotification, successNotification} from "./Notification";

const UserAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }

    return <Avatar>{name.charAt(0)}{split[1].charAt(0)}</Avatar>
}

const removeUser = (userId, fetchCallback, type) => {
    deleteUser(userId)
        .then(() => {
            successNotification( "Student deleted", `Student with Id ${userId} was deleted`);
            fetchCallback(type);
        }).catch(err => {
            console.log(err)
            console.log(`API Error: ${err.response.statusText}`)

            err.response.json()
                .then(jsonError => {
                    errorNotification(`${err.response.statusText}` ,
                        `API Error: ${jsonError.message}`);
                })
        }).finally(() => {
                console.log("Delete has terminated...");
        });
}

const columns = (fetchUsers, type) => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, user) => <UserAvatar name={user.name}/> ,
        width: '5%',
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
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
        width: '10%',
    },
    {
        title: 'Actions',
        key: 'actions',
        width: '15%',
        render: (text, student) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => removeUser(student.id, fetchUsers, type)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
            </Radio.Group>
    }
];


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />


function LoadTable({ type }) {

    const [users, setUsers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchUsers = (type) => {
        console.log("fetching...")
        getUsersByType(type)
            .then(res => res.json())
            .then(data => {
                setUsers([]);
                const userData = data.users;
                console.log(userData);
                setUsers(userData);
            }).catch(err => {
                console.log(err)
                console.log(`API Error: ${err.response.statusText}`)

                err.response.json()
                    .then(jsonError => {
                        errorNotification(`${err.response.statusText}` ,
                            `API Error: ${jsonError.message}`);
                    })
            })
            .finally(() => {
                console.log("Fetching has terminated...");
                setFetching(false);
            });
    }

    useEffect(() => {
        console.log("component is mounted: " + type);
        fetchUsers(type);
    }, [type]);


    if (fetching) {
        return <Spin indicator={antIcon} />
    }
    if (users.length <= 0) {
        return <Empty />
    }
    return (<>
                <UserDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchUsers={fetchUsers}
                    type={type}
                />
                <Table dataSource={users}
                       columns={columns(fetchUsers, type)}
                       bordered title={() =>
                            <>
                                <Button onClick={() => setShowDrawer(!showDrawer)} type="primary" icon={<PlusOutlined />} size="small">
                                    Add New User
                                </Button>
                                <Tag color="gold" style={{marginLeft: "10px"}}>Number of users</Tag>
                                <Badge count={users.length} className="site-badge-count-4"/>
                            </>
                        }
                       pagination={{pageSize: 20}}
                       scroll={{y: 400}}
                       rowKey={(users) => users.id}
                       size="small"/>
            </>);
}

function App() {
    const [collapsed, setCollapsed] = useState(false);

    const [selectedMenuItem, setSelectedMenuItem]= useState('itemStatistics');
    const componentsSwitch = (key) => {
        console.log("componentsSwitch: " + key);
        switch (key) {
            case 'itemStatistics':
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Statistics</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                );
            case 'itemOverview':
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Overview</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                );
            case 'itemPrivate':
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                            <Breadcrumb.Item>Private</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <LoadTable type={"PRIVATE"}/>
                        </div>
                    </div>
                );
            case 'itemCorporate':
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                            <Breadcrumb.Item>Corporate</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <LoadTable type={"CORPORATE"}/>
                        </div>
                    </div>
                );
            case 'itemTrading':
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Team</Breadcrumb.Item>
                            <Breadcrumb.Item>Trading</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {}
                        </div>
                    </div>
                );
            case 'itemSales':
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Team</Breadcrumb.Item>
                            <Breadcrumb.Item>Sales</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {}
                        </div>
                    </div>
                );
            default:
                break;
        }
    }

    return (<Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={(e) => setSelectedMenuItem(e.key)}>
                <Menu.Item key="itemStatistics" icon={<PieChartOutlined />}>
                    Statistics
                </Menu.Item>
                <Menu.Item key="itemOverview" icon={<DesktopOutlined />}>
                    Overview
                </Menu.Item>
                <SubMenu key="subMenuUsers" icon={<UserOutlined />} title="Users">
                    <Menu.Item key="itemPrivate">Private</Menu.Item>
                    <Menu.Item key="itemCorporate">Corporate</Menu.Item>
                </SubMenu>
                <SubMenu key="subMenuTeam" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="itemTrading">Trading</Menu.Item>
                    <Menu.Item key="itemSales">Sales</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                {componentsSwitch(selectedMenuItem)}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <div>Crypto Broker ©2022 Created by jcorderop</div>
                <Divider>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://github.com/jcorderop/spring-boot-fullstack">
                        Github Project
                    </a>
                </Divider>
            </Footer>
        </Layout>
    </Layout>);
}

export default App;
