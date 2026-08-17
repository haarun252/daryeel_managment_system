export type Role = 'superadmin' | 'schooladmin' | 'teacher' | 'parent'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  schoolId?: string
  phone?: string
  status?: 'Active' | 'Inactive'
  lastLogin?: string
}

export const USERS: User[] = [
  { id: 'u1', name: 'Marcus Chen', email: 'superadmin@xanaano.com', role: 'superadmin', phone: '+1 (555) 010-0001', status: 'Active', lastLogin: '2026-08-16 08:12 AM' },
  { id: 'u2', name: 'Sarah Mitchell', email: 'admin@greenvalley.edu', role: 'schooladmin', schoolId: 's1', phone: '+1 (555) 201-4400', status: 'Active', lastLogin: '2026-08-16 07:48 AM' },
  { id: 'u3', name: 'James Okonkwo', email: 'teacher@greenvalley.edu', role: 'teacher', schoolId: 's1', phone: '+1 (555) 201-3001', status: 'Active', lastLogin: '2026-08-16 07:20 AM' },
  { id: 'u4', name: 'Priya Sharma', email: 'parent@greenvalley.edu', role: 'parent', schoolId: 's1', phone: '+1 (555) 100-2001', status: 'Active', lastLogin: '2026-08-15 09:04 PM' },
]

export interface School {
  id: string
  name: string
  admin: string
  students: number
  teachers: number
  plan: 'Basic' | 'Standard' | 'Premium'
  status: 'Active' | 'Inactive' | 'Suspended'
  createdDate: string
  email: string
  phone: string
  address: string
  website?: string
  logo?: string
}

export const SCHOOLS: School[] = [
  { id: 's1', name: 'Green Valley Academy', admin: 'Sarah Mitchell', students: 842, teachers: 48, plan: 'Premium', status: 'Active', createdDate: '2023-03-14', email: 'info@greenvalley.edu', phone: '+1 (555) 201-4400', address: '120 Elm Street, Springfield, IL 62701', website: 'www.greenvalley.edu' },
  { id: 's2', name: 'Sunrise Kindergarten', admin: 'Rosa Martinez', students: 186, teachers: 18, plan: 'Standard', status: 'Active', createdDate: '2023-11-15', email: 'hello@sunrisekg.edu', phone: '+1 (555) 590-2200', address: '77 Sunrise Blvd, Miami, FL 33101', website: 'www.sunrisekg.edu' },
  { id: 's3', name: 'Bright Future School', admin: 'Lisa Tanaka', students: 428, teachers: 31, plan: 'Standard', status: 'Active', createdDate: '2024-01-22', email: 'info@brightfuture.edu', phone: '+1 (555) 774-3300', address: '8 Oak Ave, Austin, TX 78701', website: 'www.brightfuture.edu' },
  { id: 's4', name: 'Al-Noor Academy', admin: 'Ahmed Hassan', students: 1203, teachers: 87, plan: 'Premium', status: 'Active', createdDate: '2022-09-01', email: 'contact@alnoor.edu', phone: '+1 (555) 462-6600', address: '200 Lake Dr, Chicago, IL 60601', website: 'www.alnoor.edu' },
  { id: 's5', name: 'Riverside Primary School', admin: 'David Osei', students: 364, teachers: 22, plan: 'Basic', status: 'Inactive', createdDate: '2023-06-08', email: 'hello@riverside.edu', phone: '+1 (555) 384-9100', address: '45 River Rd, Portland, OR 97201' },
  { id: 's6', name: 'Westfield Academy', admin: 'Brian Thompson', students: 510, teachers: 35, plan: 'Premium', status: 'Active', createdDate: '2023-07-30', email: 'info@westfield.edu', phone: '+1 (555) 113-8800', address: '555 West Ave, Seattle, WA 98101' },
  { id: 's7', name: 'Heritage Christian School', admin: 'Grace Amara', students: 198, teachers: 16, plan: 'Basic', status: 'Suspended', createdDate: '2024-02-10', email: 'contact@heritage.edu', phone: '+1 (555) 667-4400', address: '30 Faith Lane, Dallas, TX 75201' },
]

export interface Student {
  id: string
  name: string
  firstName: string
  middleName?: string
  lastName: string
  studentId: string
  class: string
  section: string
  gender: 'Male' | 'Female'
  dob: string
  nationality: string
  address: string
  parent: string
  phone: string
  email: string
  enrollDate: string
  previousSchool?: string
  academicYear: string
  status: 'Active' | 'Inactive' | 'Transferred'
  attendance: number
  fees: 'Paid' | 'Pending' | 'Overdue'
  avatar?: string
}

