import {Profile} from '../models/profile.model.js';
import {Project} from '../models/project.model.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiErr} from '../utils/ApiErr.js';
import {ApiResponse} from '../utils/ApiResponse.js';

// Search across profile data
const searchProfileData = asyncHandler(async (req, res) => {
  try {
    const { q } = req.query
    if (!q) return res.json([])

    // Search in profile name, skills, education, work, projects
    const profile = await Profile.findOne({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { skills: { $regex: q, $options: 'i' } },
        { education: { $regex: q, $options: 'i' } },
        { 'work.role': { $regex: q, $options: 'i' } },
        { 'work.company': { $regex: q, $options: 'i' } },
      ]
    }).populate('projects')

    // Search projects separately
    const projects = await Project.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { skills: { $regex: q, $options: 'i' } },
      ]
    })

    return res.json(
      new ApiResponse({ profile, projects })
    )
  } catch (err) {
    throw new ApiErr(500, 'Search failed')
  }
})

export {
    searchProfileData
}