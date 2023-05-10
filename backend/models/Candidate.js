const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email']
    },
    quizAssigned: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz'
        },
        assignedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    quizTaken: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz'
        },
        answers: [
          {
            questionId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Quiz.questions'
            },
            answer: {
              type: String,
              required: [true, 'Please add an answer']
            }
          }        
        ],
        score: {
          type: Number,
          default: 0
        },
        takenAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: true
    }
  },
  {
    database: "software-quiz",
    collection: "candidates"
  }
);

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;
