// showLastCommitMessageForThisLibrary.js
import {create} from 'apisauce'

// define the api
const api = create({
  baseURL: 'http://localhost:3000',
})

// start making calls
api.post('/users', {name: 'steve'}).then(console.log)
