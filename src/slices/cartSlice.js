import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";


const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0,
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        
        //add to cart
        addToCart: (state, action) => {

            const course = action.payload
            const index = state.cart.findIndex( (item) => item._id === course._id)

            if(index >=0) {
                //if the course is already in the cart , do not modify the quantity
                toast.error("Course already in cart")
                return
            }

            //if the course is not in the cart , add it to the cart
            state.cart.push(course)

            //update the total quantiy and price
            state.totalItems++
            state.total += course.price

            //update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            //show toast
            toast.success("Course addded to cart")

        },
        //remove from cart
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex( (item) => item._id === courseId)

            if(index >= 0 ){

                //if the course is found in the cart, remove it
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index, 1); //removing the course at that index 

                //update to the local storage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

                //show toast
                toast.error("Course removed from cart")
            }

        },
        //resetcart
        resetCart: (state) => {
            state.cart = [];
            state.total =0;
            state.totalItems = 0;

            //update to localStorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
        
    }
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer
