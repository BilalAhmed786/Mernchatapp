const User = require('../schema/userschema')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



const registration = async (req, res) => {
    const { username, email, password, retypepassword } = req.body


    try {


        //all fields should be filled
        if (!username || !email || !password || !retypepassword) {


            return res.json({ msg: "All fields required" });

        }

        //passwords shoulf be same

        if (password != retypepassword) {


            return res.json({ msg: "passwords are not matched" })


        }


        const finduser = await User.findOne({ email: email })



        if (finduser) {


            return res.json({ msg: "email already in use" })
        }



        const hashedpassword = await bcrypt.hash(password, 8);


        const newUser = new User({ username, email, password: hashedpassword, retypepassword: hashedpassword });

        const usersave = await newUser.save();

        if (usersave) {

            return res.json({ msg: "User registered successfully" });
        }

    }

    catch (err) {
        if (err) {
            console.log(err)
        }
    }



}


const Alluser = async (req, res) => {

    const { name, userid } = req.query;

    try {
        const query = {


            $or: [

                { username: { $regex: new RegExp(name, 'i') } },
                { status: { $regex: new RegExp(name, 'i') } },

            ]



        };

        const totalUsers = await User.countDocuments(query);

        const Users = await User.find(query, { password: 0, retypepassword: 0 }).sort({ username: 1 }).where({ _id: { $ne: userid } });


        res.json({
            Users,
            totalUsers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


//success login only redirect to dashboard

const login = (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/api/success', //authorize user redirect where u want 
        failureRedirect: '/api/validation',//set api for validaiton
        failureFlash: true


    })(req, res, next)

};


const logout = async (req, res, next) => {
    if (req.user === undefined) {
        return res.json('already logged out');
    }

    if (req.user && req.user._id) {
        try {
            const userId = req.user._id.toString();

            // Update user status to 'offline'
            const updateUser = await User.findByIdAndUpdate(userId, { status: 'offline' });

            if (updateUser) {
                req.logout((err) => {
                    if (err) {
                        console.error('Error during logout:', err);
                        return next(err);
                    }

                         req.session && req.session.destroy((err) => {
                        if (err) {
                            console.error('Error during session destruction:', err);
                            return next(err);
                        }

                        res.clearCookie('connect.sid'); // Clear the cookie manually
                        res.json({ msg: 'Logout success' });
                    })
                });
            } else {
                res.status(500).json({ error: 'Failed to update user status' });
            }
        } catch (err) {
            console.error('Error during logout:', err);
            next(err);
        }
    } else {
        res.status(400).json({ error: 'Invalid user or already logged out' });
    }
};




const forgetpass = async (req, res) => {

    const email = req.body.email

    if (!email) {


        return res.json({ valid: 'field is required' })

    }

    const user = await User.findOne({ email: email })

    if (!user) {

        return res.json({ valid: 'you are not registerd' })
    }

    const token = jwt.sign({
        userid: user._id,
        useremail: user.email
    }, process.env.Secrettoken, { expiresIn: '5m' })


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    });

    const mailOptions = {
        from: process.env.Email,
        to: email,
        subject: 'SaifChat(change password)',
        text: `http://localhost:5173/resetpassword/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {

            console.log('Email sent: ' + info.response);
            return res.json({ success: 'Email sent successfully' })
        }
    });


}


const resetpass = async (req, res) => {

    const { newPassword, confirmPassword, token } = req.body

   

    if (!newPassword || !confirmPassword) {

        return res.json({ validate: 'All fields required' })
    }

    if (newPassword !== confirmPassword) {

        return res.json({ validate: 'Passwords are Mismatch' })
    }


    jwt.verify(token, process.env.Secrettoken, async (err, decoded) => {
        if (err) {

            return res.json({ validate: 'Session expired try again' })

        } else {

            const hashedpassword = await bcrypt.hash(newPassword, 8);

            if (hashedpassword) {

                const updateuser = await User.findByIdAndUpdate(decoded.userid, { password: hashedpassword , retypepassword: hashedpassword})

                return res.json({ success: 'Password reset successfully' })
            }



        }


    });





}

const validate = (req, res) => {

  const errorMessage = req.flash('error')[0];

    if (errorMessage === 'Missing credentials') {

        res.json({ msg: 'All fields required' })
    } else {

        res.json({ msg: errorMessage })
    }

}



const success = async (req, res) => {
    if (req.user) {
        
        res.json(req.user)
    } else {
        
        res.json({msg:'invalid user'})
    }
}



module.exports = { registration, Alluser, login, logout, forgetpass, resetpass, validate, success }
