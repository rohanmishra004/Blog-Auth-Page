const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

//view engine
app.set('view engine', 'ejs')


//middleware to accept json
app.use(express.json())
app.use(express.urlencoded({extended:false}))




//local database - for test purpose , in actual use database
const users =[]


//Route

//SIGNUP
app.get('/users', (req, res) => {
    res.render('index', {users:users})
})

app.get('/users/signup', (req, res) => {
    res.render('signup')
})

app.post('/users/signup', async(req, res) => {
    try {
        //store password as hash
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        
        users.push({
            username: req.body.username,
            password: hashedPassword
            }
        )
        res.redirect('/users/login')
    } catch (err) {
        res.redirect('/users/signup')
    }
    
})



//LOGIN ROUTE - auth check
app.get('/users/login', (req, res) => {
    res.render('login')
})


app.post('/users/login', (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (!user) {
        res.redirect('/users/login')
    }
    //check password auth
    try {
        if (bcrypt.compare(req.body.password, user.password)) {
            res.status(200).json('Successfully logged in')
        }else{
            res.redirect('/users/login')
        }
    } catch (err) {
        res.redirect('/users/login')
    }
})

app.listen(4100, () => {
    console.log('Server running on port 4100')
})