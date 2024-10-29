import authModel from "../../../model/authModel";
import { hashingPassword } from "../../../utils/helper";

const onCreate_Users = async(body: any) => {

    // default profile picture for male and female
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${body.userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${body.userName}`;
    
    const isUserAlreadyExist = await authModel.findOne({userName: body.userName});
    if(isUserAlreadyExist) {
        throw new Error("Username is already exists, please give different user id");
    }
    // check whether both the password and confirm password match validation
    if(body.password !== body.confirmPassword) {
        throw new Error("Both password and confirm password should match");
    }
    // hash the password using bcrpt package
    const saltRound = 10;
    const hashPassword = {
        ...body,
        password: await hashingPassword(body.password, saltRound),
        confirmPassword: await hashingPassword(body.confirmPassword, saltRound),
    }
    const signupUser = new authModel(hashPassword);

    if(!signupUser) {
        throw new Error("Invalid input");
    }

    const saveUsers = await signupUser.save();
    return saveUsers;
};

export = {
    onCreate_Users
};