const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Person', personSchema);