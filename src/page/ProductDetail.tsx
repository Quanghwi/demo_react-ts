import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { IProduct } from '../type/interface';
import { useParams } from 'react-router-dom';

interface IProps {
  products: IProduct[],
}
const ProductDetail = (props: IProps) => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const currentProduct = props.products.find((product: IProduct) => product.id == Number(id))
  const [product, setProduct] = useState<IProduct>()
  useEffect(() => {
    setProduct(currentProduct)
  }, [props])

  const setFields = () => {
    form.setFieldsValue({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      cateId: product?.cateId,
    })
  }

  useEffect(() => {
    setFields()
  }, [product])
  const onFinish = (values: any) => {

  };
  return (
    <div>
      <h2>Detail Product</h2>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Id product"
          name="id"
          style={{ display: 'none' }}
        >
          <Input disabled style={{ color: 'black' }} />
        </Form.Item>

        <Form.Item
          label="Product name"
          name="name"
        >
          <Input disabled style={{ color: 'black' }} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"

        >
          <Input disabled style={{ color: 'black' }} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="cateId"
        >
          <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
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
            disabled={true}

          />
        </Form.Item>
      </Form></div>
  )
}

export default ProductDetail