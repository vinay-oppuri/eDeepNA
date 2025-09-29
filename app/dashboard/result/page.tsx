'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dna, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { PhylogeneticTree } from '@/components/dashboard/PhylogeneticTree';

// Mock data for a single query result - in a real app this would be fetched based on an ID
const mockResults: { [key: string]: any } = {
  Q001: {
    id: 'Q001',
    sequence:
      'ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG',
    similarity: 95.6,
    dbMatch:
      'Escherichia coli strain K-12 substr. MG1655 16S ribosomal RNA, partial sequence',
    taxonomy:
      'Bacteria; Proteobacteria; Gammaproteobacteria; Enterobacteriales; Enterobacteriaceae; Escherichia',
    noveltyScore: 12.3,
    timestamp: new Date('2024-01-20T14:30:00'),
    length: 80,
    gcContent: 50,
    accession: 'NC_000913.3',
    alignment: {
      query: 'ATCGATCGATCGATCGATCG',
      match: 'ATCGTTCGATCGATCGATCG',
      alignment: '||| ||||||||||||||||',
      score: 180,
      bits: 350,
      eValue: 1e-90,
    },
    phylogeneticTreeUrl: 'https://www.mobot.org/mobot/research/apweb/cladograms/Fig.1.Spermatophytes.gif',
  },
  Q002: {
    id: 'Q002',
    sequence:
      'GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA',
    similarity: 23.4,
    dbMatch: null,
    taxonomy: null,
    noveltyScore: 87.6,
    timestamp: new Date('2024-01-20T15:15:00'),
    length: 150,
    gcContent: 55,
    accession: 'N/A',
    alignment: {
      query: 'GCTAGCTAGCTAGCTAGC',
      match: 'GCTAGTTTGCTAGCTAGC',
      alignment: '|||||  |||||||||||',
      score: 140,
      bits: 280,
      eValue: 1e-70,
    },
    phylogeneticTreeUrl: 'https://www.researchgate.net/profile/Jonathan-Godfrey/publication/221915993/figure/fig2/AS:305538356957186@1449857442142/Phylogenetic-tree-of-vertebrate-species-This-tree-was-obtained-from-the-Tree-of-Life.png',
  },
  Q003: {
    id: 'Q003',
    sequence:
      'TGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC',
    similarity: 67.8,
    dbMatch: 'Marine bacterium clone',
    taxonomy: 'Bacteria; Bacteroidetes',
    noveltyScore: 45.2,
    timestamp: new Date('2024-01-20T16:00:00'),
    length: 200,
    gcContent: 45,
    accession: 'N/A',
    alignment: {
      query: 'TGCATGCATGCATGCATG',
      match: 'TGCATGCATGCATGCATG',
      alignment: '||||||||||||||||||',
      score: 200,
      bits: 400,
      eValue: 1e-100,
    },
    phylogeneticTreeUrl: 'https://i.pinimg.com/originals/b5/03/75/b50375932454646f2852654313a0e68d.gif',
  },
  Q004: { // Placeholder for dynamically generated results
    id: 'Q004',
    sequence:
      'AGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT',
    similarity: 88.2,
    dbMatch: 'Newly Discovered Bacterium',
    taxonomy: 'Bacteria; Firmicutes',
    noveltyScore: 75.0,
    timestamp: new Date(),
    length: 90,
    gcContent: 52,
    accession: 'N/A',
    alignment: {
      query: 'AGCTAGCTAGCTAGCTAG',
      match: 'AGCTAGCTAGCTAGCTAG',
      alignment: '||||||||||||||||||',
      score: 190,
      bits: 380,
      eValue: 1e-95,
    },
    phylogeneticTreeUrl: 'https://www.researchgate.net/publication/338279951/figure/fig1/AS:842240963792896@1577817539523/A-phylogenetic-tree-of-Felis-based-on-37-mitochondrial-genomes-The-phylogenetic-tree.png',
  },
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

function QueryResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultId = searchParams.get('id');
  const result = resultId ? mockResults[resultId] : null;

  if (!resultId) {
    return <div>Select a result to view details.</div>;
  }

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
              <h3 className="font-semibold text-lg">Phylogenetic Analysis</h3>
              <Card>
                <CardContent className="p-4">
                  <PhylogeneticTree imageUrl={result.phylogeneticTreeUrl} />
                </CardContent>
              </Card>

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
                  <div className="flex justify-between">
                    <strong>Alignment Score:</strong> <span>{result.alignment.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Bit Score:</strong> <span>{result.alignment.bits}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>E-value:</strong> <span>{result.alignment.eValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Sequence Length:</strong> <span>{result.length} bp</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Accession:</strong>{' '}
                    <span className="text-primary">{result.accession}</span>
                  </div>
                </CardContent>
              </Card>

              <h3 className="font-semibold text-lg">Taxonomic Classification</h3>
              <Card>
                <CardContent className="p-4 text-sm">
                  {result.taxonomy ? (
                    <ul className="space-y-1">
                      {result.taxonomy.split('; ').map((taxon: string, i: number) => (
                        <li key={i} style={{ paddingLeft: `${i * 10}px` }}>
                          {taxon}
                        </li>
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

// Wrap the component in Suspense to handle the initial render where searchParams are not yet available.
export default function QueryResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QueryResultPageContent />
        </Suspense>
    )
}