export const STUDENTS: Student[] = [
  { id: 'st1', name: 'Ethan Williams', firstName: 'Ethan', lastName: 'Williams', studentId: 'GVA-2024-001', class: 'Grade 7', section: 'A', gender: 'Male', dob: '2012-04-12', nationality: 'United States', address: '14 Maple Drive, Springfield', parent: 'Priya Sharma', phone: '+1 (555) 100-2001', email: 'ethan.w@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Active', attendance: 94, fees: 'Paid' },
  { id: 'st2', name: 'Aisha Johnson', firstName: 'Aisha', lastName: 'Johnson', studentId: 'GVA-2024-002', class: 'Grade 7', section: 'A', gender: 'Female', dob: '2012-07-23', nationality: 'United States', address: '88 Pine Street, Springfield', parent: 'Marcus Johnson', phone: '+1 (555) 100-2002', email: 'aisha.j@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Active', attendance: 98, fees: 'Paid' },
  { id: 'st3', name: 'Noah Garcia', firstName: 'Noah', lastName: 'Garcia', studentId: 'GVA-2024-003', class: 'Grade 8', section: 'B', gender: 'Male', dob: '2011-11-05', nationality: 'United States', address: '201 River Lane, Springfield', parent: 'Elena Garcia', phone: '+1 (555) 100-2003', email: 'noah.g@student.gva.edu', enrollDate: '2019-09-01', academicYear: '2025–2026', status: 'Active', attendance: 82, fees: 'Pending' },
  { id: 'st4', name: 'Lily Chen', firstName: 'Lily', lastName: 'Chen', studentId: 'GVA-2024-004', class: 'Grade 6', section: 'A', gender: 'Female', dob: '2013-02-18', nationality: 'United States', address: '9 Cedar Court, Springfield', parent: 'Wei Chen', phone: '+1 (555) 100-2004', email: 'lily.c@student.gva.edu', enrollDate: '2021-09-01', academicYear: '2025–2026', status: 'Active', attendance: 100, fees: 'Paid' },
  { id: 'st5', name: 'Oliver Patel', firstName: 'Oliver', lastName: 'Patel', studentId: 'GVA-2024-005', class: 'Grade 9', section: 'C', gender: 'Male', dob: '2010-08-30', nationality: 'United States', address: '55 Oak Boulevard, Springfield', parent: 'Rajiv Patel', phone: '+1 (555) 100-2005', email: 'oliver.p@student.gva.edu', enrollDate: '2018-09-01', academicYear: '2025–2026', status: 'Active', attendance: 77, fees: 'Overdue' },
  { id: 'st6', name: 'Sofia Rodriguez', firstName: 'Sofia', lastName: 'Rodriguez', studentId: 'GVA-2024-006', class: 'Grade 7', section: 'B', gender: 'Female', dob: '2012-05-14', nationality: 'United States', address: '310 Birch Ave, Springfield', parent: 'Carmen Rodriguez', phone: '+1 (555) 100-2006', email: 'sofia.r@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Active', attendance: 91, fees: 'Paid' },
  { id: 'st7', name: 'Liam Thompson', firstName: 'Liam', lastName: 'Thompson', studentId: 'GVA-2024-007', class: 'Grade 8', section: 'A', gender: 'Male', dob: '2011-12-22', nationality: 'United States', address: '72 Hill Street, Springfield', parent: 'Brian Thompson', phone: '+1 (555) 100-2007', email: 'liam.t@student.gva.edu', enrollDate: '2019-09-01', academicYear: '2025–2026', status: 'Active', attendance: 88, fees: 'Pending' },
  { id: 'st8', name: 'Zara Ahmed', firstName: 'Zara', lastName: 'Ahmed', studentId: 'GVA-2024-008', class: 'Grade 6', section: 'B', gender: 'Female', dob: '2013-09-07', nationality: 'United States', address: '18 Willow Way, Springfield', parent: 'Fatima Ahmed', phone: '+1 (555) 100-2008', email: 'zara.a@student.gva.edu', enrollDate: '2021-09-01', academicYear: '2025–2026', status: 'Active', attendance: 96, fees: 'Paid' },
  { id: 'st9', name: 'Mason Lee', firstName: 'Mason', lastName: 'Lee', studentId: 'GVA-2024-009', class: 'Grade 9', section: 'A', gender: 'Male', dob: '2010-03-11', nationality: 'United States', address: '14 Maple Drive, Springfield', parent: 'Priya Sharma', phone: '+1 (555) 100-2009', email: 'mason.l@student.gva.edu', enrollDate: '2018-09-01', academicYear: '2025–2026', status: 'Active', attendance: 85, fees: 'Paid' },
  { id: 'st10', name: 'Isabelle Nguyen', firstName: 'Isabelle', lastName: 'Nguyen', studentId: 'GVA-2024-010', class: 'Grade 7', section: 'C', gender: 'Female', dob: '2012-01-29', nationality: 'United States', address: '41 Garden Road, Springfield', parent: 'Minh Nguyen', phone: '+1 (555) 100-2010', email: 'isabelle.n@student.gva.edu', enrollDate: '2020-09-01', academicYear: '2025–2026', status: 'Transferred', attendance: 72, fees: 'Paid' },
]

export interface Teacher {
  id: string
  name: string
  firstName: string
  lastName: string
  teacherId: string
  subjects: string[]
  classes: string[]
  email: string
  phone: string
  gender: 'Male' | 'Female'
  dob: string
  address: string
  joinDate: string
  status: 'Active' | 'On Leave' | 'Inactive'
  qualification: string
}

