import mongoose from 'mongoose';

// Work history for Profile
const WorkSchema = new mongoose.Schema({
  role: String,
  company: String,
  from: String,
  to: String,
}, { _id: false })

// Social/portfolio links for Profile
const LinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String,
}, { _id: false })

// Profile schema
const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: [String],
  skills: [{ type: String }], // or [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  work: [WorkSchema],
  links: LinksSchema,
})

export const Profile = mongoose.model('Profile', ProfileSchema)