import {asyncHandler} from '../models/asyncHandler.js';
import {ApiErr} from '../models/apiErr.model.js';
import {ApiResponse} from '../models/apiResponse.model.js';

const getHealth = asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json(
    new ApiResponse('API is healthy')
  )
})

export {
  getHealth
}