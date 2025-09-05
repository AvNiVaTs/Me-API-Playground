import { Health } from '../models/health.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getHealth = asyncHandler(async (req, res) => {
  const healthStatus = await Health.findOne({});
  if (healthStatus) {
    return res.status(200).json(new ApiResponse(200, { status: healthStatus.status }));
  }
  
  const newHealth = new Health({ status: 'OK' });
  await newHealth.save();
  res.status(200).json(new ApiResponse(200, { status: 'OK' }));
});