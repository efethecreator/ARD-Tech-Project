import { Router } from 'express';
import CaseController from '../controllers/caseController';

const router = Router();

router.post('/', CaseController.createCase);
router.get('/', CaseController.getAllCases);
router.get('/:id', CaseController.getCaseById);
router.put('/:id', CaseController.updateCase);
router.delete('/:id', CaseController.deleteCase);

export default router;
