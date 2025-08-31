import mongoose from 'mongoose';

// Health schema
const HealthSchema = new mongoose.Schema({
  status: { type: String, required: true },
})

export const Health = mongoose.model('Health', HealthSchema)