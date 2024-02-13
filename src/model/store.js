const mongoose = require('mongoose');
const { momentTimeStampPlugin } = require("../plugin/plugin.js");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }
);
schema.plugin(momentTimeStampPlugin, {});
const Store = mongoose.model('Store', schema);

module.exports = Store;
