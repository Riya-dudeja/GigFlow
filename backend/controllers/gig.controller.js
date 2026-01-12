import Gig from '../models/Gig.model.js';

export const getGigs = async (req, res) => {
  try {
    const { search, status } = req.query;
    
    let query = {};
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    if (status) {
      query.status = status;
    }

    const gigs = await Gig.find(query)
      .populate('ownerId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      data: gigs
    });
  } catch (error) {
    console.error('Get gigs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('ownerId', 'name email')
      .populate('assignedTo', 'name email');

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    res.status(200).json({
      success: true,
      data: gig
    });
  } catch (error) {
    console.error('Get gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id
    });

    const populatedGig = await Gig.findById(gig._id)
      .populate('ownerId', 'name email');

    res.status(201).json({
      success: true,
      data: populatedGig
    });
  } catch (error) {
    console.error('Create gig error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Check if user is the owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this gig'
      });
    }

    const { title, description, budget } = req.body;

    gig.title = title || gig.title;
    gig.description = description || gig.description;
    gig.budget = budget || gig.budget;

    await gig.save();

    const updatedGig = await Gig.findById(gig._id)
      .populate('ownerId', 'name email');

    res.status(200).json({
      success: true,
      data: updatedGig
    });
  } catch (error) {
    console.error('Update gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Check if user is the owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this gig'
      });
    }

    await gig.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Gig deleted successfully'
    });
  } catch (error) {
    console.error('Delete gig error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .populate('ownerId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      data: gigs
    });
  } catch (error) {
    console.error('Get my gigs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