export const TEACHERS: Teacher[] = [
  { id: 't1', name: 'James Okonkwo', firstName: 'James', lastName: 'Okonkwo', teacherId: 'GVA-T-001', subjects: ['Mathematics', 'Physics'], classes: ['Grade 7A', 'Grade 8B'], email: 'j.okonkwo@gva.edu', phone: '+1 (555) 201-3001', gender: 'Male', dob: '1986-03-12', address: '22 Faculty Lane, Springfield', joinDate: '2021-08-15', status: 'Active', qualification: 'M.Sc Mathematics' },
  { id: 't2', name: 'Angela Morrison', firstName: 'Angela', lastName: 'Morrison', teacherId: 'GVA-T-002', subjects: ['English', 'Literature'], classes: ['Grade 6A', 'Grade 7B'], email: 'a.morrison@gva.edu', phone: '+1 (555) 201-3002', gender: 'Female', dob: '1990-09-04', address: '8 Faculty Lane, Springfield', joinDate: '2020-08-20', status: 'Active', qualification: 'B.Ed English' },
  { id: 't3', name: 'Carlos Mendez', firstName: 'Carlos', lastName: 'Mendez', teacherId: 'GVA-T-003', subjects: ['Science', 'Biology'], classes: ['Grade 8A', 'Grade 9C'], email: 'c.mendez@gva.edu', phone: '+1 (555) 201-3003', gender: 'Male', dob: '1984-11-21', address: '19 Faculty Lane, Springfield', joinDate: '2022-01-10', status: 'Active', qualification: 'M.Sc Biology' },
  { id: 't4', name: 'Fatima Al-Rashid', firstName: 'Fatima', lastName: 'Al-Rashid', teacherId: 'GVA-T-004', subjects: ['History', 'Social Studies'], classes: ['Grade 6B', 'Grade 7C'], email: 'f.alrashid@gva.edu', phone: '+1 (555) 201-3004', gender: 'Female', dob: '1988-06-18', address: '4 Faculty Lane, Springfield', joinDate: '2019-09-01', status: 'On Leave', qualification: 'B.A History' },
  { id: 't5', name: 'Kevin Park', firstName: 'Kevin', lastName: 'Park', teacherId: 'GVA-T-005', subjects: ['Computer Science', 'ICT'], classes: ['Grade 9A', 'Grade 9B'], email: 'k.park@gva.edu', phone: '+1 (555) 201-3005', gender: 'Male', dob: '1992-01-30', address: '31 Faculty Lane, Springfield', joinDate: '2023-02-14', status: 'Active', qualification: 'B.Tech Computer Science' },
]

export interface Parent {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  address: string
  occupation: string
  children: string[]
  status: 'Active' | 'Inactive'
}

export const PARENTS: Parent[] = [
  { id: 'pr1', name: 'Priya Sharma', relationship: 'Mother', phone: '+1 (555) 100-2001', email: 'priya.sharma@email.com', address: '14 Maple Drive, Springfield', occupation: 'Software Engineer', children: ['Ethan Williams', 'Mason Lee'], status: 'Active' },
  { id: 'pr2', name: 'Marcus Johnson', relationship: 'Father', phone: '+1 (555) 100-2002', email: 'marcus.j@email.com', address: '88 Pine Street, Springfield', occupation: 'Physician', children: ['Aisha Johnson'], status: 'Active' },
  { id: 'pr3', name: 'Elena Garcia', relationship: 'Mother', phone: '+1 (555) 100-2003', email: 'elena.g@email.com', address: '201 River Lane, Springfield', occupation: 'Accountant', children: ['Noah Garcia'], status: 'Active' },
  { id: 'pr4', name: 'Wei Chen', relationship: 'Father', phone: '+1 (555) 100-2004', email: 'wei.chen@email.com', address: '9 Cedar Court, Springfield', occupation: 'Architect', children: ['Lily Chen'], status: 'Active' },
  { id: 'pr5', name: 'Rajiv Patel', relationship: 'Father', phone: '+1 (555) 100-2005', email: 'rajiv.p@email.com', address: '55 Oak Boulevard, Springfield', occupation: 'Business Owner', children: ['Oliver Patel'], status: 'Active' },
  { id: 'pr6', name: 'Carmen Rodriguez', relationship: 'Mother', phone: '+1 (555) 100-2006', email: 'carmen.r@email.com', address: '310 Birch Ave, Springfield', occupation: 'Teacher', children: ['Sofia Rodriguez'], status: 'Active' },
]

export interface SchoolClass {
  id: string
  name: string
  grade: string
  section: string
  academicYear: string
  teacher: string
  room: string
  capacity: number
  students: number
}

export const CLASSES: SchoolClass[] = [
  { id: 'c1', name: 'Grade 6A', grade: 'Grade 6', section: 'A', academicYear: '2025–2026', teacher: 'Angela Morrison', room: '101', capacity: 32, students: 28 },
  { id: 'c2', name: 'Grade 6B', grade: 'Grade 6', section: 'B', academicYear: '2025–2026', teacher: 'Fatima Al-Rashid', room: '102', capacity: 32, students: 30 },
  { id: 'c3', name: 'Grade 7A', grade: 'Grade 7', section: 'A', academicYear: '2025–2026', teacher: 'James Okonkwo', room: '201', capacity: 34, students: 32 },
  { id: 'c4', name: 'Grade 7B', grade: 'Grade 7', section: 'B', academicYear: '2025–2026', teacher: 'Angela Morrison', room: '202', capacity: 34, students: 31 },
  { id: 'c5', name: 'Grade 8A', grade: 'Grade 8', section: 'A', academicYear: '2025–2026', teacher: 'Carlos Mendez', room: '301', capacity: 34, students: 29 },
  { id: 'c6', name: 'Grade 8B', grade: 'Grade 8', section: 'B', academicYear: '2025–2026', teacher: 'James Okonkwo', room: '105', capacity: 34, students: 29 },
  { id: 'c7', name: 'Grade 9A', grade: 'Grade 9', section: 'A', academicYear: '2025–2026', teacher: 'Kevin Park', room: '401', capacity: 36, students: 33 },
  { id: 'c8', name: 'Grade 9C', grade: 'Grade 9', section: 'C', academicYear: '2025–2026', teacher: 'Carlos Mendez', room: '403', capacity: 36, students: 27 },
]

export const SECTIONS = [
  { id: 'sec1', name: 'A', classes: 4, students: 124, description: 'Core academic stream' },
  { id: 'sec2', name: 'B', classes: 4, students: 118, description: 'Core academic stream' },
  { id: 'sec3', name: 'C', classes: 3, students: 96, description: 'STEM-focused stream' },
]

