const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    courses: [{  // ✅ Changed 'course' to 'courses' and made it an array
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});

module.exports = mongoose.model("Tag", TagSchema);
