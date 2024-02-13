const mongoose = require('mongoose');
const { momentTimeStampPlugin } = require("../plugin/plugin.js");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store'
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true, 
        },
        category: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Number,
        },
        updatedAt: {
            type: Number,
        }
    }
);
schema.plugin(momentTimeStampPlugin, {});

const Product = mongoose.model('Product', schema);

module.exports = Product;
