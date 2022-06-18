import User from '../.././../models/user'
import  bcrypt from 'bcrypt'
import dbConnect from '../../../utils/dbConnect'

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case "POST": 
        try {
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).json('user not found')
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json('wrong password')
        res.status(200).json(user)
        } catch (error) {
        res.status(500).json(error)
        }
        break;
        default:
        res.status(500).json(error)
    }
} 