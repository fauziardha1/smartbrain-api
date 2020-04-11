const express = require('express')
const cors  = require('cors')
const knex  = require('knex')
const bcrypt = require('bcrypt-nodejs')
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db= knex({
    client:'pg',
    connection:{
        host    : process.env.DATABASE_URL,
        ssl     : true
    }
})
const PORT = process.env.PORT || 4000 ;

const app = express()
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.json("it's working")
    // db.select('*')
    //     .from('users')
    //     .then(resp=>res.json(resp))
    //     .catch(err=>res.status(400).json("no data!"))
})
app.post('/signin',signIn.handleSignIn(db,bcrypt))
app.post('/register',register.handleRegister(db,bcrypt))
app.get('/profile/:id',profile.handleProfile(db))
app.put('/image',image.handleImage(db))
app.post('/imageUrl',(req,res)=>{image.handleApiCall(req,res)})
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
})
// skenario api
/**
 * /signin ->POST ->success/fail
 * /register -> POST -> new User object
 * /profile/:userId -> GET -> user Data
 * /rank/:userId -> PUT > update user rank
 * /image ->GET -> user image
 */