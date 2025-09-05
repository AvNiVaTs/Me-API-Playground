import { Project } from '../models/project.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getTopSkills = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).lean();
  const allSkills = projects.flatMap((p) => p.skills || []);

  const skillCounts = allSkills.reduce((acc, skill) => {
    const lowerCaseSkill = skill.toLowerCase();
    acc[lowerCaseSkill] = (acc[lowerCaseSkill] || 0) + 1;
    return acc;
  }, {});

  const topSkills = Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill]) => skill);

  res.status(200).json(new ApiResponse(200, topSkills));
});