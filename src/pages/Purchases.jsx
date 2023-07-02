import React, { useEffect, useState } from 'react'
import { axiosUrl, getConfig } from '../utils/configAxios'
import { Link } from 'react-router-dom'
import Purchase from '../components/purchases/Purchase'

const Purchases = () => {

  const [purchasesList, setPurchasesList] = useState([])



  useEffect(() => {
    axiosUrl
      .get("/purchases", getConfig())
      .then(({ data }) => {
        const sortPurchases = data.sort(
          (a, b) => {
            new Date(b.createdAt).getTime - new Date(a.createdAt).getTime()

        })
        setPurchasesList(sortPurchases)
      })
      .catch((err) => console.log(err))
  }, [])


  return (

    <section className='max-w-[1200px] mx-auto'>

      <section className='flex my-4 gap-1 items-center p-2 text-sm text-gray-400'>
        <Link to='/'><i className='bx bxs-home'></i> Home</Link>
        <div className='h-[6px] aspect-square rounded-full bg-red-500'></div>
        <span className='w-[220px] font-semibold truncate'><i className='bx bxs-shopping-bags'></i> My purchases</span>
      </section>

      <h3 className='text-sm p-3 sm:text-[15px] lg:text-[16px]'><i className='bx bxs-shopping-bags'></i>  MY <span><strong>PURCHASES</strong></span><hr /></h3>

      <section className='max-w-[700px] grid gap-4 mx-auto p-4'>
        {
          purchasesList.map((purchase) => <Purchase key={purchase.id} purchase={purchase} />)
        }
      </section>
    </section>
  )
}

export default Purchases