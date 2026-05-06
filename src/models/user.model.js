const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true ,
        lowercase:true,
        trim:true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    },
    name :{
        type:String,
        required:true   
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:18,
        select:false
    }
}, { timestamps: true })

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return;
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    }catch(err){
        throw err;
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}   

const user = mongoose.model('User',userSchema);

module.exports = user;  
