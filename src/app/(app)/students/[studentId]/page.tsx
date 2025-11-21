'use client';

import { notFound } from 'next/navigation';
import { StudentHeader } from '@/components/student/student-header';
import { RiskAnalysis } from '@/components/student/risk-analysis';
import { FeedbackGenerator } from '@/components/student/feedback-generator';
import { ResourceRecommender } from '@/components/student/resource-recommender';
import { useStudents } from '@/contexts/StudentContext';

type StudentPageProps = {
  params: {
    studentId: string;
  };
};

export default function StudentPage({ params }: StudentPageProps) {
  const { students } = useStudents();
  const student = students.find(s => s.id === params.studentId);

  if (!student) {
    // We can't use notFound() in a client component in the same way.
    // We can show a message or redirect.
    return (
        <div className="flex items-center justify-center h-full">
            <p>Student not found.</p>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <StudentHeader student={student} />
      <RiskAnalysis prediction={student.riskPrediction} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackGenerator student={student} />
        <ResourceRecommender student={student} />
      </div>
    </div>
  );
}
