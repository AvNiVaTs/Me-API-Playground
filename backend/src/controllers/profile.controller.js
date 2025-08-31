import {Profile} from '../models/profile.model.js';
import {asyncHandler} from '../models/asyncHandler.js';
import {ApiErr} from '../models/apiErr.model.js';
import {ApiResponse} from '../models/apiResponse.model.js';

// Create Profile
const createProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.create(req.body)
    return res
    .status(201)
    .json(
      new ApiResponse(201, 'Profile created', profile)
    )
  } catch (err) {
    throw new ApiErr(400, 'Profile creation failed')
  }
})

// Get Profile
const getProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne()
      .populate('projects')
    if (!profile) return res.status(404).json({ error: 'Profile not found' })
    return res.json(
      new ApiResponse(profile)
    )
  } catch (err) {
    throw new ApiErr(500, 'Failed to fetch profile')
  }
})

// Update Profile
const updateProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true })
    if (!profile) return res.status(404).json({ error: 'Profile not found' })
    res.json(
      new ApiResponse(profile)
    )
  } catch (err) {
    throw new ApiErr(400, 'Profile update failed')
  }
})

export {
    createProfile,
    getProfile,
    updateProfile
}