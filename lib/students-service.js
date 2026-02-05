import { academicService } from "./academic-service";

/**
 * Students Service - Bridge
 */
export async function getStudents(ids = null) {
  return academicService.getStudents(ids);
}

export async function seedStudentsIfEmpty() {
  // Current academicService.init() already handles basic seeding in localStorage
  return true;
}

export async function addStudent(groupId, studentData) {
  return academicService.addStudentToGroup(groupId, studentData);
}
