import {Skill} from '../models/skills.model.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiErr} from '../utils/ApiErr.js';
import {ApiResponse} from '../utils/ApiResponse.js';

// Get Top Skills
const getTopSkills = asyncHandler(async (req, res) => {
  try {
    const skills = await Skill.find().sort({ count: -1 }).limit(10)
    return res.json(
      new ApiResponse(skills)
    )
  } catch (err) {
    throw new ApiErr(500, 'Failed to fetch skills')
  }
})

export {
    getTopSkills
}