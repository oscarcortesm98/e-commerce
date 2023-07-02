import { deleteProduct } from '../../store/slices/cart.slice'
import { useDispatch } from 'react-redux'

const CartProduct = ({ cartProduct }) => {

  const dispatch = useDispatch()

  const totalPrice = (cartProduct.quantity * cartProduct.product.price).toFixed(2)
  
  const handleDeleteProduct =() => {
    dispatch(deleteProduct(cartProduct.id))
  }

  return (
    <article className='grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-y-2 py-3'>
      <div className='h-[90px] aspect-square'>
        <img src={cartProduct.product.images[0].url} className='h-full w-full object-contain' alt="" />
      </div>

      <div className='p-2'>
        <span className='text-gray-900 line-clamp-1'>{cartProduct.product.title}</span>
        <article className='mt-4'>      
          <div className='flex max-w-max border-[1px]'>
            <button className='p-[2px] px-2 border-[1px]'>-</button>
            <div className='p-[2px] px-3 border-[1px]'>{cartProduct.quantity}</div>
            <button className='p-[2px] px-2 border-[1px]'>+</button>
          </div>
        </article>
      </div>
 
      <i onClick={handleDeleteProduct} className='bx bxs-trash text-end text-xl text-gray-500 justify-self-end cursor-pointer p-3 transition ease-in-out duration-300 hover:-translate-y-1 hover:text-red-500'></i>

      <span className='col-span-2 text-end text-gray-600'>Total: </span>
      <span className='px-2 font-semibold text-gray-900'>${totalPrice}</span>

    </article>
  )
}

export default CartProduct