export const SUBJECTS = [
  { id: 'sub1', name: 'Mathematics', code: 'MATH', teacher: 'James Okonkwo', classes: 4, type: 'Core' },
  { id: 'sub2', name: 'English', code: 'ENG', teacher: 'Angela Morrison', classes: 4, type: 'Core' },
  { id: 'sub3', name: 'Science', code: 'SCI', teacher: 'Carlos Mendez', classes: 3, type: 'Core' },
  { id: 'sub4', name: 'History', code: 'HIST', teacher: 'Fatima Al-Rashid', classes: 3, type: 'Core' },
  { id: 'sub5', name: 'Computer Science', code: 'CS', teacher: 'Kevin Park', classes: 2, type: 'Elective' },
  { id: 'sub6', name: 'Physics', code: 'PHY', teacher: 'James Okonkwo', classes: 2, type: 'Elective' },
  { id: 'sub7', name: 'Literature', code: 'LIT', teacher: 'Angela Morrison', classes: 2, type: 'Elective' },
]

export interface AttendanceRecord {
  studentId: string
  studentName: string
  class: string
  date: string
  status: 'Present' | 'Absent' | 'Late' | 'Leave'
}

export const ATTENDANCE: AttendanceRecord[] = [
  { studentId: 'st1', studentName: 'Ethan Williams', class: 'Grade 7A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st2', studentName: 'Aisha Johnson', class: 'Grade 7A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st3', studentName: 'Noah Garcia', class: 'Grade 8B', date: '2026-08-16', status: 'Absent' },
  { studentId: 'st4', studentName: 'Lily Chen', class: 'Grade 6A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st5', studentName: 'Oliver Patel', class: 'Grade 9C', date: '2026-08-16', status: 'Late' },
  { studentId: 'st6', studentName: 'Sofia Rodriguez', class: 'Grade 7B', date: '2026-08-16', status: 'Present' },
  { studentId: 'st7', studentName: 'Liam Thompson', class: 'Grade 8A', date: '2026-08-16', status: 'Leave' },
  { studentId: 'st8', studentName: 'Zara Ahmed', class: 'Grade 6B', date: '2026-08-16', status: 'Present' },
  { studentId: 'st9', studentName: 'Mason Lee', class: 'Grade 9A', date: '2026-08-16', status: 'Present' },
  { studentId: 'st10', studentName: 'Isabelle Nguyen', class: 'Grade 7C', date: '2026-08-16', status: 'Absent' },
]

export interface FeeRecord {
  id: string
  studentName: string
  class: string
  feeType: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'Paid' | 'Pending' | 'Overdue'
  invoiceId: string
  discount?: number
}

export const FEES: FeeRecord[] = [
  { id: 'f1', studentName: 'Ethan Williams', class: 'Grade 7A', feeType: 'Tuition', amount: 1200, dueDate: '2026-08-01', paidDate: '2026-07-28', status: 'Paid', invoiceId: 'INV-2026-001', discount: 0 },
  { id: 'f2', studentName: 'Aisha Johnson', class: 'Grade 7A', feeType: 'Tuition', amount: 1200, dueDate: '2026-08-01', paidDate: '2026-08-05', status: 'Paid', invoiceId: 'INV-2026-002' },
  { id: 'f3', studentName: 'Noah Garcia', class: 'Grade 8B', feeType: 'Tuition', amount: 1350, dueDate: '2026-08-01', status: 'Pending', invoiceId: 'INV-2026-003' },
  { id: 'f4', studentName: 'Lily Chen', class: 'Grade 6A', feeType: 'Tuition', amount: 1100, dueDate: '2026-08-01', paidDate: '2026-08-01', status: 'Paid', invoiceId: 'INV-2026-004' },
  { id: 'f5', studentName: 'Oliver Patel', class: 'Grade 9C', feeType: 'Tuition', amount: 1400, dueDate: '2026-07-01', status: 'Overdue', invoiceId: 'INV-2026-005' },
  { id: 'f6', studentName: 'Sofia Rodriguez', class: 'Grade 7B', feeType: 'Activities', amount: 250, dueDate: '2026-08-10', paidDate: '2026-08-09', status: 'Paid', invoiceId: 'INV-2026-006' },
  { id: 'f7', studentName: 'Liam Thompson', class: 'Grade 8A', feeType: 'Tuition', amount: 1350, dueDate: '2026-08-01', status: 'Pending', invoiceId: 'INV-2026-007' },
  { id: 'f8', studentName: 'Mason Lee', class: 'Grade 9A', feeType: 'Lab Fee', amount: 200, dueDate: '2026-08-15', paidDate: '2026-08-14', status: 'Paid', invoiceId: 'INV-2026-008' },
]

export const PAYMENTS = [
  { id: 'pay1', studentName: 'Ethan Williams', invoiceId: 'INV-2026-001', amount: 1200, method: 'Bank', date: '2026-07-28', reference: 'TXN-88421', status: 'Completed' },
  { id: 'pay2', studentName: 'Aisha Johnson', invoiceId: 'INV-2026-002', amount: 1200, method: 'Card', date: '2026-08-05', reference: 'TXN-88490', status: 'Completed' },
  { id: 'pay3', studentName: 'Lily Chen', invoiceId: 'INV-2026-004', amount: 1100, method: 'Mobile Money', date: '2026-08-01', reference: 'TXN-88512', status: 'Completed' },
  { id: 'pay4', studentName: 'Sofia Rodriguez', invoiceId: 'INV-2026-006', amount: 250, method: 'Cash', date: '2026-08-09', reference: 'TXN-88601', status: 'Completed' },
  { id: 'pay5', studentName: 'Mason Lee', invoiceId: 'INV-2026-008', amount: 200, method: 'Bank', date: '2026-08-14', reference: 'TXN-88688', status: 'Completed' },
]

