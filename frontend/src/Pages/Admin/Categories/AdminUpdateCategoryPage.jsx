import { Button, Form, Input } from "antd";

const AdminUpdateCategoryPage = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
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

      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </Form>
  );
};

export default AdminUpdateCategoryPage;
