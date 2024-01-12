import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartItems = createSlice({
  name: "cartlists",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log("Cart product data-----", action.payload);

      let existsItemIndex = state.cartItems?.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existsItemIndex >= 0) {
        alert("This product already added in your cart");
      } else {
        let buildCartlistItem = { ...action.payload, quantity: 1 };
        state.cartItems?.push(buildCartlistItem);

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        alert("Added to the cart");
      }
    },

    clearCart: (state, action) => {
      state.cartItems = [];
    },

    removeFromCart: (state, action) => {
      let filteredItems = state.cartItems?.filter(
        (item) => item?.id !== action.payload?.id
      );
      state.cartItems = filteredItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    adjustQuantity: (state, action) => {
      const { id, quantityAdjustment } = action.payload;
      const itemIndex = state.cartItems?.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += quantityAdjustment;

        if (state.cartItems[itemIndex].quantity <= 0) {
          state.cartItems = state.cartItems.filter((item) => item.quantity > 0);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, clearCart, removeFromCart, adjustQuantity } =
  cartItems.actions;
export default cartItems.reducer;
