import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosUrl } from '../utils/configAxios'
import ListProducts from '../components/home/ListProducts'
import Product from '../components/home/Product'
import { useDispatch } from 'react-redux'
import { addProduct } from '../store/slices/cart.slice'

const imagePosition = {
  1: "-ml-[0]",
  2: "-ml-[100%]",
  3: "-ml-[200%]"
}

const ProductDetail = () => {
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [imageToShow, setImageToShow] = useState(1)
  const { id } = useParams()

  const dispatch = useDispatch()

  const clickPlus = () => setQuantity(quantity + 1)

  const clickLess = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const previousImage = () => {
    if (imageToShow > 1) {
      setImageToShow(imageToShow - 1)
    }
  }

  const nextImage = () => {
    if (imageToShow < 3) {
      setImageToShow(imageToShow + 1)
    }
  }

  const handleAddProduct = () => {
    const productSelected = {
      quantity,
      productId: product.id
    }
    dispatch(addProduct(productSelected))
  }

  useEffect(() => {
    axiosUrl
      .get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => console.log(err))
  }, [id])

  useEffect(() => {
    if (product) {
      axiosUrl.get(`/products?categoryId=${product.categoryId}`)
        .then(({ data }) => {
          const productsFiltered = data.filter((item) => item.id !== product.id)
          setSimilarProducts(productsFiltered)
        })
        .catch((err) => console.log(err))
    }
  }, [product])

  return (
    <section className='max-w-[1200px] p-3 mx-auto '>

      <section className='flex my-4 gap-2 text-sm items-center'>
        <Link to='/'><i className='bx bxs-home'></i> Home</Link>
        <div className='h-[6px] aspect-square rounded-full bg-red-500'></div>
        <span className='w-[220px] font-bold truncate'>{product?.title}</span>
      </section>

      <section className='grid gap-6 items-center sm:grid-cols-2'>

        {/* Slider */}
        <article className='overflow-hidden relative p-2'>
          <section className={`flex w-[300%] ${imagePosition[imageToShow]} transition-all duration-300`}>
            <div className='h-[300px] w-[calc(100%_/_3)]'>
              <img className='w-full h-full object-contain' src={product?.images[0].url} alt={product?.title} />
            </div>

            <div className='h-[300px] w-[calc(100%_/_3)]'>
              <img className='w-full h-full object-contain' src={product?.images[1].url} alt={product?.title} />
            </div>

            <div className='h-[300px] w-[calc(100%_/_3)]'>
              <img className='w-full h-full object-contain' src={product?.images[2].url} alt={product?.title} />
            </div>
          </section>

          <button onClick={previousImage} className='absolute h-[35px] aspect-square rounded-full -translate-y-1/2 top-1/2 left-0  text-2xl bg-red-500 text-white'><i className='bx bx-chevron-left'></i></button>

          <button onClick={nextImage} className='absolute h-[35px] aspect-square rounded-full -translate-y-1/2 top-1/2 right-0  text-2xl bg-red-500 text-white'><i className='bx bx-chevron-right'></i></button>

        </article>

        {/* Detalle del producto */}
        <article className='grid gap-6'>
          <h4 className='font-semibold text-gray-400'>{product?.brand}</h4>
          <span className='font-semibold text-lg ml-2'>{product?.title}</span>

          <section className='grid grid-cols-2'>

            <article>
              <h4 className='font-semibold text-gray-500 mb-1'>Price</h4>
              <span className='font-semibold text-lg ml-2'>$ {product?.price}</span>
            </article>

            <article>
              <h5 className='font-semibold text-sm text-gray-500 mb-3'>Quantity</h5>
              <div className='flex justify-center max-w-max border-[1px] '>
                <button className='border-[1px] p-1 px-3' onClick={clickLess}>-</button>
                <div className='border-[1px] p-1 px-3'>{quantity}</div>
                <button className='border-[1px] p-1 px-3' onClick={clickPlus}>+</button>
              </div>
            </article>

          </section>

          <div>
            <button onClick={handleAddProduct} className='w-full bg-red-500 rounded-lg font-semibold text-white py-2 hover:bg-red-600 transition-colors duration-300'><i className='bx bx-cart'></i> ADD TO CART</button>
          </div>

          <p className='text-justify'>{product?.description}</p>

        </article>

      </section>

      <section>
        <h3>Discover similar items</h3>

        {/* <ListProducts products={products} /> */}

        <section className='grid gap-8'>
          {
            similarProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          }
        </section>
      </section>

    </section>
  )
}

export default ProductDetail 