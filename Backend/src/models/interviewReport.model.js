const mongoose = require('mongoose');
/**
 * -job description: The job description for the interview report.
 * -resume text: The resume text for the interview report.
 * -self description: The self description for the interview report.
 * 
 * -technical questions: The technical questions for the interview report.
 * -behavioral questions: [{
 * question:"",
 * intention:"",
 * answer:"",
 * }]The behavioral questions for the interview report.
 * -skill gaps: [{
 * skill:""
,
severity:"",
type:string,
enum:["low","medium","high"] * }]The skill gaps for the interview report.    
 * preparation plan
 * [{
 * day:number,
 * focus:string,
 * tasks=[string]
 * }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
   
},{
    _id: false
});


const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
},{
    _id: false
});

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    },
},{
    _id: false
});

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    focus: {
        type: String,
        required: true
    },
    tasks: [{
        type: String,
        required: true
    }]
},{
    _id: false
});

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resumeText: {
        type: String,
       
    },
    selfDescription: {
        type: String,
      
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]
},{
   timestamps: true 
});


const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = interviewReportModel;