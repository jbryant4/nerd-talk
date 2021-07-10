const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'email is required',
            trim: true,
            match: /.+\@.+\..+/
        },
        thoughts:[{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }], 
        friends:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

model.exports = User;