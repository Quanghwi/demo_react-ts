import React from 'react';
import { Button, Select, Form, Input } from 'antd';
import { IProduct } from '../../type/interface';
import { useNavigate } from 'react-router-dom'

interface IProps {
  onAdd: (product: IProduct) => void
}

const AddProduct = (props: IProps) => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    props.onAdd(values)
    // console.log(values);
    navigate('/admin/products')

  };

  // const onChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearch = (value: string) => {
  //   console.log('search:', value);
  // };
  return (
    <div> <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Product name"
        name="name"
        rules={[{ required: true, message: 'Please input your product name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input your product price!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name="cateId"
        rules={[{ required: true, message: 'Please select your product category!' }]}
      >
        <Select
          showSearch
          placeholder="Select a category"
          optionFilterProp="children"
          // onChange={onChange}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 1,
              label: 'Category 1',
            },
            {
              value: 2,
              label: 'Category 2',
            },
          ]}
        />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form></div>
  )
}

export default AddProduct