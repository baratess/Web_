import { Button, Table, message, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc[0]}
          alt="Image"
          style={{
            width: "200px",
            height: "200px",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.current.toFixed(2)}</span>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>%{text.discount}</span>,
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"large"}>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          message.error("VERI GETIRME HATASI.");
        }

        const [categoriesData, productsData] = await Promise.all([
          categoryResponse.json(),
          productResponse.json(),
        ]);

        const productsWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });

        setDataSource(productsWithCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kategori başarıyla silindi.");
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId);
        });
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
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

export default AdminProductPage;
