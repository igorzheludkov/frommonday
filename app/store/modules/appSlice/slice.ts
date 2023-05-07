import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import IHabbit from '../../../models/IHabbit';

export interface AppState {
  habbits: IHabbit[];
  banner: string | undefined;
}

const initialState: AppState = {
  habbits: [],
  banner: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addHabbit: (state, action: PayloadAction<IHabbit>) => {
      const existingHabbitIndex = state.habbits.findIndex(
        habbit => habbit.id === action.payload.id,
      );

      if (existingHabbitIndex >= 0) {
        state.habbits[existingHabbitIndex] = action.payload;
      } else {
        state.habbits.push(action.payload);
      }
    },
    removeHabbit: (state, action: PayloadAction<string>) => {
      state.habbits = state.habbits.filter(
        habbit => habbit.id !== action.payload,
      );
    },
    changeBanner: (state, action: PayloadAction<string | undefined>) => {
      state.banner = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addHabbit, removeHabbit, changeBanner} = appSlice.actions;

export default appSlice.reducer;
