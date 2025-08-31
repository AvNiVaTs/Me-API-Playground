import {Profile} from '../models/profile.model.js';
import { Skill } from '../models/skills.model.js'
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiErr} from '../utils/ApiErr.js';
import {ApiResponse} from '../utils/ApiResponse.js';

// Create Profile
const createProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.create(req.body)

    // Add or update skills in Skill collection
    if (req.body.skills && Array.isArray(req.body.skills)) {
      for (const skillName of req.body.skills) {
        await Skill.updateOne(
          { name: skillName },
          { $inc: { count: 1 } },
          { upsert: true }
        )
      }
    }

    return res
      .status(201)
      .json(new ApiResponse(201, 'Profile created', profile))
  } catch (err) {
    console.error('Profile creation error:', err)
    throw new ApiErr(400, 'Profile creation failed')
  }
})

// Get Profile
const getProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne()
      .populate('projects')
    if (!profile) return res.status(404).json({ error: 'Profile not found' })
    return res
    .status(200)
    .json(
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

    // Add or update skills in Skill collection
    if (req.body.skills && Array.isArray(req.body.skills)) {
      for (const skillName of req.body.skills) {
        await Skill.updateOne(
          { name: skillName },
          { $inc: { count: 1 } },
          { upsert: true }
        )
      }
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'Profile updated', profile))
  } catch (err) {
    console.error('Profile update error:', err)
    throw new ApiErr(400, 'Profile update failed')
  }
})

export {
    createProfile,
    getProfile,
    updateProfile
}