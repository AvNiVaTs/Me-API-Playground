import mongoose from 'mongoose';

// Skill schema
const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }, // for top skills
})

export const Skill = mongoose.model('Skill', SkillSchema)