import { useState, useEffect } from "react";
import { Button, Layout, Menu, Typography, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const PersonalInfoUpdatePage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [form] = Form.useForm();
  const userData = localStorage.getItem("user");
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    if (!userData) {
      message.error("You must log in first");
      navigate("/auth/login");
    } else {
      setUser(userData);
    }
  }, [navigate, userData]);

  useEffect(() => {
    if (!user) return;
    const userCheck = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        if (response.ok) {
          const data = await response.json();
          const userInfo = data.find((item) => item._id === user);
          if (userInfo) {
            form.setFieldsValue({
              username: userInfo.username,
              email: userInfo.email,
              address: userInfo.address,
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

  const handleUpdate = async (values) => {
    try {
      const { username, email, address, phonenumber } = values;
      const response = await fetch(`${apiUrl}/api/users/${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          address,
          phonenumber,
          ...(newPassword && { password: newPassword }), // yeni şifre varsa ekle
        }),
      });
      if (response.ok) {
        message.success("Bilgiler başarıyla güncellendi.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        message.error("Bilgiler güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Bir hata oluştu.", error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      message.error("Yeni şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (response.ok) {
        message.success("Şifre başarıyla güncellendi.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        message.error("Şifre güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Bir hata oluştu.", error);
    }
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ marginTop: "20px", padding: "5px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]} // Seçilen öğeyi belirler
          onClick={(e) => handleMenuClick(e.key)}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Kişisel Bilgiler",
              onClick: () => navigate("/profile/user_info"),
            },
            {
              key: "2",
              label: "Güncel Siparişler",
              onClick: () => navigate("/profile/current_order"),
            },
            {
              key: "3",
              label: "Sipariş Geçmişi",
              onClick: () => navigate("/profile/history_order"),
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
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#f5f5f5",
            borderRadius: "0.1rem",
            display: "flex",
            gap: "24px",
          }}
        >
          <div style={{ flex: 1 }}>
            {user ? (
              <div>
                <Title level={3}>Kişisel Bilgiler</Title>
                <Form
                  layout="vertical"
                  style={{ maxWidth: "400px" }}
                  form={form}
                  onFinish={handleUpdate}
                >
                  <Form.Item label="Kullanıcı Adı" name="username">
                    <Input />
                  </Form.Item>
                  <Form.Item label="E-posta" name="email">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Kullanıcı Adresi" name="address">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Telefon Numarası" name="phonenumber">
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Bilgileri Kaydet
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <div>Yükleniyor...</div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <Title level={3}>Şifre Güncelle</Title>
            <Form
              layout="vertical"
              style={{ maxWidth: "400px" }}
              onFinish={handlePasswordChange}
            >
              <Form.Item
                label="Yeni Şifre"
                name="newPassword"
                rules={[{ required: true, message: "Yeni şifrenizi girin!" }]}
              >
                <Input.Password
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Yeni Şifre Tekrar"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Şifrenizi tekrar girin!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Şifreyi Güncelle
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PersonalInfoUpdatePage;