export const EXPENSES = [
  { id: 'ex1', title: 'Classroom supplies', category: 'Supplies', amount: 840, date: '2026-08-04', paidTo: 'OfficeMart', status: 'Paid' },
  { id: 'ex2', title: 'Science lab equipment', category: 'Facilities', amount: 2650, date: '2026-08-08', paidTo: 'EduLab Inc', status: 'Paid' },
  { id: 'ex3', title: 'Sports Day catering', category: 'Events', amount: 1200, date: '2026-08-20', paidTo: 'Valley Catering', status: 'Pending' },
  { id: 'ex4', title: 'Staff training workshop', category: 'Training', amount: 980, date: '2026-08-12', paidTo: 'TeachWell', status: 'Paid' },
  { id: 'ex5', title: 'Building maintenance', category: 'Facilities', amount: 3400, date: '2026-08-02', paidTo: 'Springfield Facilities', status: 'Paid' },
]

export const ASSIGNMENTS = [
  { id: 'as1', title: 'Algebra worksheet — Linear equations', class: 'Grade 7A', subject: 'Mathematics', teacher: 'James Okonkwo', dueDate: '2026-08-20', status: 'Pending', submitted: 18, total: 32 },
  { id: 'as2', title: 'Essay: A day in my community', class: 'Grade 6A', subject: 'English', teacher: 'Angela Morrison', dueDate: '2026-08-18', status: 'Submitted', submitted: 28, total: 28 },
  { id: 'as3', title: 'Lab report: Plant cells', class: 'Grade 8A', subject: 'Science', teacher: 'Carlos Mendez', dueDate: '2026-08-15', status: 'Late', submitted: 21, total: 29 },
  { id: 'as4', title: 'Python basics quiz', class: 'Grade 9A', subject: 'Computer Science', teacher: 'Kevin Park', dueDate: '2026-08-12', status: 'Graded', submitted: 33, total: 33 },
  { id: 'as5', title: 'World War II timeline', class: 'Grade 6B', subject: 'History', teacher: 'Fatima Al-Rashid', dueDate: '2026-08-22', status: 'Pending', submitted: 10, total: 30 },
]

export const RESULTS = [
  { id: 'r1', studentName: 'Ethan Williams', studentId: 'GVA-2024-001', class: 'Grade 7A', subject: 'Mathematics', marks: 88, grade: 'A', remarks: 'Strong problem solving' },
  { id: 'r2', studentName: 'Ethan Williams', studentId: 'GVA-2024-001', class: 'Grade 7A', subject: 'English', marks: 76, grade: 'B+', remarks: 'Good writing structure' },
  { id: 'r3', studentName: 'Aisha Johnson', studentId: 'GVA-2024-002', class: 'Grade 7A', subject: 'Mathematics', marks: 95, grade: 'A+', remarks: 'Outstanding' },
  { id: 'r4', studentName: 'Noah Garcia', studentId: 'GVA-2024-003', class: 'Grade 8B', subject: 'Science', marks: 68, grade: 'C+', remarks: 'Needs more revision' },
  { id: 'r5', studentName: 'Lily Chen', studentId: 'GVA-2024-004', class: 'Grade 6A', subject: 'English', marks: 91, grade: 'A+', remarks: 'Excellent vocabulary' },
  { id: 'r6', studentName: 'Mason Lee', studentId: 'GVA-2024-009', class: 'Grade 9A', subject: 'Computer Science', marks: 84, grade: 'A', remarks: 'Solid practical work' },
]

export const EXAMS = [
  { id: 'ex1', name: 'Mid-Term Mathematics', class: 'Grade 7', academicYear: '2025–2026', date: '2026-08-25', endDate: '2026-08-25', time: '09:00 AM', duration: '2h', status: 'Upcoming' },
  { id: 'ex2', name: 'Mid-Term English', class: 'Grade 7', academicYear: '2025–2026', date: '2026-08-26', endDate: '2026-08-26', time: '09:00 AM', duration: '2h', status: 'Upcoming' },
  { id: 'ex3', name: 'Mid-Term Science', class: 'Grade 8', academicYear: '2025–2026', date: '2026-08-27', endDate: '2026-08-27', time: '09:00 AM', duration: '2h', status: 'Upcoming' },
  { id: 'ex4', name: 'Final Mathematics', class: 'Grade 9', academicYear: '2025–2026', date: '2026-07-10', endDate: '2026-07-10', time: '09:00 AM', duration: '3h', status: 'Completed' },
  { id: 'ex5', name: 'Term 1 Assessment', class: 'All Grades', academicYear: '2025–2026', date: '2026-09-08', endDate: '2026-09-12', time: '09:00 AM', duration: '2h', status: 'Scheduled' },
]

