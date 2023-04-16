import React from 'react';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom'
import { IProduct } from '../../type/interface';
interface DataType {
    key: string | number;
    name: string;
    price: number,
    cateId: number
}
interface IProps {
    products: IProduct[]
}

const ProductsManagement = (props: IProps) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'cateId',
            key: 'cateId',
            render: (cateId) => cateId == 1 ? "Category 1" : "Category 2"
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button style={{ backgroundColor: 'blue', color: 'white' }}><Link to={`${record.key}/update`}>Update</Link></Button>
                    <Button style={{ backgroundColor: 'red', color: 'white' }}>Remove</Button>
                </Space>
            ),
        },
    ];
    const data: DataType[] = props.products.map((item) => {
        return {
            key: item.id,
            name: item.name,
            price: item.price,
            cateId: item.cateId,
        }
    })
    return (
        <div><Table columns={columns} dataSource={data} /></div>
    )
}

export default ProductsManagement