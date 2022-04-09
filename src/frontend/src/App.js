import {useEffect, useState} from 'react'
import {getUsersByType} from "./restClient";
import {Breadcrumb, Empty, Layout, Menu, Spin, Table} from 'antd';
import {DesktopOutlined, LoadingOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';

import './App.css';

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


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />


function LoadTable({ type }) {

    const [users, setUsers] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchUsers = (type) => {
        console.log("fetching...")
        getUsersByType(type)
            .then(res => res.json())
            .then(data => {
                setUsers([]);
                console.log(data);
                setUsers(data);
                setFetching(false);
            }).finally(() => {
            console.log("Fetching has terminated...");
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
    return (<Table dataSource={users}
                       columns={columns}
                       bordered title={() => "Users"}
                       pagination={{pageSize: 20}}
                        //scroll={{y: 240}}
                       rowKey={(users) => users.id}
                       size="small"/>);
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
            <Footer style={{ textAlign: 'center' }}>Crypto Broker ©2022 Created by jcorderop</Footer>
        </Layout>
    </Layout>);
}

export default App;
