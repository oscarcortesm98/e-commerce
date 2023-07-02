import { formatDDMMYYYY } from "../../utils/date"

const Purchase = ({ purchase }) => {

  const totalPrice = (purchase.product.price * purchase.quantity).toFixed(2)

  return (
    <article className="grid grid-cols-2 rounded-xl shadow-md items-center bg-white p-4 px-5 text-sm">

      {/* Sección izquierda */}
      <section className="gap-2 flex items-center text-[13px]">
        <div className="h-[80px] aspect-square">
          <img className="h-full w-full object-contain" src={purchase.product.images[2].url} alt="" />
        </div>
        <span className="font-semibold">{purchase.product.title}</span>
      </section>


      {/* Sección derecha */}
      <section className="grid justify-end text-center gap-1 font-semibold sm:grid-cols-3">
        <span className="text-xs text-gray-500">{formatDDMMYYYY(purchase.createdAt)}</span>
        <span className="border-[0.5px] border-gray-400 p-1 text-xs text-gray-600" >{purchase.quantity}</span>
        <span className="text-gray-800">${totalPrice}</span>
      </section>
    </article>
  )
}

export default Purchase