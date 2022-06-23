import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'email.sendVerification'(){
        console.log(`sent verification email to ${this.userId}`);
        //Accounts.sendVerificationEmail(this.userId)
    },
    'email.checkExistence'(email){
        return !Accounts.findUserByEmail(email)
    },
    'email.sendResetPassword'(email){
        let user = Accounts.findUserByEmail(email);

        console.log(`sent reset password email to ${user._id}`);

        //Accounts.sendResetPasswordEmail(user._id);
    },
});