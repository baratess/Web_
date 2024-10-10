import { Button, Form, Input, message, Spin, Select } from "antd";
import { useState, useEffect } from "react";

const AdminCreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("CATEGORI BASARIYLA OLUSTURULDU");
        form.resetFields();
      } else {
        message.success("CATEGORI OLUSTURULURKEN HATA OLUSTU");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();

          setCategories(data);
        } else {
          message.error("Error.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [apiUrl]);

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category Image Link"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input image link!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category Tag"
          name="slug"
          rules={[
            {
              required: true,
              message: "Please select at least one product category!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.slug}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Category Sub Tag"
          name="subSlug"
          rules={[
            {
              required: true,
              message: "Please select at least one product category!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.subSlug}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminCreateCategoryPage;
