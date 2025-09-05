import { Profile } from '../models/profile.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiErr } from '../utils/ApiErr.js';

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({});
  if (!profile) {
    throw new ApiErr(404, 'Profile not found');
  }
  res.status(200).json(new ApiResponse(200, profile));
});

export const createProfile = asyncHandler(async (req, res) => {
  const existingProfile = await Profile.findOne({});
  if (existingProfile) {
    throw new ApiErr(409, 'Profile already exists');
  }

  const newProfile = new Profile(req.body);
  await newProfile.save();
  res.status(201).json(new ApiResponse(201, newProfile));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.status(200).json(new ApiResponse(200, profile));
});

export const deleteProfile = asyncHandler(async (req, res) => {
  const result = await Profile.findOneAndDelete({});
  if (!result) {
    throw new ApiErr(404, 'Profile not found');
  }
  res.status(200).json(new ApiResponse(200, { message: 'Profile deleted successfully' }));
});