import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

const wishlistItems = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      // console.log("Wishlist product data-----", action.payload);

      let existsItemIndex = state.wishlistItems?.findIndex(
        (item) => item.id === action.payload?.id
      );

      if (existsItemIndex >= 0) {
        toast.error("This product already exists in your wishlist");
      } else {
        let buildWishlistItem = { ...action.payload };
        state.wishlistItems?.push(buildWishlistItem);

        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishlistItems)
        );
      }
    },

    clearAllWishlist: (state, action) => {
      state.wishlistItems = [];
    },

    removeFromWishlist: (state, action) => {
      let filteredItems = state.wishlistItems?.filter(
        (item) => item?.id !== action.payload?.id
      );
      state.wishlistItems = filteredItems;
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
  },
});

export const { addToWishlist, clearAllWishlist, removeFromWishlist } =
  wishlistItems.actions;
export default wishlistItems.reducer;
