const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const customerSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: 'Please supply a name',
            trim: true
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: 'Please Supply an email address'
        }

    },
);

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);