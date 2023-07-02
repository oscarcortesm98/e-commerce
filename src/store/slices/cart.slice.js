import { createSlice } from "@reduxjs/toolkit"
import { axiosUrl, getConfig } from "../../utils/configAxios"

const initialState = {
  products: [],
  isShowCart: false
}

const cartSlice = createSlice({

  initialState,
  name: "cart",
  reducers: {
    changeStatus: (state) => {
      state.isShowCart = !state.isShowCart
    },
    setProducts: (state, action) => {
      const newProducts = action.payload
      state.products = newProducts
    }
  }
})

export const { changeStatus, setProducts } = cartSlice.actions

export const getCartProducts = () => (dispatch) => {
  axiosUrl
    .get("/cart", getConfig())
    .then(({ data }) => dispatch(setProducts(data)))
    .catch((err) => console.log(err))
}

export const addProduct = (data) => (dispatch) => {
  axiosUrl
    .post("/cart", data, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => console.log(err))
}

export const deleteProduct = (productId) => (dispatch) => {
  axiosUrl
    .delete(`/cart/${productId}`, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => console.log(err))
}

export const checkoutCart  = () => (dispatch) => {
  axiosUrl
    .post("/purchases", {}, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => console.log(err))
}

export default cartSlice.reducer
 