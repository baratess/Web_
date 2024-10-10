import { Button, Form, Input, InputNumber, message, Select, Spin } from "antd";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminCreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

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

  const onFinish = async (values) => {
    function splitAndTrim(values) {
      return values.split("\n").map((item) => item.trim());
    }

    const imgLinks = splitAndTrim(values.img);
    const colors = splitAndTrim(values.colors);
    const sizes = splitAndTrim(values.sizes);
    const subCategory = splitAndTrim(values.subCategory);

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          colors: colors,
          sizes: sizes,
          img: imgLinks,
          subCategory: subCategory,
        }),
      });
      if (response.ok) {
        message.success("URUN BASARIYLA OLUSTURULDU");
        form.resetFields();
      } else {
        message.success("URUN OLUSTURULURKEN HATA OLUSTU");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(categories);

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="category"
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
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Sub Category"
          name="subCategory"
          rules={[
            {
              required: true,
              message: "Please input at least 1 subCategory!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir alt kategoriyi yeni bir satira girin."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please input product price!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Product Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input product discount!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input product description!",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Product Image Links"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input at least 4 image link!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satira girin."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Colors (RGB Codes)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please input at least 3 products color!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir ürün rengini yeni bir satira girin."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Size "
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please input at least 1 product size!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir ürün bedenini yeni bir satira girin."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminCreateProductPage;
