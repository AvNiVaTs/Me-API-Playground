import {Profile} from '../models/profile.model';
import {Project} from '../models/project.model';
import {asyncHandler} from '../models/asyncHandler.js';
import {ApiErr} from '../models/apiErr.model.js';
import {ApiResponse} from '../models/apiResponse.model.js';

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