import {Project} from '../models/project.model.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiErr} from '../utils/ApiErr.js';
import {ApiResponse} from '../utils/ApiResponse.js';

// Create Project
const createProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.create(req.body)
    return res
    .status(201)
    .json(
      new ApiResponse(project)
    )
  } catch (err) {
    throw new ApiErr(400, 'Project creation failed')
  }
})

// Get Projects (optionally filter by skill)
const getProjects = asyncHandler(async (req, res) => {
  try {
    const { skill } = req.query
    const filter = skill ? { skills: skill } : {}
    const projects = await Project.find(filter)
    return res.json(
      new ApiResponse(projects)
    )
  } catch (err) {
    res.status(500).json({ error: err.message })
    throw new ApiErr(500, 'Failed to fetch projects')
  }
})

// Get Project by ID
const getProjectById = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    return res.json(
      new ApiResponse(project)
    )
  } catch (err) {
    throw new ApiErr(500, 'Failed to fetch project')
  }
})

// Update Project
const updateProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    return res.json(
      new ApiResponse(project)
    )
  } catch (err) {
    throw new ApiErr(400, 'Project update failed')
  }
})

export {
    createProject,
    getProjects,
    getProjectById,
    updateProject
}