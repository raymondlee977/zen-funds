import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  getAccountGroups,
  getAccountGroup,
  createAccountGroup,
  updateAccountGroup,
  deleteAccountGroup,
} from "../controllers/accountGroupController.js";

const router = Router();

router.use(requireAuth);

router.get('/' , getAccountGroups);
router.get('/:id', getAccountGroup);
router.post('/', createAccountGroup);
router.patch('/:id', updateAccountGroup);
router.delete('/:id', deleteAccountGroup);

export default router;