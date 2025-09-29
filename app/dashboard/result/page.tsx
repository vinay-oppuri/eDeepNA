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
    phylogeneticTreeUrl: 'data:image/png;base64,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',
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
    phylogeneticTreeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAsVBMVEX///8AAABQUFCwsbGSk5PU1dXn5+c2NjdWV1d7e3upqqqYmJgPY25hipIcHR3t7e709PQqKyuCg4PExMRERUWJiooAWmbLy8ttbW3t8vL3+vrC0tUAU2CMqK7N2929ztGtwsbh6uuYs7hulZzX4uR6nqRHfIUAS1nR0dFjY2MtanWiur9YhY07dX8AQlGUrrQPERJ5mJ4mZ3I6eYJPgopojJMZGxtHR0clJia6u7s8PT3Z4C0SAAAIz0lEQVR4nO2de1+iShiAoU1bC1arI8kgw3CtuGSR1rbf/4MdRNuDvBxBnEm09/lj9ceOzDzM7Z0BTZIQBEEQBEEQBEEQ5DTQdcoOXYaDELEwpIcuxCFgSjCzDl2Ig2Do3khwFoR8vtqCc2qMpSRJEnpC89BDRcvblOeb94bQrJqj08glc7H1YAS6nlc5VVPmC81qFyJVT8T2cU9z1Xz4JK5jdWc4GcWaKjYHnVksb1PeXGxGu8GY8CxmL25e47bi+92ZOWliWLrQHAw1NvMxTY8cR+w4ugvGPA7ElsaIVOYs3xBKqdhrvBM2NQSXxs7G9fw1Se67M7gZYZiKrHGiREqofPqajsCsdsMxXLFzjGEbnpfXuDfVtO7UuGeomtg+TjVzHSEZjtOZmDWL3SSLCM5i9pRXdNbH592pcevJeBE7uequ4uYVTR2XmkKz2gXmJoLX43T2uThjbNqVRUpW45EteHUmzdaxekZnAjfCbMtigiO3xTpyy5al9TXu2MFXjAP63IoXseDIzVlHbjRusCxNzZdAaHFW0Nh1XVXsHEM8mqxyMKP6kEG9txKhxVlhsyWiA2hl/UpfWH1iXRI8u34h67Zra1HI6tJaKYsEF+fLILa92npKpFntPJ6aX9LUM6gleD3u3a83G0mSarXDSaCqgneE1rCp6F1WGv99a9XnpJvm1/Rxyxc9mNDPGrc1bcq2p33VlFSJt6fhhPU0vRcbTxGb2vktCy+pvcb2kqHQ4vyFENFNy9XUPAtbS+p2sh1TfU1cweVZYSsarHGfaoxbDkaiq/nZGuy52bZHKf8hh+kqiJUd5rKy+ChQTbAHTiS9XYmMxJ6z7HXOVDWuidXVZB4EL62y2UZixsDHYHNYGj+hoL2xKJy2M/fTPEJfroesmumM0oRa/Jt6RRxMdY+5sJODRpAdmicz1ipbGi3vpNjqwlUXtauzKbXCVrlsxdJLV9zWHC3VgKWapLPyMWJS1mo1Y0zzFq5nTcaGXa1MpCj8l6Wu5jRqRkSTbHjZvZYRnhePVndLvVDy67eeqIDJNWEWWOt6oQJrPIgTsHA20rjd5hx9un9iyzdkPq0PWX1FA41tb0wNnjRa6Dbo4ySCO68RUx3QCH1vp3mvwaMXU6KnO5yxGYR6oLUaqe+Wq4G4kgH6BEm0oHw19Fff57xfEmQjIN8zLk9qM1BMO3JmoP05aXnndcgsy4Q7Fq5icb7pTWYO/0iSKgFwtEOlPD3PzFnos9JHY3WhCt6cy1GJznse9+dqGoAxqyJyc8zZDE7Z2UxY7ihBGCQh56daprrNu48blmUYYFw2WBDAyE2yy6Og7atGwDaPURraxThLV1pSUDUVjf8dVWOhVsyjOhirs3ncK8/jRhLGanlUJprHCgl1LVHbECqFc4qYxwM3Av2Hur4POr6bpOCyR1XTK9OUQnPRtXa3xtSCuKUo/G8zxcyJy0Om5zghjCoimDmNbTDhk83NEh7iGjX4bzba0mphXETPFkSgrc+UCOzxWvcVWzXzqDhq8BBXLMZf3Fq4oGRGEoDVGXl1YGyre54HZlg3nhdGdR7iRpjwnzSVGQOVm9U4HE7mAZz3shKVJ/ws9vH9wmDAQxxEhzyIHQv0XUPztbS8k02cyrsZ5UWlZVmseCl5iM9NWDl74y8WoGTMzCJZrRSZZK0aRPVZH4c7MGSjlDzE/copd0+IREFDsqaqZmmlw0mQKkp5rB+NYCsMgrAYwHAQj7KlYauTbOOVTeFmvRfp5QcVSCgZZvmRNOZL5QBeklLJLoyCbcVj7b/3AkLWrCLDqDR26LFVcX+cpG5ixmzjWBaqKPelpq7GijvnUOOscI1jNea/2eiZeqkZkZkXsQisNnUzkkoPepLI1EG3X8I5wiROdx5+RBAEQZBD0bsFhx7kj4qEg2uwzf/43Ks64/OkfKj/dgXT3ckP4Nj4+a7ijMPff8Cxy+cfFSl34KdcUaLLioQTGYj/I1eKyz/Lh/ryGKa7laHkQIb1kInLb+DYVWUhm3Mry6Ayvkj8bgfxX+DYvuK/ZVkuP0TzHcQvM295AEp08uJDOadU/G8gPliJv5dLdOriPXnN5sxw+uL9Xq//Li//LZXo1MWXnFXN41WxwX7i5zBdF8Wv+oDh417iZ+fjEueTDopXs494JV0T74/PP/kl3/x9fw52jRuLS8NPehdno8/3fbgNfVjxAhcgrCvSXPwvQ/l6W34dEu9v+d8W4n0UrwTFN0DxAijeFhSvBMUrQfENULwKFK+mQ+K94f8yOmnx7bQRJ1su5aQr4u+/rwv8lp+vN6i+hbRdvIaOiJMi0oM82DxS+XTh9mXpxpW8vniTNw+8Vd47+3rxTXrg3kN1qi3iZcYV2zAAFC+A4m1B8QageE0qFK8HxbeB4gVQvC0o3gAUr0mF4vWMKx5vBIxOUnxyU8vgBMVv6jYm1oAPHrv4ww/Ax5k8BgfBB49dvIpJk35/muINRnoUbwuKNwDFa1KheDtQfBso3hYUbwCK16RC8XZ8Y/HbUR3k/CTFG4HiO3I5yZ+66KA4pC+f8TvX+eRjaX4U4g/yI7dzjQZnk+UzbN9OXOoP8o2sbyc++nl1vvw+1VGI33EUH56P8i8YHYk4+PWF1ozebwZHVOP8xPvj1d/k+HbiZDCYLNv6UYh/NMq4EXe9H5eXyyo/CvHLqq9ht6M/fLg7nsiNo7g0upRul6u/byf++Ovn5GhG9Sv4YzXtWT9qfhTi433XoBWIEP8D7/3uxcfjUYg/NLzXvxPHIF74wYE6JvL7VaOE4wZ3zHeEv/gO3Mo3fE+4AwcW53zCHUDxBqA4L1D8AKB4A1CcFyh+AFC8ASjOi+MR57ymuDsa8bcLrlwfjTh3jkOcwN+wrGB4Id81SpgnFmdWwy7iDZFl0X+inQdCxLmfUgAozg8U7zQozg8U7zQozo2an1fuCijODRTvNvzFexyfsRaICHHuj4KIgL/4w3HU+CP83Yk96U8q/jYIgiAIgiAIgiDI9+VfHTzrdYY5C/sAAAAASUVORK5CYII=',
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
    phylogeneticTreeUrl: 'data:image/png;base64,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',
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
    phylogeneticTreeUrl: 'data:image/png;base64,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',
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
