import { savePlanAction, getMyPlansAction } from '@/app/actions/plans';

/**
 * Plans Service - Legacy Bridge
 * Connects frontend components to new Server Actions.
 */
export async function savePlan(planData) {
    return await savePlanAction(planData);
}

export async function getPlans(userId, institutionId) {
    // In V48 we use the server action which already has session context
    return await getMyPlansAction();
}

export async function getPlanById(id) {
    // Basic placeholder for now, ideally matched with a server action
    return null;
}

export async function deletePlan(id) {
    // Placeholder
    return true;
}
