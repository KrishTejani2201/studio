import { notFound } from 'next/navigation';
import { getStudentById } from '@/lib/data';
import { StudentHeader } from '@/components/student/student-header';
import { RiskAnalysis } from '@/components/student/risk-analysis';
import { FeedbackGenerator } from '@/components/student/feedback-generator';
import { ResourceRecommender } from '@/components/student/resource-recommender';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StudentDashboardPage() {
  // For demo purposes, we'll show a hardcoded student.
  const student = getStudentById('3');

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <StudentHeader student={student} />
      <RiskAnalysis prediction={student.riskPrediction} />
      
      <Card>
        <CardHeader>
            <CardTitle>Teacher Feedback</CardTitle>
            <CardDescription>Latest feedback from your teacher.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="rounded-md border bg-muted/50 p-4">
                <p className="text-sm">
                    "Charlie has been showing great enthusiasm in class, especially during group activities. His latest project on the solar system was well-researched. To take his learning to the next level, I encourage him to double-check his homework for completion before submitting and to participate more in class discussions. I'm confident that with a little more focus in these areas, he'll see a great improvement in his scores."
                </p>
                <p className="text-xs text-muted-foreground mt-2">- Ms. Davison</p>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Challenge a Grade</CardTitle>
            <CardDescription>If you believe there has been an error in your grading, you can submit a challenge for review.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">This feature is coming soon.</p>
            <Button disabled>Submit Challenge</Button>
        </CardContent>
      </Card>

    </div>
  );
}