export interface Announcement {
  id: string
  title: string
  description: string
  date: string
  author: string
  type: string
  audience: string
  priority: 'Normal' | 'High' | 'Urgent'
  status: 'Published' | 'Scheduled' | 'Draft'
  urgent: boolean
}

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Annual Sports Day 2026', description: 'Students should wear house colors. Parents are welcome from 8:00 AM.', date: '2026-08-15', author: 'Admin', type: 'Event', audience: 'All', priority: 'High', status: 'Published', urgent: false },
  { id: 'a2', title: 'Mid-Term Exam Schedule Released', description: 'Please review the timetable in the Exams module. Calculators are allowed for Mathematics.', date: '2026-08-12', author: 'Academics', type: 'Exam', audience: 'Students', priority: 'Urgent', status: 'Published', urgent: true },
  { id: 'a3', title: 'Parent-Teacher Meeting — Aug 22', description: 'Meetings will be held in classrooms from 2:00 PM to 5:00 PM.', date: '2026-08-10', author: 'Admin', type: 'Meeting', audience: 'Parents', priority: 'High', status: 'Published', urgent: false },
  { id: 'a4', title: 'Library Book Submission Deadline', description: 'All borrowed books must be returned by August 29.', date: '2026-08-08', author: 'Library', type: 'Reminder', audience: 'Students', priority: 'Normal', status: 'Published', urgent: false },
  { id: 'a5', title: 'Staff briefing — new grading policy', description: 'Draft notice for teachers only. Do not publish yet.', date: '2026-08-18', author: 'Admin', type: 'Staff', audience: 'Teachers', priority: 'Normal', status: 'Draft', urgent: false },
]

export const EVENTS = [
  { id: 'e1', title: 'Annual Sports Day', date: '2026-08-22', time: '08:00 AM', location: 'Main Ground', type: 'Sports Day' },
  { id: 'e2', title: 'Science Fair', date: '2026-09-05', time: '10:00 AM', location: 'Auditorium', type: 'School Event' },
  { id: 'e3', title: 'Parent-Teacher Meeting', date: '2026-08-22', time: '02:00 PM', location: 'Classrooms', type: 'Parent Meeting' },
  { id: 'e4', title: 'Grade 9 Field Trip', date: '2026-09-12', time: '07:30 AM', location: 'City Museum', type: 'School Event' },
  { id: 'e5', title: 'Independence Holiday', date: '2026-08-17', time: 'All day', location: 'Campus closed', type: 'Holiday' },
  { id: 'e6', title: 'Staff Meeting', date: '2026-08-19', time: '03:30 PM', location: 'Conference Room', type: 'Staff Meeting' },
  { id: 'e7', title: 'Mid-Term Exams Begin', date: '2026-08-25', time: '09:00 AM', location: 'Exam Halls', type: 'Exam' },
]

export const MESSAGES = [
  { id: 'm1', from: 'Sarah Mitchell', to: 'James Okonkwo', subject: 'Grade 7A coverage on Friday', preview: 'Could you cover the extra period after assembly?', date: '2026-08-16 09:14', unread: true },
  { id: 'm2', from: 'Priya Sharma', to: 'James Okonkwo', subject: 'Ethan — homework clarification', preview: 'Is the algebra worksheet due Wednesday or Thursday?', date: '2026-08-15 18:42', unread: true },
  { id: 'm3', from: 'Angela Morrison', to: 'Sarah Mitchell', subject: 'Library booking', preview: 'Requesting the library for Grade 6A on Aug 21.', date: '2026-08-15 11:05', unread: false },
  { id: 'm4', from: 'Accounts', to: 'Priya Sharma', subject: 'Fee receipt INV-2026-001', preview: 'Your payment has been recorded. Receipt attached.', date: '2026-07-28 16:20', unread: false },
]

export const NOTIFICATIONS = [
  { id: 'n1', category: 'Attendance', title: 'Noah Garcia marked absent', body: 'Grade 8B — August 16, 2026', time: '08:42 AM', read: false },
  { id: 'n2', category: 'Fees', title: 'Overdue fee reminder', body: 'Oliver Patel — Tuition $1,400 overdue', time: '08:10 AM', read: false },
  { id: 'n3', category: 'Exams', title: 'Mid-term timetable published', body: 'Mathematics starts August 25 at 09:00 AM', time: 'Yesterday', read: false },
  { id: 'n4', category: 'Assignments', title: 'New assignment posted', body: 'Algebra worksheet for Grade 7A', time: 'Yesterday', read: true },
  { id: 'n5', category: 'Announcements', title: 'Sports Day reminder', body: 'Annual Sports Day is this Saturday', time: '2 days ago', read: true },
  { id: 'n6', category: 'System', title: 'Backup completed', body: 'Nightly school data backup finished successfully', time: '2 days ago', read: true },
]

export const AUDIT_LOGS = [
  { id: 'l1', user: 'Sarah Mitchell', action: 'Student created', module: 'Students', date: '2026-08-16 07:51', ip: '192.168.1.14', status: 'Success' },
  { id: 'l2', user: 'James Okonkwo', action: 'Attendance saved', module: 'Attendance', date: '2026-08-16 08:05', ip: '192.168.1.22', status: 'Success' },
  { id: 'l3', user: 'Sarah Mitchell', action: 'Payment recorded', module: 'Fees', date: '2026-08-14 16:18', ip: '192.168.1.14', status: 'Success' },
  { id: 'l4', user: 'Marcus Chen', action: 'School created', module: 'Tenants', date: '2026-08-12 11:02', ip: '10.0.0.8', status: 'Success' },
  { id: 'l5', user: 'Sarah Mitchell', action: 'Teacher updated', module: 'Teachers', date: '2026-08-11 09:44', ip: '192.168.1.14', status: 'Success' },
  { id: 'l6', user: 'Accounts Bot', action: 'Fee deleted', module: 'Fees', date: '2026-08-09 13:21', ip: '10.0.0.8', status: 'Warning' },
  { id: 'l7', user: 'Marcus Chen', action: 'Plan upgraded', module: 'Subscriptions', date: '2026-08-08 10:16', ip: '10.0.0.8', status: 'Success' },
  { id: 'l8', user: 'Unknown', action: 'Failed login attempt', module: 'Security', date: '2026-08-07 22:03', ip: '203.0.113.40', status: 'Failed' },
]

