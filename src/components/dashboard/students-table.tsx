'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUpDown,
  ChevronDown,
} from 'lucide-react';

import type { Student } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type StudentsTableProps = {
  students: Student[];
};

const riskLevelVariant = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
} as const;

export function StudentsTable({ students: initialStudents }: StudentsTableProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [sort, setSort] = useState<{ key: keyof Student | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc'});
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const handleSort = (key: keyof Student) => {
    const direction = (sort.key === key && sort.direction === 'asc') ? 'desc' : 'asc';
    const sortedStudents = [...students].sort((a, b) => {
        if (key === 'riskPrediction') {
            const levelA = a.riskPrediction.level;
            const levelB = b.riskPrediction.level;
            const order = { 'High': 1, 'Medium': 2, 'Low': 3 };
            return direction === 'asc' ? order[levelA] - order[levelB] : order[levelB] - order[levelA];
        }

        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    setStudents(sortedStudents);
    setSort({ key, direction });
  }

  const filteredStudents = students.filter(student => student.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Roster</CardTitle>
        <CardDescription>A list of all students in your class.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter students by name..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('riskPrediction')}
                >
                  <div className="flex items-center">
                    Risk Level <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('averageScore')}
                >
                  <div className="flex items-center">
                    Avg. Score <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort('attendance')}
                >
                   <div className="flex items-center">
                    Attendance <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length ? (
                filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/students/${student.id}`)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.avatarUrl} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                          <span>{student.name}</span>
                          <span className="text-xs text-muted-foreground">{student.parentEmail}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={riskLevelVariant[student.riskPrediction.level]}>
                        {student.riskPrediction.level}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.averageScore}</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
