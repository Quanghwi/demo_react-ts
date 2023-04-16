import React from 'react';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../type/interface'
import { Link } from 'react-router-dom'
interface DataType {
    key: string | number;
    name: string;
    price: number,
    cateId: number
}
interface IProps {
    products: IProduct[]
}
const ProductsPage = (props: IProps) => {
    
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button><Link to={`${record.key}`}>Detail</Link></Button>
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

export default ProductsPage