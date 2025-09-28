'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterPlot,
  Scatter,
  Histogram
} from 'recharts';
import { CircleCheck as CheckCircle2, Clock, CircleAlert as AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface DatasetAnalysisProps {
  datasetId: string;
}

const mockPipelineSteps = [
  { id: 1, name: 'Quality Control', status: 'completed', progress: 100 },
  { id: 2, name: 'Sequence Alignment', status: 'completed', progress: 100 },
  { id: 3, name: 'Clustering Analysis', status: 'in-progress', progress: 75 },
  { id: 4, name: 'Taxonomic Classification', status: 'pending', progress: 0 },
  { id: 5, name: 'Novelty Assessment', status: 'pending', progress: 0 },
  { id: 6, name: 'Report Generation', status: 'pending', progress: 0 }
];

const mockSummaryData = {
  totalSequences: 25847,
  clustersFormed: 1234,
  novelClusters: 267,
  classificationRate: 78.4
};

const mockClusterData = [
  { 
    id: 'C001', 
    size: 1245, 
    noveltyScore: 89, 
    dbMatch: 'Partial match - Bacteroidetes',
    status: 'needs-review'
  },
  { 
    id: 'C002', 
    size: 987, 
    noveltyScore: 23, 
    dbMatch: 'Strong match - E. coli',
    status: 'classified'
  },
  { 
    id: 'C003', 
    size: 834, 
    noveltyScore: 92, 
    dbMatch: 'No match found',
    status: 'novel'
  },
  { 
    id: 'C004', 
    size: 723, 
    noveltyScore: 15, 
    dbMatch: 'Strong match - Vibrio sp.',
    status: 'classified'
  },
  { 
    id: 'C005', 
    size: 612, 
    noveltyScore: 76, 
    dbMatch: 'Weak match - Archaea',
    status: 'needs-review'
  }
];

const mockClusterSizeData = [
  { sizeRange: '1-10', count: 234 },
  { sizeRange: '11-50', count: 156 },
  { sizeRange: '51-100', count: 89 },
  { sizeRange: '101-500', count: 67 },
  { sizeRange: '500+', count: 23 }
];

export function DatasetAnalysis({ datasetId }: DatasetAnalysisProps) {
  const [expandedClusters, setExpandedClusters] = useState<string[]>([]);

  const toggleCluster = (clusterId: string) => {
    setExpandedClusters(prev => 
      prev.includes(clusterId) 
        ? prev.filter(id => id !== clusterId)
        : [...prev, clusterId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getClusterStatusBadge = (status: string) => {
    const variants = {
      'classified': 'default',
      'novel': 'destructive',
      'needs-review': 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dataset Analysis</h1>
          <p className="text-muted-foreground">
            Dataset ID: {datasetId} • DeepSea_01_2024
          </p>
        </div>
      </div>

      {/* Pipeline Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Progress</CardTitle>
          <CardDescription>Processing steps for this dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPipelineSteps.map((step) => (
              <div key={step.id} className="flex items-center space-x-4">
                {getStatusIcon(step.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{step.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {step.progress}%
                    </span>
                  </div>
                  <Progress value={step.progress} className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sequences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSummaryData.totalSequences.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clusters Formed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSummaryData.clustersFormed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Novel Clusters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockSummaryData.novelClusters}</div>
            <p className="text-xs text-muted-foreground">
              {((mockSummaryData.novelClusters / mockSummaryData.clustersFormed) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classification Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSummaryData.classificationRate}%</div>
            <Progress value={mockSummaryData.classificationRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clusters">Cluster Browser</TabsTrigger>
          <TabsTrigger value="taxonomy">Taxonomy</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cluster Size Distribution</CardTitle>
                <CardDescription>Number of clusters by size range</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockClusterSizeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sizeRange" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Novelty Score Distribution</CardTitle>
                <CardDescription>Distribution of novelty scores across clusters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded">
                  <p className="text-muted-foreground">Histogram visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clusters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cluster Browser</CardTitle>
              <CardDescription>Detailed view of all identified clusters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cluster ID</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Novelty Score</TableHead>
                    <TableHead>Database Match</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockClusterData.map((cluster) => (
                    <>
                      <TableRow key={cluster.id}>
                        <TableCell className="font-medium">{cluster.id}</TableCell>
                        <TableCell>{cluster.size}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{cluster.noveltyScore}%</span>
                            <Progress value={cluster.noveltyScore} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{cluster.dbMatch}</TableCell>
                        <TableCell>{getClusterStatusBadge(cluster.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCluster(cluster.id)}
                          >
                            {expandedClusters.includes(cluster.id) ? 
                              <ChevronDown className="h-4 w-4" /> : 
                              <ChevronRight className="h-4 w-4" />
                            }
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedClusters.includes(cluster.id) && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-muted/50">
                            <div className="p-4 space-y-2">
                              <h4 className="font-medium">Cluster Details</h4>
                              <p className="text-sm text-muted-foreground">
                                Representative sequence: ATCGATCGATCGATCG...
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Annotations: Marine bacterium, 16S rRNA
                              </p>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">View Alignment</Button>
                                <Button size="sm" variant="outline">Export Sequences</Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxonomy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taxonomic Classification</CardTitle>
              <CardDescription>Breakdown of taxonomic assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded">
                <p className="text-muted-foreground">Sunburst chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Metadata</CardTitle>
              <CardDescription>Sample collection and environmental data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Sample Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Location:</span> Pacific Deep Sea Trench</p>
                    <p><span className="font-medium">Depth:</span> 2,500-3,000m</p>
                    <p><span className="font-medium">Temperature:</span> 2-4°C</p>
                    <p><span className="font-medium">Collection Date:</span> 2024-01-15</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Chemical Parameters</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">pH:</span> 7.8</p>
                    <p><span className="font-medium">Salinity:</span> 34.7 ppt</p>
                    <p><span className="font-medium">Dissolved O₂:</span> 6.2 mg/L</p>
                    <p><span className="font-medium">Nutrients:</span> High nitrates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}