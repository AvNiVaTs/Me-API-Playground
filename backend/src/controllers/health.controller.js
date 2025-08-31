import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiErr} from '../utils/ApiErr.js';
import {ApiResponse} from '../utils/ApiResponse.js';

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