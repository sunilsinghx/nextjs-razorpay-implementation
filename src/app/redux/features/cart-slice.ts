import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItemState = {
  name: string;
  id: number;
  imagePath: string;
  price: number;
  description: string;
  quantity: number;
};

const initialState = {
  items: [] as CartItemState[],
};
export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addInCart: (state, action: PayloadAction<CartItemState>) => {
      state.items.push(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const removeId = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== removeId),
      };
    },

    clearCart: (state)=>
    {
      return {items:[]};
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    },
  },
});

//its reducer functions
export const { addInCart,decrementQuantity,clearCart,removeFromCart,incrementQuantity } = cart.actions;

//its reducer
export default cart.reducer;
