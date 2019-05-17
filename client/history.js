// import createHistory from 'history/createBrowserHistory'
// import createMemoryHistory from 'history/createMemoryHistory'

import {createBrowserHistory, createMemoryHistory} from 'history'

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createBrowserHistory()

export default history