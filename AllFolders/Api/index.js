const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
// app.UseCors((g)=>g.AllowAnyOrigin());


// app.listen(8000, () => {
//     console.log('Server is running on port 3000');
//   });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
    .connect("mongodb+srv://Saiki1212:Saiki123@cluster0.ab0xvvs.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error while Connecting to MongoDB ❎❎❎ :  ", error);
    });

app.listen(port,() => {
    console.log("Server is running on the port 8000");
})

const User = require('./Models/User')
const Order = require('./Models/order')

// Endpoint to Register into the App ......

// Function for sending token .......
const sending_Verification_Email_To_User = async (email, name, verficationToken) => {
    // Create node mailer to transport ......
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : 'saikimunna999@gmail.com',
            pass: 'soexpslxqbnxwofy'
        }
    })

    // Compose the email message .......
    const mailOptions = {
        from: 'saikiranAmazonClone.com',
        to: email,
        subject: ` Mr.${name} Just Email Verfication  ✅ `,
        text: `Please click on the following link to verfiy your email to login into the Amazon_Clone Application .... : http://localhost:8000/verify/${verficationToken}`,

        
    }
    // Send the Verification Email ......

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Error in Verification Email Sending ❎ : ", error)
    }
}

app.post('/register', async(reqFromDB, resFromDB) => {
    
    try {
        const {name, email, password} = reqFromDB.body
        // console.log(name,email,password)
        // Check if Email Already Registered .....
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return resFromDB.status(400).json({message : 'Email already registered'})
        }
        // Creating a new User .....
        const newUser = new User({name, email, password})

        // Generating and Storing the Verification token ....
        newUser.verificationToken = crypto.randomBytes(20).toString('hex')

        // Save the New User in Data Base ......
        await newUser.save()
        
        //Send Verification Email to the User .....
        // console.log("its working 93")
        sending_Verification_Email_To_User(newUser.email,newUser.name, newUser.verificationToken)
        // console.log("its working 94")
        resFromDB.status(200).json({message : 'Registration Successsful'})
    } catch (error) {
        console.log('Error Broo ❎❎❎ : ', error)
        resFromDB.status(500).json({message : 'Registration Failed'})
    }
}) 

// Verifying the email ......
app.get('/verify/:token', async (reqFromDB, resFromDB) => {
    try {
        // const token = reqFromDB.params.token
        const token = reqFromDB.params.token;
        // console.log('Token : ---->>>> : ', token)
        // Find user by given Token .......
        const user = await User.findOne({ verificationToken: token });
        console.log('User : ---->>>> : ', user)
        if(!user) {
            return resFromDB.status(404).json({message: 'Invalid Verfication token'})
        }
        // Mark the user as verified .........
        user.verify = true
        user.verificationToken = undefined

        await user.save()
        resFromDB.status(200).json({message: 'Email verified successfully'})

    } catch (error) {
        resFromDB.status(500).json({message: 'Email verfication Failed'})
    }
})

// Login Endpoints

const generateSecretKey = () => {
    const key = crypto.randomBytes(32).toString("hex");
    return key;
}

const secretKey = generateSecretKey()


app.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const isUserRegistered = await User.findOne({email})
        // is user existing or not
        // console.log(' user email ✅✅✅ : ', isUserRegistered.email
        if(!isUserRegistered) {
            return res.status(401).json({message: 'Email doesnt exists'})
        }
        // is password is ✅ or ❎
        // console.log(' user password ✅✅✅ : ', isUserRegistered.password)
        if(isUserRegistered.password !== password) {
            return res.status(401).json({message: 'Invalid password'})
        }
        console.log(' user email and password ssuccess ✅✅✅ : ')

        //generate a token .......
        // console.log(' user token1 : ✅✅✅ : ')
        const payload = { userId: isUserRegistered._id };
        const token = jwt.sign(payload, secretKey)
        // console.log(' user token2 : ✅✅✅ : ', token)
        res.status(200).json({token})

    } catch (error) {
        res.status(500).json({message: 'Login Failed'})
    }
})

//   EndPoint for adding Address ........


app.post('/addresses', async(req, res) => {
    try {
        const {userId,address} = req.body
        // const userId = req.params.userId
        // find the user by userID. .....
        // console.log("index.js 173")
        const user = await User.findById(userId);
        // console.log("User ===>> line 175 : ", user)
        if(!user) {
            console.log("index.js 176")
            return res.status(404).json({message: 'User not Found'})
        }
        // console.log("index.js 178")

        // If user present add address to user adsresses array ......

        user.addresses.push(address)

        //save user address ......
        await user.save()
        res.status(200).json({message: 'Address Added Successfully'})

    } catch (error) {
        res.status(500).json({message: 'Error while Adding a new Address'})
    }
})

// Endpoint for retrieving the addresses ....

app.get('/addresses/:userId', async(req, res) => {
    // console.log('line 199 UserId ---> ')
    try {
        // console.log('line 200 UserId ---> ')
        const userId = req.params.userId
        // find the user by userID. ......
        const user = await User.findById(userId)
        // console.log('line 203 User ---> ')
        if(!user) {
            // console.log('line 207 User ---> ')
            return res.status(404).json({message: 'User not Found'})
        }

        const addresses = user.addresses
        res.status(200).json({addresses})

    } catch (error) {
        console.log('line 210 UserId ---> ')
        res.status(500).json({message: 'Error while retrieving the Address'})
    }
})

// end point for storing the placed orders ......

app.post('/orders', async(req, res) => {
    try {

        const{userId, cartItems, totalPrice, shippingAddress, paymentMethod} = req.body;

        const user = await User.findById(userId)
        // console.log('Order about to save 228 ....')

        if(!user) {
            return res.status(500).json({message:'Error : User not found'})
        }

        // creating Array of product objects from the cat Items
        // console.log('Order about to save 234 ....')
        const products = cartItems?.map((item) => ({
            name: item?.title,
            image: item?.image,
            price: item?.price,
            quantity: item?.quantity
        }))
        // console.log('Order about to save 241 ....')
        const order = new Order({
            user:userId,
            products:products,
            totalPrice:totalPrice,
            paymentMethod:paymentMethod,
            shippingAddress: shippingAddress
        })
        // console.log('Order about to save ....')
        await order.save()
        // console.log('Orders to saved .... : 🔥🔥🔥🔥 : ', order)
        res.status(200).json({message:'Order Place Successfully'})

    } catch (error) {
        console.log('Error in index.js storing orders : ', error)
        res.status(500).json({message:'Error while Placing Order'})
    }
})

// end point for getting profile of the current USER .......

app.get('/profile/:userId', async(req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)

        if(!user) {
            return res.status(500).json({message:'Error : User not found'})
        }
        res.status(200).json({user})

    } catch (error) {
        console.log('Error in index.js while getting user data : ', error)
        res.status(500).json({message:'Error while getting user data'})
    }
})

// end point for getting the orders from the server .......

app.get('/order/:userId', async(req, res) => {
    try {

        const userId = req.params.userId

        const orders = await Order.find({user:userId}).populate('user')

        if(!orders || orders.length == 0) {
            return res.status(400).json({message:'No orders found'})
        }

        res.status(200).json({orders})
        
    } catch (error) {
        console.log('Error in index.js getting orders : ', error)
        res.status(500).json({message:'Error while getting Order'})
    }
})