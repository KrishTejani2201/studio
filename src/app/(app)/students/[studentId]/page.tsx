import { notFound } from 'next/navigation';
import { getStudentById } from '@/lib/data';
import { StudentHeader } from '@/components/student/student-header';
import { RiskAnalysis } from '@/components/student/risk-analysis';
import { FeedbackGenerator } from '@/components/student/feedback-generator';
import { ResourceRecommender } from '@/components/student/resource-recommender';

type StudentPageProps = {
  params: {
    studentId: string;
  };
};

export default function StudentPage({ params }: StudentPageProps) {
  const student = getStudentById(params.studentId);

  if (!student) {
    notFound();
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
