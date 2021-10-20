import { combineReducer } from "redux";

import restaurantReducer from "./Restaurant/restaurant.reducer";

const rootReducer = combineReducer({restaurant});

export default rootReducer;