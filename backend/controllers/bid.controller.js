import mongoose from 'mongoose';
import Bid from '../models/Bid.model.js';
import Gig from '../models/Gig.model.js';

export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This gig is no longer open for bidding'
      });
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot bid on your own gig'
      });
    }

    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id
    });

    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: 'You have already bid on this gig'
      });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price
    });

    const populatedBid = await Bid.findById(bid._id)
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title description budget');

    res.status(201).json({
      success: true,
      data: populatedBid
    });
  } catch (error) {
    console.error('Create bid error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    // Check if gig exists
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Check if user is the gig owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view bids for this gig'
      });
    }

    const bids = await Bid.find({ gigId })
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title description budget')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids
    });
  } catch (error) {
    console.error('Get bids error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title description budget status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids
    });
  } catch (error) {
    console.error('Get my bids error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    await session.startTransaction();

    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Bid not found'
      });
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: 'Not authorized to hire for this gig'
      });
    }

    if (gig.status !== 'open') {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'This gig has already been assigned'
      });
    }

    gig.status = 'assigned';
    gig.assignedTo = bid.freelancerId;
    await gig.save({ session });

    bid.status = 'hired';
    await bid.save({ session });

    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bidId },
        status: 'pending'
      },
      { status: 'rejected' },
      { session }
    );

    await session.commitTransaction();

    const hiredBid = await Bid.findById(bidId)
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title description budget status');

    const io = req.app.get('io');
    if (io) {
      io.to(bid.freelancerId.toString()).emit('hired', {
        message: `You have been hired for "${gig.title}"!`,
        gigId: gig._id,
        gigTitle: gig.title,
        bidId: bid._id
      });
    }

    res.status(200).json({
      success: true,
      message: 'Freelancer hired successfully',
      data: hiredBid
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Hire bid error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  } finally {
    session.endSession();
  }
};
