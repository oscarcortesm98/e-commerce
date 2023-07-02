import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../../store/slices/cart.slice'

const Product = ({ product }) => {

  const dispatch = useDispatch()

  const handleAddProduct = (e) => {
    e.preventDefault()
    const productSelected = {
      quantity: 1,
      productId: product.id
    }
    dispatch(addProduct(productSelected))
  }

  return (

    <Link className='flex justify-center' to={`/products/${product.id}`}>

      <article className='rounded-3xl bg-white shadow-md h-auto w-[260px] p-3 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-105'>

        <div className='h-[200px] relative overflow-hidden p-3 group'>
          <img className='w-full h-full object-contain opacity-100 transition-opacity duration-500 group-hover:opacity-0' src={product.images[0].url} alt={product.name} />

          <div className='w-full h-full object-contain opacity-0 transition-opacity duration-500 absolute top-0 left-0 p-3 group-hover:opacity-100'>
            <img className='w-full h-full object-contain' src={product.images[1].url} alt="" />
          </div>
        </div>


        <section className='text-sm'>
          <section className='h-[80px]'>
          <h5 className='text-gray-500'>{product.brand}</h5>
          <h4 className='font-semibold'>{product.title}</h4>
          </section>

          <span className='font-semibold text-lg'>${product.price}</span>

          <div className='flex justify-end px-2 mb-2'>
            <button onClick={handleAddProduct} className='h-[36px] aspect-square rounded-full text-center text-red-500 hover:scale-110 transition ease-in-out duration-300'><i className='bx bxs-plus-circle text-4xl'></i></button>
          </div>
        </section>

      </article>
    </Link>
  )
}

export default Product