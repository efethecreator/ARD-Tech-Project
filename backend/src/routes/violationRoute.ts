import { Router } from 'express';
import ViolationController from '../controllers/violationController';

const router = Router();

router.post('/', ViolationController.createViolation);
router.get('/', ViolationController.getViolations);
router.get('/:id', ViolationController.getViolationById);
router.put('/:id', ViolationController.updateViolation);
router.delete('/:id', ViolationController.deleteViolation);

export default router;