const jwt = require('jsonwebtoken')
const authorModel = require("../Models/authorModel")

const loginUser = async function (req, res) {
    let userName = req.body.email;
    let password = req.body.password; 
    //validate above both also
    console.log(req.body)
    let user = await authorModel.findOne({ email: userName, password: password });
    console.log(user)
    if (!user)
        return res.send({
            status: false,
            msg: "username or the password is not corerct",
        });

    let token = jwt.sign(
        {
            ObjectId: user._id

        },
        "Group-15-Project_1"
    );
    return res.status(200).send({ status: true, token: token });
};
// const getloging = async function(req,res){

//  let email = req.params.email;
//   let userDetails = await authorModel.findById(email);
//   if (!userDetails)
//     return res.send({ status: false, msg: "No such user exists" });

//   res.send({ status: true, data: userDetails });
// };
module.exports.loginUser = loginUser
// module.exports.getloging=getloging