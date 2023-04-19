import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { IProduct } from '../../type/interface';
import { useNavigate, useParams } from 'react-router-dom';

interface IProps {
    products: IProduct[],
    onUpdate: (product: IProduct) => void
}
const UpdateProduct = (props: IProps) => {
    const { id } = useParams()
    const navigate = useNavigate()
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
        props.onUpdate(values);
        message.success("Cập nhật sản phẩm thành công")
        navigate('/admin/products')
        console.log(values);

    };
    return (
        <div> 
            <h2>Update Product</h2>
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
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

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
                rules={[{ required: true, message: 'Please select your product category!' }]}
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
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form></div>
    )
}

export default UpdateProduct