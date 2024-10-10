import { Button, Table, message, Popconfirm, Space } from "antd";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AdminSubCategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category Tag",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Category Sub Tag",
      dataIndex: "subSlug",
      key: "subSlug",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size={"large"}>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="YOU ARE DELETING THIS CATEGORY"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);

      if (response.ok) {
        const data = await response.json();

        setDataSource(data);
      } else {
        message.error("Error.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Caregory deleted");
        fetchCategory();
      } else {
        message.error("Not Deleted.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default AdminSubCategoryPage;