export const SCHOOL_ADMINS = [
  { id: 'sa1', name: 'Sarah Mitchell', school: 'Green Valley Academy', email: 'admin@greenvalley.edu', phone: '+1 (555) 201-4400', status: 'Active', lastLogin: '2026-08-16 07:48' },
  { id: 'sa2', name: 'Rosa Martinez', school: 'Sunrise Kindergarten', email: 'admin@sunrisekg.edu', phone: '+1 (555) 590-2200', status: 'Active', lastLogin: '2026-08-15 18:11' },
  { id: 'sa3', name: 'Lisa Tanaka', school: 'Bright Future School', email: 'admin@brightfuture.edu', phone: '+1 (555) 774-3300', status: 'Active', lastLogin: '2026-08-16 06:55' },
  { id: 'sa4', name: 'Ahmed Hassan', school: 'Al-Noor Academy', email: 'admin@alnoor.edu', phone: '+1 (555) 462-6600', status: 'Active', lastLogin: '2026-08-16 08:02' },
  { id: 'sa5', name: 'David Osei', school: 'Riverside Primary School', email: 'admin@riverside.edu', phone: '+1 (555) 384-9100', status: 'Inactive', lastLogin: '2026-07-02 14:20' },
]

export const PLATFORM_USERS = [
  { id: 'pu1', name: 'Marcus Chen', email: 'superadmin@xanaano.com', role: 'Super Admin', school: 'Platform', status: 'Active', lastLogin: '2026-08-16 08:12' },
  { id: 'pu2', name: 'Nadia Brooks', email: 'support@xanaano.com', role: 'Support', school: 'Platform', status: 'Active', lastLogin: '2026-08-16 07:40' },
  { id: 'pu3', name: 'Sarah Mitchell', email: 'admin@greenvalley.edu', role: 'School Admin', school: 'Green Valley Academy', status: 'Active', lastLogin: '2026-08-16 07:48' },
  { id: 'pu4', name: 'James Okonkwo', email: 'teacher@greenvalley.edu', role: 'Teacher', school: 'Green Valley Academy', status: 'Active', lastLogin: '2026-08-16 07:20' },
  { id: 'pu5', name: 'Priya Sharma', email: 'parent@greenvalley.edu', role: 'Parent', school: 'Green Valley Academy', status: 'Active', lastLogin: '2026-08-15 21:04' },
]

export const PLATFORM_PAYMENTS = [
  { id: 'pp1', school: 'Green Valley Academy', plan: 'Premium', amount: 499, date: '2026-08-01', method: 'Card', status: 'Paid' },
  { id: 'pp2', school: 'Al-Noor Academy', plan: 'Premium', amount: 499, date: '2026-08-01', method: 'Bank', status: 'Paid' },
  { id: 'pp3', school: 'Sunrise Kindergarten', plan: 'Standard', amount: 249, date: '2026-08-01', method: 'Card', status: 'Paid' },
  { id: 'pp4', school: 'Bright Future School', plan: 'Standard', amount: 249, date: '2026-08-03', method: 'Bank', status: 'Paid' },
  { id: 'pp5', school: 'Westfield Academy', plan: 'Premium', amount: 499, date: '2026-08-01', method: 'Card', status: 'Pending' },
  { id: 'pp6', school: 'Heritage Christian School', plan: 'Basic', amount: 99, date: '2026-07-01', method: 'Card', status: 'Failed' },
]

export const SUPPORT_TICKETS = [
  { id: 'tk1', school: 'Green Valley Academy', subject: 'Unable to export report cards', priority: 'High', status: 'Open', date: '2026-08-16' },
  { id: 'tk2', school: 'Sunrise Kindergarten', subject: 'Add extra kindergarten class section', priority: 'Normal', status: 'In Progress', date: '2026-08-14' },
  { id: 'tk3', school: 'Al-Noor Academy', subject: 'Billing invoice mismatch', priority: 'Urgent', status: 'Open', date: '2026-08-13' },
  { id: 'tk4', school: 'Bright Future School', subject: 'Parent portal login help', priority: 'Low', status: 'Resolved', date: '2026-08-10' },
]

export const ROLES = [
  { id: 'rl1', name: 'Super Admin', users: 2, description: 'Full platform access across all tenants' },
  { id: 'rl2', name: 'School Admin', users: 7, description: 'Manage a single school tenant' },
  { id: 'rl3', name: 'Teacher', users: 240, description: 'Classes, attendance, assignments, results' },
  { id: 'rl4', name: 'Parent', users: 2841, description: 'View children, fees, and communication' },
]

export interface TimetableSlot { subject: string; teacher: string; room: string }
export interface TimetableRow {
  time: string
  Monday: TimetableSlot
  Tuesday: TimetableSlot
  Wednesday: TimetableSlot
  Thursday: TimetableSlot
  Friday: TimetableSlot
}

