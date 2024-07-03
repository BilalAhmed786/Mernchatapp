const LocalStrategy = require('passport-local').Strategy;
const users = require('../schema/userschema')
const bcrypt = require('bcryptjs');
// Passport configuration


module.exports = function (passport) {

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    
        users.findOne({ email:email })

            .then(user => {

                if (!user) {

                    
                    return done(null, false,{message:'invalid email password'})

                   
                }

              

                bcrypt.compare(password, user.password, (err, res) => {
                    
                    if (err){
                        console.log(err)
                    }
                   

                    if (res) {

                       
                        return done(null, user);
                    } 
                    else {

                        return done(null, false,{message:'invalid email password'});
                    }

                    
                });
               
               
            })
            .catch(err => console.log(err))

    })

    );


    passport.serializeUser((user, done) => {
    
            done(null, user.id);
    });

   
    passport.deserializeUser((id, done) => {
       
        users.findByIdAndUpdate(id,{status:'online'})
            .then(user => {
            
                if (!user) {
                    return done(null, false);
                }
                    
                   
                    return done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    });


}