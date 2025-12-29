const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Prayer title is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Morning', 'Evening', 'Shabbat', 'Holidays', 'Blessings'],
        default: 'Blessings'
    },
    hebrew: {
        type: String,
        required: [true, 'Hebrew text is required'],
        trim: true
    },
    transliteration: {
        type: String,
        trim: true,
        default: ''
    },
    translation: {
        type: String,
        required: [true, 'English translation is required'],
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
prayerSchema.index({ category: 1, order: 1 });
prayerSchema.index({ isActive: 1 });

module.exports = mongoose.model('Prayer', prayerSchema);

