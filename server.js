const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

//middleware to accept json
app.use(express.json())



//local database - for test purpose , in actual use database
const users =[]


//Route
app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/users/signup', (req, res) => {
    res.send('Signup page')
})

app.post('/users/signup', async(req, res) => {

    //store password as hash
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10)

    const user = {
        username: req.body.username,
        password: hashedpassword
    }
    users.push(user)
    res.redirect('/users')
})


app.listen(4100, () => {
    console.log('Server running on port 4100')
})