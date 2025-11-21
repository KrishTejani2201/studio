'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUpDown,
} from 'lucide-react';

import type { Student } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
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
  const [sort, setSort] = useState<{ key: keyof Student | 'riskPrediction' | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc'});
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const sortedAndFilteredStudents = useMemo(() => {
    let students = [...initialStudents];
    
    if (filter) {
      students = students.filter(student => student.name.toLowerCase().includes(filter.toLowerCase()));
    }

    if (sort.key) {
      students.sort((a, b) => {
        const key = sort.key as keyof Student;
        if (key === 'riskPrediction') {
            const levelA = a.riskPrediction.level;
            const levelB = b.riskPrediction.level;
            const order = { 'High': 1, 'Medium': 2, 'Low': 3 };
            return sort.direction === 'asc' ? order[levelA] - order[levelB] : order[levelB] - order[levelA];
        }

        const valA = a[key];
        const valB = b[key];

        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return students;
  }, [initialStudents, filter, sort]);


  const handleSort = (key: keyof Student | 'riskPrediction') => {
    const direction = (sort.key === key && sort.direction === 'asc') ? 'desc' : 'asc';
    setSort({ key, direction });
  }

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
              {sortedAndFilteredStudents.length ? (
                sortedAndFilteredStudents.map((student) => (
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
