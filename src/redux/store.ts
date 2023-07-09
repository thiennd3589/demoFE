import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import UserReducer from "./userSlice/slice";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: { user: UserReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      middlewares
    );
  },
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
