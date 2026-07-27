const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
{
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },

    trainer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    gamePin:{
        type:String,
        required:true,
        unique:true
    },

    status:{
        type:String,
        enum:["waiting","live","completed"],
        default:"waiting"
    },

    waitingStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    approvedStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    currentQuestionIndex:{
        type:Number,
        default:0
    },

    currentQuestionStartTime:{
        type:Date
    },

    startedAt:Date,

    endedAt:Date

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Session",sessionSchema);