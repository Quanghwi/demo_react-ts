import { useState } from 'react'
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
function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< WebLayout />}>
          <Route index element={< HomePage />} />
          <Route path='products'>
            <Route index element={< ProductsPage />} />
            <Route path=':id' element={< ProductDetail />} />
          </Route>
        </Route>
        <Route path='/admin' element={< AdminLayout />}>
          <Route index element={< Dashboard />} />
          <Route path='addProduct' element={< AddProduct />} />
          <Route path='products'>
            <Route index element={< ProductsManagement />} />
            <Route path=':id/update' element={< UpdateProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
