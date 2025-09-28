'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dna, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for a single query result - in a real app this would be fetched based on an ID
const mockResult = {
  id: 'Q001',
  sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG',
  similarity: 95.6,
  dbMatch: 'Escherichia coli strain K-12 substr. MG1655 16S ribosomal RNA, partial sequence',
  taxonomy: 'Bacteria; Proteobacteria; Gammaproteobacteria; Enterobacteriales; Enterobacteriaceae; Escherichia',
  noveltyScore: 12.3,
  timestamp: new Date('2024-01-20T14:30:00'),
  length: 80,
  gcContent: 50,
  accession: 'NC_000913.3',
  alignment: {
    query:   'ATCGATCGATCGATCGATCG',
    match:   'ATCGTTCGATCGATCGATCG',
    alignment: '||| ||||||||||||||||',
    score: 180,
    bits: 350,
    eValue: 1e-90,
  }
};

const getNoveltyBadge = (score: number) => {
    if (score > 70) return <Badge variant="destructive">Highly Novel</Badge>;
    if (score > 40) return <Badge variant="secondary">Moderately Novel</Badge>;
    return <Badge variant="default">Known Organism</Badge>;
};

const getResultIcon = (noveltyScore: number) => {
    if (noveltyScore > 70) return <AlertTriangle className="h-8 w-8 text-orange-400" />;
    if (noveltyScore < 30) return <CheckCircle className="h-8 w-8 text-green-500" />;
    return <Dna className="h-8 w-8 text-blue-500" />;
};


export default function QueryResultPage() {
    const router = useRouter();

    // In a real app, you might get the query ID from the URL params
    // const { id } = useParams();
    // const result = fetchResult(id);
    const result = mockResult;

    if (!result) {
        return <div>Result not found</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </Button>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-start space-x-4">
                    <div className="flex-shrink-0">{getResultIcon(result.noveltyScore)}</div>
                    <div className="flex-1">
                        <CardTitle className="text-2xl">{result.dbMatch || 'Unknown Sequence'}</CardTitle>
                        <CardDescription>
                            Query ID: {result.id} | Analysis Date: {result.timestamp.toLocaleString()}
                        </CardDescription>
                        <div className="mt-2 flex items-center space-x-2">
                            {getNoveltyBadge(result.noveltyScore)}
                            <Badge variant="outline">Similarity: {result.similarity}%</Badge>
                            <Badge variant="outline">GC Content: {result.gcContent}%</Badge>
                        </div>
                    </div>
                    <div>
                        <Button>
                            <Download className="h-4 w-4 mr-2" />
                            Export Result
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="font-semibold text-lg">Sequence Alignment</h3>
                            <Card className="bg-muted/50">
                                <CardContent className="p-4">
                                    <pre className="font-mono text-sm whitespace-pre-wrap">
                                        <p>Query:   {result.alignment.query}</p>
                                        <p>         {result.alignment.alignment}</p>
                                        <p>Sbjct:   {result.alignment.match}</p>
                                    </pre>
                                </CardContent>
                            </Card>

                            <h3 className="font-semibold text-lg">Sequence Details</h3>
                            <Card>
                                <CardContent className="p-4">
                                    <p className="font-mono text-sm break-all">{result.sequence}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                             <h3 className="font-semibold text-lg">Analysis Summary</h3>
                             <Card>
                                 <CardContent className="p-4 space-y-3 text-sm">
                                     <div className="flex justify-between"><strong>Alignment Score:</strong> <span>{result.alignment.score}</span></div>
                                     <div className="flex justify-between"><strong>Bit Score:</strong> <span>{result.alignment.bits}</span></div>
                                     <div className="flex justify-between"><strong>E-value:</strong> <span>{result.alignment.eValue}</span></div>
                                     <div className="flex justify-between"><strong>Sequence Length:</strong> <span>{result.length} bp</span></div>
                                     <div className="flex justify-between"><strong>Accession:</strong> <span className="text-primary">{result.accession}</span></div>
                                 </CardContent>
                             </Card>

                            <h3 className="font-semibold text-lg">Taxonomic Classification</h3>
                            <Card>
                                 <CardContent className="p-4 text-sm">
                                    {result.taxonomy ? (
                                        <ul className="space-y-1">
                                            {result.taxonomy.split('; ').map((taxon, i) => (
                                                <li key={i} style={{paddingLeft: `${i * 10}px`}}>{taxon}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">No classification available.</p>
                                    )}
                                 </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
