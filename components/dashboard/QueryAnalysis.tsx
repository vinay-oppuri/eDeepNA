'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
    Send,
    Dna,
    TriangleAlert as AlertTriangle,
    CircleCheck as CheckCircle,
    ChevronDown,
    ChevronUp,
    Loader,
    DatabaseZap,
    Wand2,
    Search as SearchIcon,
    ScatterChart,
    Tags,
    Sigma,
    GitGraph,
    FileText,
    ArrowRight
} from 'lucide-react';

// --- TYPE DEFINITIONS AND MOCK DATA ---
interface QueryResult {
    id: string;
    sequence: string;
    similarity: number;
    dbMatch: string | null;
    taxonomy: string | null;
    noveltyScore: number;
    timestamp: Date;
}

const mockQueryResults: QueryResult[] = [
    { id: 'Q001', sequence: 'ATCGATCGATCG...ATCG', similarity: 95.6, dbMatch: 'Escherichia coli 16S rRNA', taxonomy: 'Bacteria; Proteobacteria; ...', noveltyScore: 12.3, timestamp: new Date('2024-01-20T14:30:00') },
    { id: 'Q002', sequence: 'GCTAGCTAGCTA...AGCT', similarity: 23.4, dbMatch: null, taxonomy: null, noveltyScore: 87.6, timestamp: new Date('2024-01-20T15:15:00') },
    { id: 'Q003', sequence: 'TGCATGCATGCA...ATGC', similarity: 78.9, dbMatch: 'Marine bacterium clone', taxonomy: 'Bacteria; Bacteroidetes', noveltyScore: 45.2, timestamp: new Date('2024-01-20T16:00:00') }
];

const mockAlignment = { query: 'ATCGATCGATCG', match: 'ATCGTTCGATCG', alignment: '||| || |||||' };

const initialAnalysisSteps = [
    { name: 'Extracting Data', duration: 1500, progress: 0, status: 'pending', icon: DatabaseZap },
    { name: 'Cleaning Reads', duration: 2000, progress: 0, status: 'pending', icon: Wand2 },
    { name: 'Analyzing Sequences', duration: 3000, progress: 0, status: 'pending', icon: SearchIcon },
    { name: 'Detecting Clusters', duration: 2500, progress: 0, status: 'pending', icon: ScatterChart },
    { name: 'Annotating Genes', duration: 2800, progress: 0, status: 'pending', icon: Tags },
    { name: 'Estimating Abundance', duration: 1800, progress: 0, status: 'pending', icon: Sigma },
    { name: 'Building Networks', duration: 2200, progress: 0, status: 'pending', icon: GitGraph },
    { name: 'Generating Reports', duration: 1500, progress: 0, status: 'pending', icon: FileText },
];

