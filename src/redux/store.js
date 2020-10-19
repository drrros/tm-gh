import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

const store = createStore(rootReducer(history), applyMiddleware(routerMiddleware(history), thunk))

export default store
