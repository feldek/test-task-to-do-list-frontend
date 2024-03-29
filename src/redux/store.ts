import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