// --- COMPONENT ---
export function QueryAnalysis() {
  const router = useRouter();
  const [newQuery, setNewQuery] = useState('');
  const [analysisState, setAnalysisState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [analysisSteps, setAnalysisSteps] = useState(initialAnalysisSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const [latestResultId, setLatestResultId] = useState<string | null>(null);

  useEffect(() => {
    if (analysisState !== 'running') {
      return;
    }

    if (currentStepIndex >= analysisSteps.length) {
      setAnalysisState('completed');
      const newResultId = `Q${String(mockQueryResults.length + 1).padStart(3, '0')}`;
      setLatestResultId(newResultId);
      return;
    }
    
    setAnalysisSteps(steps => steps.map((step, index) => 
        index === currentStepIndex ? { ...step, status: 'running' } : step
    ));

    const currentStepData = analysisSteps[currentStepIndex];
    const updateInterval = currentStepData.duration / 100;

    const timer = setInterval(() => {
      setAnalysisSteps(prevSteps => {
        const newSteps = [...prevSteps];
        if (newSteps[currentStepIndex].progress < 100) {
          newSteps[currentStepIndex].progress += 5; // Faster progress for better UX
          return newSteps;
        } else {
          clearInterval(timer);
          newSteps[currentStepIndex].progress = 100; // Ensure it ends at 100
          newSteps[currentStepIndex].status = 'completed';
          setCurrentStepIndex(i => i + 1);
          return newSteps;
        }
      });
    }, updateInterval);

    return () => clearInterval(timer);

  }, [analysisState, currentStepIndex]);

  const handleSubmitQuery = async () => {
    if (!newQuery.trim()) return;
    setCurrentStepIndex(0);
    setLatestResultId(null);
    setAnalysisSteps(initialAnalysisSteps.map(s => ({ ...s, progress: 0, status: 'pending' })));
    setAnalysisState('running');
  };

  const getResultIcon = (noveltyScore: number) => {
    if (noveltyScore > 70) return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    if (noveltyScore < 30) return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <Dna className="h-5 w-5 text-blue-500" />;
  };

  const getNoveltyBadge = (score: number) => {
    if (score > 70) return <Badge variant="destructive">Highly Novel</Badge>;
    if (score > 40) return <Badge variant="secondary">Moderately Novel</Badge>;
    return <Badge variant="default">Known</Badge>;
  };

  const handleToggleAnalysis = (e: React.MouseEvent, queryId: string) => {
    e.stopPropagation(); // Prevent card click from triggering navigation
    setSelectedQuery(prev => (prev === queryId ? null : queryId));
  };

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    router.push(path);
  }

  const isAnalyzing = analysisState === 'running';
  const isComplete = analysisState === 'completed';
  const timelineProgress = isComplete ? 100 : (currentStepIndex / initialAnalysisSteps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Query Analysis</h1>
          <p className="text-muted-foreground">Single sequence analysis and similarity search</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Query</CardTitle>
          <CardDescription>Enter a sequence or accession ID to run a BLAST search.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="sequence-input">Enter Accession Number(s), FASTA, or Raw Sequence(s)</Label>
                <Input id="sequence-input" placeholder="e.g., NT_033777.3 or >my_sequence..." value={newQuery} onChange={(e) => setNewQuery(e.target.value)} className="flex-1" disabled={isAnalyzing} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="Enter a title for your search" disabled={isAnalyzing} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="database">Database</Label>
                    <Select disabled={isAnalyzing}>
                        <SelectTrigger id="database"><SelectValue placeholder="Select a database" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="nt">Nucleotide collection (nt)</SelectItem>
                            <SelectItem value="nr">Non-redundant protein sequences (nr)</SelectItem>
                            <SelectItem value="refseq_rna">RefSeq RNA</SelectItem>
                            <SelectItem value="pdb">Protein Data Bank (PDB)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Select disabled={isAnalyzing}>
                        <SelectTrigger id="program"><SelectValue placeholder="Select a program" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="blastn">blastn (somewhat similar sequences)</SelectItem>
                            <SelectItem value="megablast">megablast (highly similar sequences)</SelectItem>
                            <SelectItem value="blastp">blastp (protein-protein)</SelectItem>
                            <SelectItem value="blastx">blastx (translated nucleotide to protein)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          <Button onClick={handleSubmitQuery} disabled={!newQuery.trim() || isAnalyzing} className="w-32">
            {isAnalyzing ? <><Loader className="h-4 w-4 mr-2 animate-spin" /><span>Analyzing...</span></> : <><Send className="h-4 w-4 mr-2" /><span>Analyze</span></>}
          </Button>
        </CardContent>
      </Card>

      {(isAnalyzing || isComplete) && (
        <Card className="mt-6 transition-all duration-500 ease-in-out">
            <CardHeader>
                <CardTitle className={`flex items-center space-x-3 transition-colors duration-500 ${isComplete ? 'text-green-500' : ''}`}>
                {isComplete ? <CheckCircle className="h-7 w-7" /> : <Loader className="h-6 w-6 animate-spin text-primary" />}
                <span className="text-2xl">{isComplete ? 'Analysis Complete' : 'Analysis in Progress'}</span>
                </CardTitle>
                <CardDescription>{isComplete ? 'Your results are now available.' : 'Your query is being processed through our state-of-the-art bioinformatics pipeline.'}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="relative space-y-8">
                    <div className="absolute left-5 top-0 h-full w-0.5 bg-border -translate-x-1/2" />
                    <div
                        className="absolute left-5 top-0 h-full w-0.5 bg-green-500 -translate-x-1/2 transition-all duration-500 ease-out"
                        style={{ height: `${timelineProgress}%` }}
                    />
                    {analysisSteps.map((step, index) => {
                        const isStepRunning = step.status === 'running';
                        const isStepComplete = step.status === 'completed';
                        return (
                            <div key={step.name} className="relative flex items-start pl-12">
                                <div className={`absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ease-in-out ${isStepRunning ? 'border-primary bg-primary/10 shadow-lg shadow-primary/30 animate-pulse' : isStepComplete ? 'border-green-500 bg-green-500/10' : 'border-border bg-card'}`}>
                                    {isStepComplete ? (
                                        <CheckCircle className="h-6 w-6 text-green-500" />
                                    ) : isStepRunning ? (
                                        <step.icon className="h-5 w-5 text-primary" />
                                    ) : (
                                        <step.icon className="h-5 w-5 text-muted-foreground/50" />
                                    )}
                                </div>
                                <div className={`pt-1.5 transition-all duration-500 ${isStepComplete && !isComplete ? 'opacity-60' : 'opacity-100'}`}>
                                    <p className={`font-semibold tracking-wide ${isStepRunning ? 'text-primary' : ''}`}>{step.name}</p>
                                    <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Progress value={step.progress} className={`h-1.5 flex-1 [&>div]:bg-gradient-to-r ${isStepComplete ? '[&>div]:from-green-400 [&>div]:to-green-600' : '[&>div]:from-primary/80 [&>div]:to-primary'}`} />
                                        <span className="w-10 text-right font-mono text-xs">{Math.round(step.progress)}%</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
            {isComplete && latestResultId && (
                <CardFooter>
                    <Link href={`/dashboard/result/${latestResultId}`} passHref legacyBehavior>
                        <Button className="w-full">View Full Report <ArrowRight className="h-4 w-4 ml-2" /></Button>
                    </Link>
                </CardFooter>
            )}
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Query Results</CardTitle>
          <CardDescription>Analysis results for submitted sequences</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-4">
              {mockQueryResults.map((result) => (
                <Link key={result.id} href={`/dashboard/result/${result.id}`} passHref legacyBehavior>
                <a className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg transition-all group-hover:shadow-md group-hover:border-primary/50">
                    <div className="flex-shrink-0 pt-1">{getResultIcon(result.noveltyScore)}</div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{result.id}</span>
                          {getNoveltyBadge(result.noveltyScore)}
                        </div>
                        <span className="text-sm text-muted-foreground">{result.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <div className="bg-muted/50 p-3 rounded text-sm font-mono">{result.sequence}</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={(e) => handleToggleAnalysis(e, result.id)}>
                          {selectedQuery === result.id ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                          {selectedQuery === result.id ? 'Hide Details' : 'View Details'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => handleNavigate(e, '#')}>Export</Button>
                        {result.noveltyScore > 70 && <Button size="sm" variant="secondary" onClick={(e) => handleNavigate(e, '#')}>Flag</Button>}
                      </div>
                      {selectedQuery === result.id && (
                        <div className="pt-4 space-y-4">
                            <Separator />
                            <h4 className="font-semibold">Detailed Analysis</h4>
                            <div className="grid gap-2 text-sm">
                              <div className="flex justify-between"><span className="font-medium">Similarity:</span><span className={result.similarity > 90 ? 'text-green-600' : result.similarity > 70 ? 'text-blue-600' : 'text-orange-600'}>{result.similarity}%</span></div>
                              <div className="flex justify-between"><span className="font-medium">Novelty Score:</span><span className={result.noveltyScore > 70 ? 'text-red-600' : 'text-orange-600'}>{result.noveltyScore}%</span></div>
                              {result.dbMatch && <div><span className="font-medium">Best Match:</span><p className="text-muted-foreground mt-1">{result.dbMatch}</p></div>}
                              {result.taxonomy && <div><span className="font-medium">Taxonomy:</span><p className="text-muted-foreground mt-1 text-xs">{result.taxonomy}</p></div>}
                              {!result.dbMatch && <div className="p-2 bg-orange-50 border-l-4 border-orange-400"><p className="text-orange-800 text-xs"><AlertTriangle className="h-3 w-3 inline mr-1" />No significant database matches found.</p></div>}
                            </div>
                            <h4 className="font-semibold">Alignment</h4>
                            <div className="font-mono bg-muted/50 p-3 rounded"><p>Query: {mockAlignment.query}</p><p>       {mockAlignment.alignment}</p><p>Match: {mockAlignment.match}</p></div>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
