import { Project } from '../models/project.model.js';
import { Profile } from '../models/profile.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const searchAll = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const query = new RegExp(q, 'i');

  const profile = await Profile.findOne({
    $or: [
      { name: query },
      { headline: query },
      { summary: query },
      { location: query },
      { 'links.github': query },
      { 'links.linkedin': query },
      { 'links.portfolio': query },
      { 'links.website': query },
      { skills: { $in: [query] } },
    ],
  }).lean();

  const projects = await Project.find({
    $or: [
      { title: query },
      { description: query },
      { skills: { $in: [query] } },
    ],
  }).lean();

  const allSkills = new Set();
  projects.forEach((p) => {
    p.skills?.forEach((s) => allSkills.add(s));
  });

  const matchingSkills = [...allSkills].filter((s) => s.match(query));

  res.status(200).json(new ApiResponse(200, {
    profile: profile || null,
    projects,
    skills: matchingSkills,
  }));
});