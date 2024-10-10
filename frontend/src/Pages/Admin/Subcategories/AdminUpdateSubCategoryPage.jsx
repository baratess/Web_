import { Button, Form, Input, message, Spin } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AdminUpdateSubCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const categoryId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("CATEGORI BASARIYLA GUNCELLENDI");
      } else {
        message.error("CATEGORI GUNCELLENIRKEN HATA OLUSTU");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme HATASI");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
            slug: data.slug,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [apiUrl, categoryId, form]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
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
              message: "Please input category tag!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminUpdateSubCategoryPage;
