const express = require('express');
const router = express.Router();
const Prayer = require('../models/Prayer');
const authMiddleware = require('../middleware/auth');

// Get all prayers (public)
router.get('/', async (req, res) => {
    try {
        const prayers = await Prayer.find({ isActive: true })
            .sort({ category: 1, order: 1 })
            .select('-__v');
        
        res.json({
            success: true,
            count: prayers.length,
            data: prayers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching prayers',
            error: error.message
        });
    }
});

// Get single prayer by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const prayer = await Prayer.findById(req.params.id);
        
        if (!prayer) {
            return res.status(404).json({
                success: false,
                message: 'Prayer not found'
            });
        }
        
        res.json({
            success: true,
            data: prayer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching prayer',
            error: error.message
        });
    }
});

// Create new prayer (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, category, hebrew, transliteration, translation, order } = req.body;
        
        const prayer = new Prayer({
            title,
            category,
            hebrew,
            transliteration,
            translation,
            order: order || 0
        });
        
        await prayer.save();
        
        res.status(201).json({
            success: true,
            message: 'Prayer created successfully',
            data: prayer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating prayer',
            error: error.message
        });
    }
});

// Update prayer (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, category, hebrew, transliteration, translation, order, isActive } = req.body;
        
        const prayer = await Prayer.findByIdAndUpdate(
            req.params.id,
            {
                title,
                category,
                hebrew,
                transliteration,
                translation,
                order,
                isActive
            },
            { new: true, runValidators: true }
        );
        
        if (!prayer) {
            return res.status(404).json({
                success: false,
                message: 'Prayer not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Prayer updated successfully',
            data: prayer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating prayer',
            error: error.message
        });
    }
});

// Delete prayer (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const prayer = await Prayer.findByIdAndDelete(req.params.id);
        
        if (!prayer) {
            return res.status(404).json({
                success: false,
                message: 'Prayer not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Prayer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting prayer',
            error: error.message
        });
    }
});

module.exports = router;

