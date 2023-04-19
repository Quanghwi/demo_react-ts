import React from 'react';
import { Space, Table, Button, Modal } from 'antd';
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
    products: IProduct[],
    onRemove: (id: number) => void
}

const ProductsManagement = (props: IProps) => {
    const { confirm } = Modal
    const confirmRemove = (id: number) => {
        confirm({
            title: 'Chắc chắn xóa?',
            okText: 'Yes',
            cancelText: 'No',
            okType: 'danger',
            onOk() {
                props.onRemove(id)
            },
            onCancel() { }
        })
    }
    // const removeProduct = (id: number) => {
    //     props.onRemove(id)
    // }
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => index + 1,
        },
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
                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => confirmRemove(record.key)}>Remove</Button>
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
        <div>
            <h2>Products Management</h2>
            <Table columns={columns} dataSource={data} /></div>
    )
}

export default ProductsManagement