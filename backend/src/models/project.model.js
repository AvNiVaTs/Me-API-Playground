import mongoose from 'mongoose';

// Project schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startMonth: String,
  startYear: String,
  endMonth: String,
  endYear: String,
  links: {
    demo: String,
    repo: String,
  },
  skills: [{ type: String }],
});

export const Project = mongoose.model('Project', ProjectSchema);