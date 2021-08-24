import { persistStore } from 'redux-persist'
import store from './CreateStore';

export default persistStore(store);