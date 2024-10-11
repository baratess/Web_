import { useState, useEffect } from "react";
import {
  Button,
  Layout,
  Menu,
  Typography,
  Input,
  Form,
  message,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const CurrentOrderPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      message.error("You must log in first");
      navigate("/auth/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const userCheck = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        if (response.ok) {
          const data = await response.json();

          const userInfo = data.find((item) => item._id === user);
          if (userInfo) {
            const address = userInfo.address;
            form.setFieldsValue({
              username: userInfo.username,
              email: userInfo.email,
              address: address,
              phonenumber: userInfo.phonenumber,
            });
          }
        }
      } catch (error) {
        message.error("Bir hata oluştu.", error);
      }
    };
    userCheck();
  }, [apiUrl, user, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/users/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user, password: password }),
      });
      if (response.ok) {
        setIsModalOpen(false);
        navigate("/profile/info_update");
      } else {
        message.error("Şifre yanlış. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      message.error("Bir hata oluştu.", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    switch (key) {
      case "1":
        navigate("/profile/user_info");
        break;
      case "2":
        navigate("/profile/current_order");
        break;
      case "3":
        navigate("/profile/history_order");
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{
            marginTop: "20px",
            padding: "5px",
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onClick={(e) => handleMenuClick(e.key)}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Kişisel Bilgiler",
            },
            {
              key: "2",
              label: "Güncel Siparişler",
            },
            {
              key: "3",
              label: "Sipariş Geçmişi",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
            maxWidth: "63px",
            borderRadius: "0.2rem",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#f5f5f5",
            borderRadius: "0.1rem",
          }}
        >
          {user ? (
            <div>
              <Title level={3}>Aktif Siparişlerim</Title>
              <Form
                layout="vertical"
                style={{
                  maxWidth: "650px",
                }}
                form={form}
                onFinish={(values) => {
                  console.log("Güncellenmiş bilgiler:", values);
                }}
              >
                <Form.Item label="Kullanıcı Adı" name="username">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="E-posta" name="email">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="İletişim Adresi" name="address">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Telefon Numarası" name="phonenumber">
                  <Input disabled />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="button" onClick={showModal}>
                    Bilgileri Güncelle
                  </Button>
                </Form.Item>
              </Form>
              <Modal
                title="Şifre Doğrulaması"
                open={isModalOpen} // `visible` yerine `open`
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={null}
                maskClosable={false}
              >
                <Form layout="vertical" onFinish={handleOk}>
                  <Form.Item
                    label="Şifrenizi Girin"
                    name="password"
                    rules={[{ required: true, message: "Şifrenizi girin!" }]}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Onayla
                    </Button>
                    <Button style={{ margin: "0 8px" }} onClick={handleCancel}>
                      İptal
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          ) : (
            <div>Yükleniyor...</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CurrentOrderPage;
