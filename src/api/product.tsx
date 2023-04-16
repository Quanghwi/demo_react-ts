import { IProduct } from "../type/interface"
import { instance } from "./instance"


const getAll = () => {
    return instance.get('/products')
}
const getOne = (id: number) => {
    return instance.get('/products' + id)
}
const addProduct = (product: IProduct) => {
    return instance.post('/products', product)
}
const updateProduct = (product: IProduct) => {
    return instance.put('/products/' + product.id, product)
}
const deleteProduct = (id: number) => {
    return instance.get('/products/' + id)
}

export { getAll, getOne, updateProduct, addProduct, deleteProduct }