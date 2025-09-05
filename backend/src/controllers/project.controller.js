import { Project } from '../models/project.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getProjects = asyncHandler(async (req, res) => {
  const { skill } = req.query;
  let projects;

  if (skill) {
    projects = await Project.find({ skills: { $in: [new RegExp(skill, 'i')] } }).lean();
  } else {
    projects = await Project.find({}).lean();
  }

  res.status(200).json(new ApiResponse(200, projects));
});

export const createProject = asyncHandler(async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(new ApiResponse(201, newProject));
});