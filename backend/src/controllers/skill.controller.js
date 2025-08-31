import {Skill} from '../models/skill.model';
import {asyncHandler} from '../models/asyncHandler.js';
import {ApiErr} from '../models/apiErr.model.js';
import {ApiResponse} from '../models/apiResponse.model.js';

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