import type { Student } from './types';

export const initialStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    grade: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=alex_johnson',
    attendance: 95,
    averageScore: 88,
    parentEmail: 'parent1@example.com',
    performance: [
      { subject: 'Math', score: 92, date: '2023-10-15' },
      { subject: 'Science', score: 85, date: '2023-10-12' },
      { subject: 'History', score: 89, date: '2023-10-10' },
    ],
    riskPrediction: {
      probability: 0.12,
      level: 'Low',
      contributingFactors: [
        { feature: 'High Average Score', impact: -0.5 },
        { feature: 'Good Attendance', impact: -0.4 },
        { feature: 'Recent Quiz Score Drop', impact: 0.2 },
        { feature: 'Homework Completion Rate', impact: -0.1 },
        { feature: 'Class Participation', impact: -0.1 },
      ],
    },
  },
  {
    id: '2',
    name: 'Brenda Smith',
    grade: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=brenda_smith',
    attendance: 78,
    averageScore: 65,
    parentEmail: 'parent2@example.com',
    performance: [
      { subject: 'Math', score: 60, date: '2023-10-15' },
      { subject: 'Science', score: 72, date: '2023-10-12' },
      { subject: 'History', score: 68, date: '2023-10-10' },
    ],
    riskPrediction: {
      probability: 0.76,
      level: 'High',
      contributingFactors: [
        { feature: 'Low Attendance', impact: 0.6 },
        { feature: 'Low Average Score', impact: 0.5 },
        { feature: 'Declining Test Scores', impact: 0.4 },
        { feature: 'Missing Assignments', impact: 0.3 },
        { feature: 'Behavioral Incidents', impact: 0.2 },
      ],
    },
  },
  {
    id: '3',
    name: 'Charlie Brown',
    grade: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie_brown',
    attendance: 85,
    averageScore: 78,
    parentEmail: 'parent3@example.com',
    performance: [
      { subject: 'Math', score: 75, date: '2023-10-15' },
      { subject: 'Science', score: 80, date: '2023-10-12' },
      { subject: 'History', score: 79, date: '2023-10-10' },
    ],
    riskPrediction: {
      probability: 0.45,
      level: 'Medium',
      contributingFactors: [
        { feature: 'Inconsistent Attendance', impact: 0.4 },
        { feature: 'Fluctuating Quiz Scores', impact: 0.3 },
        { feature: 'Late Homework Submissions', impact: 0.25 },
        { feature: 'Low Engagement', impact: 0.2 },
        { feature: 'Positive Peer Interaction', impact: -0.1 },
      ],
    },
  },
  {
    id: '4',
    name: 'Diana Prince',
    grade: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=diana_prince',
    attendance: 99,
    averageScore: 96,
    parentEmail: 'parent4@example.com',
    performance: [
      { subject: 'Math', score: 98, date: '2023-10-15' },
      { subject: 'Science', score: 95, date: '2023-10-12' },
      { subject: 'History', score: 94, date: '2023-10-10' },
    ],
    riskPrediction: {
      probability: 0.05,
      level: 'Low',
      contributingFactors: [
        { feature: 'Excellent Attendance', impact: -0.6 },
        { feature: 'Top Quartile Scores', impact: -0.5 },
        { feature: 'High Class Participation', impact: -0.3 },
        { feature: 'Leadership Roles', impact: -0.2 },
        { feature: 'Peer Tutoring', impact: -0.1 },
      ],
    },
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    grade: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=ethan_hunt',
    attendance: 88,
    averageScore: 72,
    parentEmail: 'parent5@example.com',
    performance: [
      { subject: 'Math', score: 68, date: '2023-10-15' },
      { subject: 'Science', score: 75, date: '2023-10-12' },
      { subject: 'History', score: 73, date: '2023-10-10' },
    ],
    riskPrediction: {
      probability: 0.62,
      level: 'Medium',
      contributingFactors: [
        { feature: 'Low Score in Math', impact: 0.5 },
        { feature: 'Attendance slightly below average', impact: 0.3 },
        { feature: 'Difficulty with specific concepts', impact: 0.2 },
        { feature: 'Positive trend in Science', impact: -0.1 },
        { feature: 'Good behavior', impact: -0.2 },
      ],
    },
  },
];

export const getStudentById = (id: string): Student | undefined => {
  // This will need to be updated to use the context-managed students array
  return initialStudents.find(student => student.id === id);
};
