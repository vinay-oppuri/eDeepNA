'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Send, AArrowDown as DNA, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react';

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
  {
    id: 'Q001',
    sequence: 'ATCGATCGATCGATCGATCGATCGATCG',
    similarity: 95.6,
    dbMatch: 'Escherichia coli 16S rRNA',
    taxonomy: 'Bacteria; Proteobacteria; Gammaproteobacteria; Enterobacteriales; Enterobacteriaceae; Escherichia',
    noveltyScore: 12.3,
    timestamp: new Date('2024-01-20T14:30:00')
  },
  {
    id: 'Q002',
    sequence: 'GCTAGCTAGCTAGCTAGCTAGCTAGCT',
    similarity: 23.4,
    dbMatch: null,
    taxonomy: null,
    noveltyScore: 87.6,
    timestamp: new Date('2024-01-20T15:15:00')
  },
  {
    id: 'Q003',
    sequence: 'TGCATGCATGCATGCATGCATGCATGC',
    similarity: 78.9,
    dbMatch: 'Marine bacterium clone',
    taxonomy: 'Bacteria; Bacteroidetes',
    noveltyScore: 45.2,
    timestamp: new Date('2024-01-20T16:00:00')
  }
];

export function QueryAnalysis() {
  const [newQuery, setNewQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmitQuery = async () => {
    if (!newQuery.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setNewQuery('');
    }, 3000);
  };

  const getResultIcon = (noveltyScore: number) => {
    if (noveltyScore > 70) {
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    } else if (noveltyScore < 30) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else {
      return <DNA className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNoveltyBadge = (score: number) => {
    if (score > 70) return <Badge variant="destructive">Highly Novel</Badge>;
    if (score > 40) return <Badge variant="secondary">Moderately Novel</Badge>;
    return <Badge variant="default">Known</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Query Analysis</h1>
          <p className="text-muted-foreground">
            Single sequence analysis and similarity search
          </p>
        </div>
      </div>

      {/* Query Input */}
      <Card>
        <CardHeader>
          <CardTitle>New Query</CardTitle>
          <CardDescription>
            Enter DNA sequence(s) for similarity analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter DNA sequence (FASTA format supported)..."
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSubmitQuery}
              disabled={!newQuery.trim() || isAnalyzing}
            >
              <Send className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Query Results */}
      <Card>
        <CardHeader>
          <CardTitle>Query Results</CardTitle>
          <CardDescription>
            Analysis results for submitted sequences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-4">
              {mockQueryResults.map((result, index) => (
                <div key={result.id}>
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getResultIcon(result.noveltyScore)}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{result.id}</span>
                          {getNoveltyBadge(result.noveltyScore)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {result.timestamp.toLocaleTimeString()}
                        </span>
                      </div>

                      <div className="bg-muted/50 p-3 rounded text-sm font-mono">
                        {result.sequence}...
                      </div>

                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Similarity:</span>
                          <span className={
                            result.similarity > 90 ? 'text-green-600' :
                            result.similarity > 70 ? 'text-blue-600' :
                            result.similarity > 40 ? 'text-orange-600' :
                            'text-red-600'
                          }>
                            {result.similarity}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="font-medium">Novelty Score:</span>
                          <span className={
                            result.noveltyScore > 70 ? 'text-red-600' :
                            result.noveltyScore > 40 ? 'text-orange-600' :
                            'text-green-600'
                          }>
                            {result.noveltyScore}%
                          </span>
                        </div>

                        {result.dbMatch && (
                          <div>
                            <span className="font-medium">Best Match:</span>
                            <p className="text-muted-foreground mt-1">{result.dbMatch}</p>
                          </div>
                        )}

                        {result.taxonomy && (
                          <div>
                            <span className="font-medium">Taxonomy:</span>
                            <p className="text-muted-foreground mt-1 text-xs">{result.taxonomy}</p>
                          </div>
                        )}

                        {!result.dbMatch && (
                          <div className="p-2 bg-orange-50 border-l-4 border-orange-400">
                            <p className="text-orange-800 text-xs">
                              <AlertTriangle className="h-3 w-3 inline mr-1" />
                              No significant database matches found. This may represent a novel sequence.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Alignment
                        </Button>
                        <Button size="sm" variant="outline">
                          Export Result
                        </Button>
                        {result.noveltyScore > 70 && (
                          <Button size="sm" variant="secondary">
                            Flag for Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {index < mockQueryResults.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}