'use client';

import { Upload, Table, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, name: 'Upload File', icon: Upload },
  { id: 2, name: 'Map Columns', icon: Table },
  { id: 3, name: 'Preview & Confirm', icon: Check },
];

type CsvData = {
    headers: string[];
    rows: string[][];
}

const requiredFields = ['name', 'grade', 'averageScore', 'attendance'];

export function UploadWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        toast({
            variant: 'destructive',
            title: 'Invalid File Type',
            description: 'Please upload a CSV file.',
        });
        setFileName('');
        setCsvData(null);
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        const headers = rows.shift()?.split(',').map(h => h.trim()) || [];
        const parsedRows = rows.map(row => row.split(',').map(cell => cell.trim()));
        setCsvData({ headers, rows: parsedRows });
      };
      reader.readAsText(file);
    }
  };

  const handleMappingChange = (field: string, csvHeader: string) => {
    setColumnMapping(prev => ({ ...prev, [field]: csvHeader }));
  };

  const getPreviewData = () => {
    if (!csvData || Object.keys(columnMapping).length === 0) return [];
    
    const headerIndexMap: Record<string, number> = {};
    csvData.headers.forEach((header, index) => {
        headerIndexMap[header] = index;
    });

    return csvData.rows.map(row => {
        const rowData: Record<string, string> = {};
        for (const field of requiredFields) {
            const csvHeader = columnMapping[field];
            const index = headerIndexMap[csvHeader];
            rowData[field] = row[index] || '';
        }
        return rowData;
    }).slice(0, 5); // show first 5 rows for preview
  };

  const isMappingComplete = requiredFields.every(field => columnMapping[field]);
  
  const progress = (currentStep / steps.length) * 100;

  const goToNext = () => {
    if (currentStep === 1 && !csvData) return;
    if (currentStep === 2 && !isMappingComplete) {
        toast({
            variant: 'destructive',
            title: 'Mapping Incomplete',
            description: 'Please map all required fields.',
        });
        return;
    }
    setCurrentStep(s => Math.min(steps.length, s + 1));
  }

  const goToPrev = () => setCurrentStep(s => Math.max(1, s - 1));

  return (
    <Card className="w-full max-w-4xl">
        <CardHeader>
            <CardTitle className="text-2xl font-headline">Upload Student Data</CardTitle>
            <CardDescription>Follow the steps to import your class data from a CSV file.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                <Progress value={progress} className="h-2" />
                <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
                {steps.map(step => (
                    <li key={step.id} className={`flex items-center justify-center text-center ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                        <span className={`flex items-center gap-2 font-semibold`}>
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${currentStep >= step.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                {currentStep > step.id ? <Check size={16} /> : step.id}
                            </div>
                            <span>{step.name}</span>
                        </span>
                    </li>
                ))}
                </ol>
            </div>

            {currentStep === 1 && (
                <div className="space-y-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="text-xl font-semibold">Drag & drop your CSV file here</h3>
                    <p className="text-muted-foreground">or click to browse</p>
                    <Label htmlFor="file-upload" className="cursor-pointer font-semibold text-primary underline-offset-4 hover:underline">
                        Select a file
                    </Label>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".csv" />
                    {fileName && <p className="text-sm text-muted-foreground">Selected: {fileName}</p>}
                </div>
            )}

             {currentStep === 2 && csvData && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Map your columns</h3>
                    <p className="text-muted-foreground">Match the columns from your CSV file to the required data fields.</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {requiredFields.map(field => (
                            <div key={field} className="flex items-center justify-between rounded-md border p-4">
                                <Label htmlFor={`map-${field}`} className="font-semibold capitalize">{field.replace('averageScore', 'Average Score')}</Label>
                                <Select onValueChange={value => handleMappingChange(field, value)} value={columnMapping[field]}>
                                    <SelectTrigger id={`map-${field}`} className="w-[200px]">
                                        <SelectValue placeholder="Select column..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {csvData.headers.map(header => (
                                            <SelectItem key={header} value={header}>{header}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {currentStep === 3 && csvData && (
                <div className="space-y-4">
                     <h3 className="text-xl font-semibold">Preview Data</h3>
                    <p className="text-muted-foreground">Review the first few rows of your data with the applied mapping.</p>
                    <div className="rounded-md border">
                        <UiTable>
                            <TableHeader>
                                <TableRow>
                                    {requiredFields.map(field => (
                                        <TableHead key={field} className="capitalize">{field.replace('averageScore', 'Avg. Score')}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getPreviewData().map((row, index) => (
                                    <TableRow key={index}>
                                        {requiredFields.map(field => (
                                            <TableCell key={field}>{row[field]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </UiTable>
                    </div>
                </div>
            )}


            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={goToPrev} disabled={currentStep === 1}>
                    <ArrowLeft className="mr-2" /> Back
                </Button>
                {currentStep < steps.length ? (
                    <Button onClick={goToNext} disabled={(currentStep === 1 && !fileName) || (currentStep === 2 && !isMappingComplete)}>
                        Next Step <ArrowRight className="ml-2" />
                    </Button>
                ) : (
                    <Button onClick={() => toast({ title: 'Import Complete!', description: 'Your data has been successfully imported.'})}>
                       <Check className="mr-2" /> Confirm & Import
                    </Button>
                )}
            </div>

        </CardContent>
    </Card>
  );
}