export const TIMETABLE: TimetableRow[] = [
  { time: '8:00', Monday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Tuesday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Wednesday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Thursday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Friday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' } },
  { time: '9:00', Monday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Tuesday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Wednesday: { subject: 'ICT', teacher: 'K. Park', room: '401' }, Thursday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Friday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' } },
  { time: '10:00', Monday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Tuesday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' }, Wednesday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Thursday: { subject: 'PE', teacher: 'Coach Reid', room: 'Gym' }, Friday: { subject: 'Science', teacher: 'C. Mendez', room: '301' } },
  { time: '11:00', Monday: { subject: 'Break', teacher: '—', room: '—' }, Tuesday: { subject: 'Break', teacher: '—', room: '—' }, Wednesday: { subject: 'Break', teacher: '—', room: '—' }, Thursday: { subject: 'Break', teacher: '—', room: '—' }, Friday: { subject: 'Break', teacher: '—', room: '—' } },
  { time: '12:00', Monday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' }, Tuesday: { subject: 'Science', teacher: 'C. Mendez', room: '301' }, Wednesday: { subject: 'Mathematics', teacher: 'J. Okonkwo', room: '201' }, Thursday: { subject: 'English', teacher: 'A. Morrison', room: '202' }, Friday: { subject: 'ICT', teacher: 'K. Park', room: '401' } },
  { time: '1:00', Monday: { subject: 'ICT', teacher: 'K. Park', room: '401' }, Tuesday: { subject: 'Literature', teacher: 'A. Morrison', room: '202' }, Wednesday: { subject: 'Physics', teacher: 'J. Okonkwo', room: '105' }, Thursday: { subject: 'History', teacher: 'F. Al-Rashid', room: '102' }, Friday: { subject: 'Assembly', teacher: 'Admin', room: 'Hall' } },
]

export const ENROLLMENT_MONTHLY = [
  { month: 'Mar', students: 790 },
  { month: 'Apr', students: 802 },
  { month: 'May', students: 811 },
  { month: 'Jun', students: 818 },
  { month: 'Jul', students: 829 },
  { month: 'Aug', students: 842 },
]

export const REVENUE_DATA = [
  { month: 'Mar', revenue: 42000, schools: 5 },
  { month: 'Apr', revenue: 51000, schools: 5 },
  { month: 'May', revenue: 48000, schools: 6 },
  { month: 'Jun', revenue: 63000, schools: 6 },
  { month: 'Jul', revenue: 71000, schools: 7 },
  { month: 'Aug', revenue: 78400, schools: 7 },
]

export const SCHOOL_GROWTH_DATA = [
  { month: 'Jan', schools: 3 },
  { month: 'Feb', schools: 4 },
  { month: 'Mar', schools: 5 },
  { month: 'Apr', schools: 5 },
  { month: 'May', schools: 6 },
  { month: 'Jun', schools: 6 },
  { month: 'Jul', schools: 7 },
  { month: 'Aug', schools: 7 },
]

export const STUDENT_GROWTH_DATA = [
  { month: 'Mar', students: 2100 },
  { month: 'Apr', students: 2340 },
  { month: 'May', students: 2580 },
  { month: 'Jun', students: 2750 },
  { month: 'Jul', students: 3020 },
  { month: 'Aug', students: 3535 },
]

export const ATTENDANCE_WEEKLY = [
  { day: 'Mon', present: 788, absent: 42, late: 12 },
  { day: 'Tue', present: 798, absent: 35, late: 9 },
  { day: 'Wed', present: 771, absent: 48, late: 23 },
  { day: 'Thu', present: 805, absent: 28, late: 9 },
  { day: 'Fri', present: 762, absent: 55, late: 25 },
]

export const FEE_MONTHLY = [
  { month: 'Apr', collected: 38500, pending: 8200 },
  { month: 'May', collected: 42100, pending: 6400 },
  { month: 'Jun', collected: 39800, pending: 9100 },
  { month: 'Jul', collected: 45600, pending: 5300 },
  { month: 'Aug', collected: 31200, pending: 12400 },
]

export const SUBSCRIPTION_PLANS = [
  { id: 'p1', name: 'Basic', price: 99, billing: 'Monthly', studentLimit: 200, teacherLimit: 20, features: ['Student Management', 'Attendance', 'Basic Reports'], status: 'Active', subscribers: 2 },
  { id: 'p2', name: 'Standard', price: 249, billing: 'Monthly', studentLimit: 600, teacherLimit: 60, features: ['Everything in Basic', 'Fee Management', 'Exam & Results', 'Events & Announcements'], status: 'Active', subscribers: 2 },
  { id: 'p3', name: 'Premium', price: 499, billing: 'Monthly', studentLimit: 2000, teacherLimit: 200, features: ['Everything in Standard', 'Timetable', 'Assignments', 'Parent Portal', 'Priority Support'], status: 'Active', subscribers: 3 },
]

export const CHILDREN = [
  { ...STUDENTS[0], subject: 'Mathematics', teacher: 'James Okonkwo' },
  { ...STUDENTS[8], subject: 'Science', teacher: 'Carlos Mendez' },
]

export const LOGIN_HISTORY = [
  { id: 'lh1', device: 'Chrome · Windows', ip: '192.168.1.14', date: '2026-08-16 07:48 AM', status: 'Success' },
  { id: 'lh2', device: 'Safari · iPhone', ip: '192.168.1.90', date: '2026-08-15 09:04 PM', status: 'Success' },
  { id: 'lh3', device: 'Chrome · Windows', ip: '192.168.1.14', date: '2026-08-15 07:12 AM', status: 'Success' },
  { id: 'lh4', device: 'Unknown · Linux', ip: '203.0.113.40', date: '2026-08-14 02:11 AM', status: 'Failed' },
]

export const REPORT_CARD_SUBJECTS = [
  { subject: 'Mathematics', marks: 88, grade: 'A', comment: 'Strong analytical skills.' },
  { subject: 'English', marks: 76, grade: 'B+', comment: 'Clear writing; expand vocabulary.' },
  { subject: 'Science', marks: 92, grade: 'A+', comment: 'Excellent lab work.' },
  { subject: 'History', marks: 71, grade: 'B', comment: 'Good recall; improve essays.' },
  { subject: 'Computer Science', marks: 95, grade: 'A+', comment: 'Outstanding practical projects.' },
  { subject: 'Physical Education', marks: 84, grade: 'A', comment: 'Active and collaborative.' },
]

export function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export function money(n: number) {
  return `$${n.toLocaleString()}`
}
