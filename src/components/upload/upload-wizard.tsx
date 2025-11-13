'use client';

import { Upload, Table, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';

const steps = [
  { id: 1, name: 'Upload File', icon: Upload },
  { id: 2, name: 'Map Columns', icon: Table },
  { id: 3, name: 'Preview & Confirm', icon: Check },
];

export function UploadWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };
  
  const progress = (currentStep / steps.length) * 100;

  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="text-2xl font-headline">Upload Student Data</CardTitle>
            <CardDescription>Follow the steps to import your class data from a CSV/XLSX file.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                <Progress value={progress} className="h-2" />
                <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                {steps.map(step => (
                    <li key={step.id} className="flex items-center justify-center text-center">
                    <span className={`flex items-center gap-2 ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                        <step.icon className="h-5 w-5" />
                        <span>{step.name}</span>
                    </span>
                    </li>
                ))}
                </ol>
            </div>

            {currentStep === 1 && (
                <div className="space-y-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="text-xl font-semibold">Drag & drop your file here</h3>
                    <p className="text-muted-foreground">or click to browse</p>
                    <Label htmlFor="file-upload" className="cursor-pointer text-primary underline">
                        Select a file
                    </Label>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".csv, .xlsx" />
                    {fileName && <p className="text-sm text-muted-foreground">Selected: {fileName}</p>}
                </div>
            )}

             {currentStep === 2 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Map your columns</h3>
                    <p className="text-muted-foreground">This is a placeholder for column mapping UI.</p>
                </div>
            )}

            {currentStep === 3 && (
                <div className="space-y-4">
                     <h3 className="text-xl font-semibold">Preview Data</h3>
                    <p className="text-muted-foreground">This is a placeholder for data preview table.</p>
                </div>
            )}


            <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(s => Math.max(1, s-1))} disabled={currentStep === 1}>
                    Back
                </Button>
                <Button onClick={() => setCurrentStep(s => Math.min(steps.length, s+1))} disabled={currentStep === steps.length || !fileName}>
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

        </CardContent>
    </Card>
  );
}
