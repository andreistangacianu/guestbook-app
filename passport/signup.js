var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done){
            findOrCreateUser = function() {
                //find a user in Mongo with provided username
                User.findOne({'username' : username}, function(err, user){
                    //in case of any error return
                    if(err) return done(err);
                    //in case the user already exists
                    if(user) {
                        console.log('User already exists');
                        return done(null, false, req.flash('message', 'user already exists!'));
                    } else {
                        // if there is no user with that email, create the user
                        var newUser = new User();
                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        //save the user
                        newUser.save(function(err){
                            if(err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User has been successfully saved!');
                            return done(null, newUser);
                        });
                    }
                });
            };

            // Delay the execution of findOrCreateUser and execute
            // the method in the next tick of the event loop
            process.nextTick(findOrCreateUser);
    }));


    // Generates hash using bCrypt
    var createHash = function(password){
     return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
}
