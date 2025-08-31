import mongoose from 'mongoose';

// Project schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  links: {
    github: String,
    live: String,
    demo: String,
  },
  skills: [{ type: String }], // or [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
})

export const Project = mongoose.model('Project', ProjectSchema)