'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, X } from 'lucide-react';

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  type: 'dataset' | 'query';
}

export function UploadDialog({ open, onClose, type }: UploadDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            setFiles([]);
            setName('');
            setDescription('');
            onClose();
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Upload {type === 'dataset' ? 'Dataset' : 'Query Sequences'}
          </DialogTitle>
          <DialogDescription>
            {type === 'dataset' 
              ? 'Upload DNA sequence datasets for comprehensive analysis'
              : 'Upload single or multiple sequences for similarity analysis'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">
              {type === 'dataset' ? 'Dataset Files' : 'Sequence Files'}
            </Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <div className="mt-4">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:underline">
                      Click to upload
                    </span>
                    <span className="text-sm text-muted-foreground"> or drag and drop</span>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".fasta,.fa,.fastq,.fq,.txt"
                    multiple={type === 'dataset'}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  FASTA, FASTQ, or plain text files (max 500MB each)
                </p>
              </div>
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files</Label>
                {files.map((file, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {type === 'dataset' ? 'Dataset Name' : 'Query Name'}
              </Label>
              <Input
                id="name"
                placeholder={
                  type === 'dataset' 
                    ? 'e.g., DeepSea_Pacific_2024' 
                    : 'e.g., Novel_sequence_01'
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder={
                  type === 'dataset'
                    ? 'Describe the sample collection site, conditions, and objectives...'
                    : 'Describe the sequence origin and analysis goals...'
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Upload Progress</Label>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={files.length === 0 || !name.trim() || isUploading}
            >
              {isUploading ? 'Uploading...' : `Upload ${type === 'dataset' ? 'Dataset' : 'Query'}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}