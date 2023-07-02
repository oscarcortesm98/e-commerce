import React, { useEffect, useState } from 'react'
import { axiosUrl } from '../utils/configAxios'
import Product from '../components/home/Product'

const Home = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productName, setProductName] = useState("")
  const [currentCategory, setCurrentCategory] = useState([0])
  const [isShowFilters, setIsShowFilters] = useState(false)

  const productsByName = products.filter((product) =>
    product.title.toLowerCase().includes(productName)
  )

  const submit = (e) => {
    e.preventDefault()
    const currentProductName = e.target.productName.value
    setProductName(currentProductName.toLowerCase())
  }

  const handleCategory = (e) => {
    setCurrentCategory(e.target.dataset.category)
  }

  const handleFilters =() => {
    if (isShowFilters === false) {
      setIsShowFilters(true)
    }
    else if (isShowFilters === true){
      setIsShowFilters(false)
    }
  }

  useEffect(() => {

    axiosUrl
      .get("/categories")
      .then(({ data }) => setCategories(data))
      .catch((err) => console.log(err))

  }, [])

  useEffect(() => {

    axiosUrl
      .get("/products")
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err))

  }, [])

  useEffect(() => {

    axiosUrl
      .get(`/products?categoryId=${currentCategory}`)
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err))

  }, [currentCategory])

  return (
    <section >
      <form onSubmit={submit}>

        <div className='flex justify-center h-[30px] sm:my-4' >
          <input className='rounded-l-full outline-none px-3 font-semibold text-sm text-gray-600 shadow-sm shadow-gray-500 sm:w-[495px] sm:h-[35px] lg:h-[38px]' id="productName" type="text" />
          <button className='flex justify-center h-[30px] aspect-square rounded-r-full items-center bg-gray-400 text-white shadow-sm shadow-gray-500 hover:text-black/70 transition-all duration-300 sm:h-[35px] lg:h-[38px]'><i className='bx bx-search font-bold'></i></button>
        </div>

        <div className='px-8 pt-2'>
          <button onClick={handleFilters}><i className='bx bx-filter-alt' ></i> FILTERS</button>
        </div>

        {/* Filtros */}

        <section className={`z-[1] fixed grid grid-rows-[auto_1fr_auto] w-[295px] h-[90%] bottom-[2%] ${isShowFilters ? "left-2 sm:left-4" : "-left-full"} bg-white text-[15px] p-2 transition-all duration-300 shadow-lg shadow-gray-600 sm:w-[310px] rounded-xl `}>

          <div className='sm:px-2'>
            <h3 className='mb-2 font-semibold sm:mt-2'><i className='bx bx-filter-alt text-lg' ></i> FILTERS</h3> <hr />

            <button onClick={handleFilters} className='absolute top-3 right-3 text-2xl text-red-500 hover:text-red-600 transition-colors duration-300 sm:top-4' ><i className='bx bxs-x-circle'></i></button>
          </div>

          <div className='px-2 py-3'>
            <h4 className='h-7 p-2'>Categories</h4>
            <ul className='p-3'>
              <li className='cursor-pointer hover:font-semibold' onClick={handleCategory} data-category="">All</li>
              {
                categories.map((category) => (
                  <li className='cursor-pointer hover:font-semibold' onClick={handleCategory} key={category.id} data-category={category.id}>{category.name}</li>
                ))
              }
            </ul></div>

        </section>

        <section className='grid gap-5 grid-cols-[repeat(auto-fill,_270px)] justify-center max-w-[1600px] mx-auto p-6 sm:gap-x-1'>
          {
            productsByName.map((product) => (
              <Product key={product.id} product={product} />
            ))
          }
        </section>

        {/* <ListProducts products={{productsByName}}/> */}
      </form>
    </section>
  )
}

export default Home