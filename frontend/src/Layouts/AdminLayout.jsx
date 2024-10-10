import { Layout, Menu, message } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  // DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userId = localStorage.getItem("user");

    if (!userId) {
      message.error("You must log in first");
      navigate("/auth/login");
    } else {
      setUser(userId);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        try {
          const response = await fetch(`${apiUrl}/api/users`);
          if (response.ok) {
            const data = await response.json();
            const userInfo = data.find((item) => item._id === user);
            if (userInfo) {
              setUserInfo(userInfo);
            } else {
              message.error("User not found");
              navigate("/auth/login");
            }
          } else {
            message.error("Failed to fetch user data");
            navigate("/auth/login");
          }
        } catch (error) {
          console.log("Giriş hatası:", error);
          message.error("Bir hata oluştu.");
          navigate("/auth/login");
        }
      }
    };

    fetchUserInfo();
  }, [apiUrl, user, navigate]);

  const menuItems = [
    // {
    //   key: "1",
    //   icon: <DashboardOutlined />,
    //   label: "Dashboard",
    //   path: "/admin",
    //   onClick: () => {
    //     navigate(`/admin`);
    //   },
    // },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      path: "/",
      children: [
        {
          key: "3",
          label: "Kategori Listesi",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "4",
          label: "Yeni Kategori Oluştur",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "14",
      icon: <AppstoreOutlined />,
      label: "Alt Kategori",
      path: "/admin/subcategories",
      children: [
        {
          key: "15",
          label: "Alt Kategoriler",
          path: "/admin/subcategories",
          onClick: () => {
            navigate(`/admin/subcategories`);
          },
        },
        {
          key: "16",
          label: "Yeni Alt Kategori Oluştur",
          path: "/admin/subcategories/create",
          onClick: () => {
            navigate("/admin/subcategories/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      path: "/",
      children: [
        {
          key: "6",
          label: "Ürün Listesi",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "7",
          label: "Yeni Ürün Oluştur",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Kuponlar",
      path: "/admin/coupons",
      children: [
        {
          key: "9",
          label: "Kupon Listesi",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "10",
          label: "Yeni Kupon Oluştur",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      path: "/admin/orders",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.label;
        }
      }
    }
  };

  if (userInfo && userInfo.role === "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider theme="dark" width={200}>
            <Menu
              mode="vertical"
              style={{ height: "100%" }}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>{getPageTitle()}</h2>
                <h2>Admin Panel</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{ padding: "24px 50px", minHeight: "360vh" }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return <div>Redirecting...</div>; // Başka bir yönlendirme göster unutma
  }
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};
