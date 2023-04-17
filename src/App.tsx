import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import WebLayout from './page/layout/WebLayout'
import HomePage from './page/HomePage'
import ProductsPage from './page/ProductsPage'
import ProductDetail from './page/ProductDetail'
import AdminLayout from './page/layout/AdminLayout'
import Dashboard from './page/admin/Dashboard'
import ProductsManagement from './page/admin/ProductsManagement'
import UpdateProduct from './page/admin/UpdateProduct'
import AddProduct from './page/admin/AddProduct'
import { IProduct } from './type/interface'
import { addProduct, deleteProduct, getAll, updateProduct } from './api/product'
function App() {
  const [products, setProduct] = useState<IProduct[]>([])
  useEffect(() => {
    getAll().then(({ data }) => setProduct(data))
  }, [])
  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() => {
      setProduct(products.filter((item: IProduct) => item.id !== id))
    })
  }
  const onHandleAdd = (products: IProduct) => {
    addProduct(products).then(() => getAll().then(({ data }) => setProduct(data)))
  }

  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() => getAll().then(({ data }) => setProduct(data)))
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< WebLayout />}>
          <Route index element={< HomePage />} />
          <Route path='products'>
            <Route index element={< ProductsPage products={products} />} />
            <Route path=':id' element={< ProductDetail />} />
          </Route>
        </Route>
        <Route path='/admin' element={< AdminLayout />}>
          <Route index element={< Dashboard />} />
          <Route path='addProduct' element={< AddProduct onAdd={onHandleAdd} />} />
          <Route path='products'>
            <Route index element={< ProductsManagement products={products} onRemove={onHandleRemove} />} />
            <Route path=':id/update' element={< UpdateProduct products={products} onUpdate={onHandleUpdate} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
export default App
