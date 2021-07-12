const { Schema, Types, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type: String,
            require: 'reactionBody is required',
            maxLength: 280
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //dont forget to add this in the utis folder JOEY!!!!!!
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

module.exports = ReactionSchema