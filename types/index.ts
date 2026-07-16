// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.
 
export interface User {
  id:       number;
  name:     string;
  email:    string;
  role:     "student" | "admin" | "instructor"; // only these values
  isActive: boolean;
}
 
export interface Course {
  code:     string;
  title:    string;
  units:    number;
  semester: string;
}
 
export interface Submission {
  id:          number;
  studentId:   number;
  courseCode:  string;
  repoUrl:     string;
  submittedAt: Date;
  score?:      number;  // ? means this field is optional
}