import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import Header from './components/layout/Header'
import ProtectedRoutes from './components/auth/ProtectedRoutes'
import Cart from './components/cart/Cart'

function App() {


  return (
    <main className='min-h-screen min-w-[300px] bg-gradient-to-b from-slate-100 to-slate-100 font-["Quicksand"] '>
      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products/:id' element={<ProductDetail />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/purchases' element={<Purchases />} />
        </Route>
          
      </Routes>

       <Cart/>
    </main>
  )
}

export default App
