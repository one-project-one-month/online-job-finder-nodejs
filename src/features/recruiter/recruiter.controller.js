import { statusCode } from '../../errors/statusCode';
// import { authUser, changePassword, loginUser, registerUser } from '../auth/auth.service';
import { getRecruiters } from './recruiter.service';

export const getRecruiterController = async (req, res) => {
  try {
    const recruiters = await getRecruiters();
    res.status(statusCode.SUCCESS).json({ status: "success", data: recruiters });
  } catch (error) {
    res.status(statusCode.BAD_REQUEST).json({ status: "error", error: error.message });
  }
}