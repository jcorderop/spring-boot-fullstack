import {Button, Col, Drawer, Form, Input, Row, Select, Spin} from 'antd';
import {addNewUser} from "./restClient";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";
import {errorNotification, successNotification} from "./Notification";

const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function UserDrawerForm({showDrawer, setShowDrawer, fetchUsers, type}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const onFinish = user => {
        setSubmitting(true);
        console.log(JSON.stringify(user, null, 2));
        addNewUser(user).then(() => {
                console.log("user added...");
                onCLose();
                form.resetFields();
                fetchUsers(type);
                successNotification("New User", `New user ${user.name} created, type: ${type}`);
            }).catch(err => {
                console.log("could not add the user: "+ err);
                errorNotification("Error", "User could not be created...")
            }).finally(() => {
                setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new User"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              form={form}
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              name="createUser">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter user name'}]}
                    >
                        <Input placeholder="Please enter user name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter user email'}]}
                    >
                        <Input placeholder="Please enter user email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="userType"
                        label="Type"
                        rules={[{required: true, message: 'Please user a gender'}]}
                    >
                        <Select placeholder="Please select a user type">
                            <Option value="PRIVATE">PRIVATE</Option>
                            <Option value="CORPORATE">CORPORATE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default UserDrawerForm;