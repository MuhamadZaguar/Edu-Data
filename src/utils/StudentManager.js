class StudentManager {
  constructor(students = []) {
    this.students = [...students];
  }

  addStudent(student) {
    return [student, ...this.students];
  }

  updateStudent(updatedStudent) {
    return this.students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
  }

  deleteStudent(id) {
    return this.students.filter((student) => student.id !== id);
  }

  getTopStudents(limit = 10) {
    return [...this.students].sort((a, b) => b.nilai - a.nilai).slice(0, limit);
  }
}

export default StudentManager;

