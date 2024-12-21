import { Router } from 'express';
import ViolationController from '../controllers/violationController';
import multer from "../middleware/aws3middleware";


const router = Router();

router.post("/", multer.single("file"), ViolationController.createViolation);
router.post('/', ViolationController.createViolation);
router.get('/', ViolationController.getViolations);
router.get('/:id', ViolationController.getViolationById);
router.put('/:id', ViolationController.updateViolation);
router.delete('/:id', ViolationController.deleteViolation);

export default router;