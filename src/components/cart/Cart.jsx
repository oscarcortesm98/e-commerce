import { useDispatch, useSelector } from 'react-redux'
import { changeStatus, checkoutCart, getCartProducts } from '../../store/slices/cart.slice'
import { useEffect } from 'react'
import CartProduct from './CartProduct'

const Cart = () => {

  const { isShowCart, products } = useSelector((store) => store.cart)
  const { token } = useSelector(store => store.userInfo)
  const dispatch = useDispatch()

  const showCart = () => dispatch(changeStatus())
  const checkout = () => dispatch(checkoutCart())

  const totalCheckout = products.reduce(
    (acc, product) => acc + product.quantity * product.product.price, 0
  )

  useEffect(() => {

    if (token && isShowCart) {
      dispatch(getCartProducts())
    }
  }, [isShowCart])


  return (
    <section className={`fixed grid grid-rows-[auto_1fr_auto] w-[295px] bg-white text-sm ${isShowCart && token ? "right-2 sm:right-4" : "-right-full"} p-2 transition-all duration-300 shadow-lg shadow-gray-600 sm:w-[310px] h-[97%] top-[1%] rounded-xl`}>

      <div className='sm:px-2'>
        <h3 className='mb-2 sm:mt-2'><i className='bx bxs-cart text-lg sm:text-2xl '></i> <span>SHOPPING</span> <span><strong>CART</strong></span></h3> <hr />

        <button onClick={showCart} className='absolute top-3 right-3 text-2xl text-red-500 hover:text-red-600 transition-colors duration-300 sm:top-4' ><i className='bx bxs-x-circle'></i></button>
      </div>

      {/* Productos del carrito */}
      <section className='grid gap-6 content-start overflow-y-scroll py-4'>
        {
          products.map((cartProduct) => <CartProduct key={cartProduct.id} cartProduct={cartProduct} />)
        }
      </section>

      {/* Total */}
      <section className='grid grid-cols-2 gap-4 border-t-[1px] mb-3 px-2 pt-1 border-gray-300'>
        <span className='mt-3'>TOTAL</span>
        <span className='text-end font-semibold mt-3'>$ {(totalCheckout.toFixed(2))}</span>
        <button onClick={checkout} className='block w-full col-span-2 bg-red-500 rounded-lg font-semibold text-white py-2 hover:bg-red-600 transition-colors duration-300'><i className='bx bxs-shopping-bag'></i> C H E C K O U T</button>
      </section>

    </section>
  )
}

export default Cart