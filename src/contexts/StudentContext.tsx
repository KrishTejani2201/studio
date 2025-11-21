
'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Student } from '@/lib/types';
import { initialStudents } from '@/lib/data';

interface StudentsContextType {
  students: Student[];
  addStudents: (newStudents: Student[]) => void;
  isLoading: boolean;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isLoading, setIsLoading] = useState(false);

  const addStudents = (newStudents: Student[]) => {
    setStudents(prevStudents => [...prevStudents, ...newStudents]);
  };
  
  const value = useMemo(() => ({ students, addStudents, isLoading }), [students, isLoading]);

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
}
