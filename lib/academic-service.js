"use client";

// Keys for LocalStorage
const STORAGE_KEYS = {
    GROUPS: 'aulaPlan_groups',
    STUDENTS: 'aulaPlan_students',
    ATTENDANCE: 'aulaPlan_attendance'
};

// Mock Initial Data
const INITIAL_GROUPS = [
    { id: 'g1', name: '10-1', section: '10-1', year: '2025', subject: 'Desarrollo Web', students: ['s1', 's2', 's3', 's4'] },
    { id: 'g2', name: '11-2', section: '11-2', year: '2025', subject: 'Diseño de Software', students: ['s5', 's6'] },
    { id: 'g3', name: '4-A', section: '4-A', year: '2025', subject: 'Matemáticas', students: [] },
    { id: 'g4', name: 'Materno', section: 'Materno-1', year: '2025', subject: 'Preescolar', students: [] },
];

const INITIAL_STUDENTS = [
    { id: 's1', name: 'Ana Sofía Vargas', identifier: '1-1111-1111', needs: ['Adecuación No Sig.'] },
    { id: 's2', name: 'Carlos Monge', identifier: '2-2222-2222', needs: [] },
    { id: 's3', name: 'Elena Rojas', identifier: '3-3333-3333', needs: ['Talento Alta Dotación'] },
    { id: 's4', name: 'David Smith', identifier: '4-4444-4444', needs: [] },
    { id: 's5', name: 'Valeria Jiménez', identifier: '5-5555-5555', needs: [] },
    { id: 's6', name: 'José Pablo Mora', identifier: '6-6666-6666', needs: ['Visual'] },
];

class AcademicService {
    constructor() {
        if (typeof window !== 'undefined') {
            this.init();
        }
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEYS.GROUPS)) {
            localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(INITIAL_GROUPS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
            localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
            localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify([]));
        }
    }

    // --- GROUPS ---
    getGroups() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.GROUPS) || '[]');
    }

    getGroup(id) {
        const groups = this.getGroups();
        return groups.find(g => g.id === id);
    }

    createGroup(group) {
        const groups = this.getGroups();
        const newGroup = { ...group, id: Date.now().toString(), students: [] };
        groups.push(newGroup);
        localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
        return newGroup;
    }

    updateGroup(id, updates) {
        const groups = this.getGroups();
        const index = groups.findIndex(g => g.id === id);
        if (index !== -1) {
            groups[index] = { ...groups[index], ...updates };
            localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
            return groups[index];
        }
        return null;
    }

    deleteGroup(id) {
        let groups = this.getGroups();
        groups = groups.filter(g => g.id !== id);
        localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    }

    // --- STUDENTS ---
    getStudents(ids = null) {
        const allStudents = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || '[]');
        if (ids) {
            return allStudents.filter(s => ids.includes(s.id));
        }
        return allStudents;
    }

    getStudent(id) {
        const students = this.getStudents();
        return students.find(s => s.id === id);
    }

    addStudentToGroup(groupId, studentData) {
        // 1. Create Student
        const students = this.getStudents();
        const newStudent = { ...studentData, id: Date.now().toString() };
        students.push(newStudent);
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));

        // 2. Link to Group
        const group = this.getGroup(groupId);
        if (group) {
            if (!group.students) group.students = [];
            group.students.push(newStudent.id);
            this.updateGroup(groupId, { students: group.students });
        }
        return newStudent;
    }

    removeStudentFromGroup(groupId, studentId) {
        // We only unlink, we don't delete the student entity (referenced elsewhere maybe)
        // For this simple app, we can just unlink.
        const group = this.getGroup(groupId);
        if (group) {
            group.students = group.students.filter(id => id !== studentId);
            this.updateGroup(groupId, { students: group.students });
        }
    }

    updateStudent(id, updates) {
        const students = this.getStudents();
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updates };
            localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
            return students[index];
        }
        return null;
    }

    // --- ATTENDANCE ---
    saveAttendance(groupId, date, records) {
        // records: [{ studentId: 's1', status: 'present', note: '' }]
        const allAttendance = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]');

        // Remove existing record for this group/date to overwrite
        const filtered = allAttendance.filter(a => !(a.groupId === groupId && a.date === date));

        const newRecord = {
            id: Date.now().toString(),
            groupId,
            date,
            timestamp: new Date().toISOString(),
            records
        };

        filtered.push(newRecord);
        localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(filtered));
        return newRecord;
    }

    getAttendance(groupId, date) {
        const allAttendance = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]');
        return allAttendance.find(a => a.groupId === groupId && a.date === date);
    }

    getGroupStats(groupId) {
        const group = this.getGroup(groupId);
        if (!group) return { attendance: 0 };

        const allAttendance = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]');
        const groupRecords = allAttendance.filter(a => a.groupId === groupId);

        if (groupRecords.length === 0) return { attendance: 0 };

        let totalPossible = 0;
        let totalPresent = 0;

        groupRecords.forEach(day => {
            day.records.forEach(r => {
                totalPossible++;
                if (r.status === 'present' || r.status === 'tardy') {
                    totalPresent++;
                }
            });
        });

        return {
            attendance: totalPossible === 0 ? 0 : Math.round((totalPresent / totalPossible) * 100)
        };
    }
}

export const academicService = new AcademicService();
