# Redux Persist Cookies Storage Adapter

[Redux Persist](https://github.com/rt2zz/redux-persist) storage adapter for cookies in web browsers.

Based on [redux-persist-cookie-storage](https://github.com/abersager/redux-persist-cookie-storage)

## Installation

`yarn add redux-persist-cookies-adapter cookies-js`

## Usage

### Using cookies as primary storage

```js
import CookiesStorage from 'redux-persist-cookies-adapter'
import Cookies from 'cookies-js'
import { createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import someReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: new CookiesStorage(Cookies),
}

const rootReducer = persistReducer(persistConfig, someReducer)
const store = createStore(rootReducer)
const persistor = persistStore(store)

export { store, persistor }
```

### Using localStorage as primary storage and cookies as secondary storage

```js
import CookiesStorage from 'redux-persist-cookies-adapter'
import Cookies from 'cookies-js'
import { combineReducers, createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { auth, someOtherReducer } from './reducers'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth'],
}

const authPersistConfig = {
  key: 'auth',
  storage: new CookiesStorage(Cookies),
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  root: someOtherReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
```
