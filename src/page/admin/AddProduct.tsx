import React from 'react';
import { Button, Select, Form, Input, message } from 'antd';
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
    message.success("Thêm sản phẩm thành công")
    navigate('/admin/products')

  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  return (
    <div> 
      <h2>Add Product</h2>
      <Form
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
        rules={[{ required: true, message: 'Không được bỏ trống!' },
        { min: 5, message: "Tối thiểu 5 kí tự" },
        // phải có kí tự chữ hoặc số
        // { pattern: /^[a-zA-Z0-9\s]+$/, message: "Phải nhập chữ hoặc số" },

        // validation không chứa toàn khoảng trắn
        {
          validator: (rule, value) => {
            const pattern = /^\S.*\S$/;
            if (value && !pattern.test(value)) {
              return Promise.reject("Không thể chứa toàn khoảng trắng")
            }
            return Promise.resolve();
          }
        },
        // Cho phép viết tiếng Việt
        {
          validator: (rule, value) => {
            const patten = /^[\p{L}\d\s]+$/u;
            if (value && !patten.test(value)) {
              return Promise.reject("")
            }
            return Promise.resolve()
          }
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Không được bỏ trống!' }, {
          pattern: /^[0-9]+$/, message: "Phải nhập số"
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name="cateId"
        rules={[{ required: true, message: 'Hãy chọn phân loại sản phẩm!' }]}
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
          Thêm mới
        </Button>
      </Form.Item>
    </Form></div >
  )
}

export default AddProduct