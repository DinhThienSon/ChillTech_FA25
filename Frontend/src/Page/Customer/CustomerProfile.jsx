import { useEffect, useState } from "react";
import {
    Card,
    Descriptions,
    Spin,
    Row,
    Col,
    Button,
    Space,
    Modal,
    Form,
    Input,
    Select,
    message,
} from "antd";
import {
    LockOutlined,
    ProfileOutlined,
    EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9999";
const { Option } = Select;

const CustomerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    /* ===== FETCH PROFILE ===== */
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/api/auth/me`,
                    { withCredentials: true }
                );
                setProfile(res.data);
            } catch (error) {
                console.error("FETCH PROFILE ERROR:", error);
                message.error("Không thể tải thông tin người dùng");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    /* ===== OPEN EDIT MODAL ===== */
    const openEditModal = () => {
        form.setFieldsValue({
            customerName: profile?.customer?.customerName,
            phone: profile?.account?.phone,
            address: profile?.customer?.address,
            gender: profile?.customer?.gender,
        });
        setEditOpen(true);
    };

    /* ===== UPDATE PROFILE (CALL BACKEND) ===== */
    const handleUpdateProfile = async (values) => {
        try {
            const res = await axios.put(
                `${API_URL}/api/customers/me`,
                values,
                { withCredentials: true }
            );

            // Update UI theo response backend
            setProfile((prev) => ({
                ...prev,
                account: {
                    ...prev.account,
                    phone: res.data.data.account.phone,
                },
                customer: {
                    ...prev.customer,
                    ...res.data.data.customer,
                },
            }));

            message.success("Cập nhật thông tin thành công");
            setEditOpen(false);
        } catch (error) {
            console.error("UPDATE PROFILE ERROR:", error);
            message.error(
                error.response?.data?.message || "Cập nhật thất bại"
            );
        }
    };

    /* ===== LOADING ===== */
    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: 80 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!profile) return null;

    const { account, customer } = profile;

    return (
        <div style={{ marginTop: 40 }}>
            <Row justify="center">
                {/* ===== MAIN CONTENT (~70%) ===== */}
                <Col span={16}>
                    {/* ===== PROFILE INFO ===== */}
                    <Card title="Personal Information" style={{ marginBottom: 24 }}>
                        <Descriptions
                            bordered
                            column={2}
                            labelStyle={{ width: 160, fontWeight: 600 }}
                        >
                            <Descriptions.Item label="Full name">
                                {customer?.customerName || "—"}
                            </Descriptions.Item>

                            <Descriptions.Item label="Email">
                                {account?.email || "—"}
                            </Descriptions.Item>

                            <Descriptions.Item label="Phone">
                                {account?.phone || "—"}
                            </Descriptions.Item>

                            <Descriptions.Item label="Address">
                                {customer?.address || "—"}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* ===== ACTIONS ===== */}
                    <Card title="Account Actions">
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ width: "100%" }}
                        >
                            <Button
                                icon={<EditOutlined />}
                                size="large"
                                block
                                onClick={openEditModal}
                            >
                                Edit Profile
                            </Button>

                            <Button
                                icon={<LockOutlined />}
                                size="large"
                                block
                                onClick={() => console.log("Change password")}
                            >
                                Change Password
                            </Button>

                            <Button
                                icon={<ProfileOutlined />}
                                size="large"
                                block
                                onClick={() => navigate("/customer-orders")}
                            >
                                Order List
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>

            {/* ===== EDIT PROFILE MODAL ===== */}
            <Modal
                title="Edit Profile"
                open={editOpen}
                onCancel={() => setEditOpen(false)}
                onOk={() => form.submit()}
                okText="Save"
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleUpdateProfile}
                >
                    <Form.Item
                        label="Full name"
                        name="customerName"
                        rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Phone" name="phone">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Address" name="address">
                        <Input.TextArea rows={2} />
                    </Form.Item>

                    <Form.Item label="Gender" name="gender">
                        <Select allowClear>
                            <Option value="MALE">Male</Option>
                            <Option value="FEMALE">Female</Option>
                            <Option value="OTHER">Other</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomerProfile;
