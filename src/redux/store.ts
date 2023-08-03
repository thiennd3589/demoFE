import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import UserReducer from "./userSlice/slice";
import rootSaga from "./saga";
import videoReducer from "./videoSlice/slice";
import layoutReducer from "./layoutSlice/slice";
import boarReducer from "./board/slice";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    user: UserReducer,
    video: videoReducer,
    layout: layoutReducer,
    board: boarReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      middlewares
    );
  },
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
