'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const mockKPIData = {
  totalDatasets: 42,
  totalClusters: 15847,
  novelClusters: 3421,
  classificationRate: 78.4
};

const mockTrendData = [
  { month: 'Jan', novel: 245, known: 1203 },
  { month: 'Feb', novel: 312, known: 1456 },
  { month: 'Mar', novel: 289, known: 1678 },
  { month: 'Apr', novel: 456, known: 1834 },
  { month: 'May', novel: 523, known: 2012 },
  { month: 'Jun', novel: 689, known: 2234 }
];

const mockTaxonomicData = [
  { name: 'Bacteria', value: 45, fill: '#8884d8' },
  { name: 'Archaea', value: 25, fill: '#82ca9d' },
  { name: 'Eukaryota', value: 20, fill: '#ffc658' },
  { name: 'Unknown', value: 10, fill: '#ff7c7c' }
];

const mockTopClusters = [
    { id: 'C001', size: 1245, novelty: 89, potential: 'Potential new family of viruses', taxonomicClues: 'Distant homology to *Bacteroidetes* phylum.', representativeSequence: '>rep_seq_1|cluster_C001\nATGCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTACGATCGATCGAT...', scoreDistribution: [ {name: '0-20', count: 10}, {name: '21-40', count: 30}, {name: '41-60', count: 80}, {name: '61-80', count: 120}, {name: '81-100', count: 95} ] },
    { id: 'C023', size: 987, novelty: 76, potential: 'Unclassified bacterial species', taxonomicClues: 'Contains genes associated with metabolic pathways in *Proteobacteria*.', representativeSequence: '>rep_seq_2|cluster_C023\nGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA...', scoreDistribution: [ {name: '0-20', count: 50}, {name: '21-40', count: 150}, {name: '41-60', count: 200}, {name: '61-80', count: 300}, {name: '81-100', count: 150} ] },
    { id: 'C045', size: 834, novelty: 92, potential: 'Possible archaeal phylum', taxonomicClues: 'No significant matches to known proteins or domains.', representativeSequence: '>rep_seq_3|cluster_C045\nTGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATG...', scoreDistribution: [ {name: '0-20', count: 5}, {name: '21-40', count: 15}, {name: '41-60', count: 40}, {name: '61-80', count: 150}, {name: '81-100', count: 400} ] },
    { id: 'C067', size: 723, novelty: 68, potential: 'Distantly related to Firmicutes', taxonomicClues: 'Shares some structural proteins with known Firmicutes species.', representativeSequence: '>rep_seq_4|cluster_C067\nCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAT...', scoreDistribution: [ {name: '0-20', count: 80}, {name: '21-40', count: 200}, {name: '41-60', count: 250}, {name: '61-80', count: 150}, {name: '81-100', count: 43} ] },
    { id: 'C089', size: 612, novelty: 83, potential: 'Unknown function, high expression', taxonomicClues: 'Expressed under specific environmental conditions, function unknown.', representativeSequence: '>rep_seq_5|cluster_C089\nAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAG...', scoreDistribution: [ {name: '0-20', count: 20}, {name: '21-40', count: 40}, {name: '41-60', count: 100}, {name: '61-80', count: 250}, {name: '81-100', count: 202} ] }
];

export function GlobalOverview() {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const handleToggleDetails = (clusterId: string) => {
    setSelectedCluster(prev => (prev === clusterId ? null : clusterId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Global Overview</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis across all datasets
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIData.totalDatasets}</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clusters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIData.totalClusters.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +1,234 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novel Clusters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIData.novelClusters.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              21.6% of total clusters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classification Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIData.classificationRate}%</div>
            <Progress value={mockKPIData.classificationRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Discovery Trends</CardTitle>
            <CardDescription>Novel vs Known clusters over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="novel" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="known" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Taxonomic Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Taxonomic Coverage</CardTitle>
            <CardDescription>Distribution across major domains</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockTaxonomicData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${((percent as number) * 100).toFixed(0)}%`
                  }
                >
                  {mockTaxonomicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Clusters */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Novel Clusters</CardTitle>
            <CardDescription>Largest clusters by size</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockTopClusters}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                <Bar dataKey="size" name="Cluster Size" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cluster Analysis */}
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Cluster Analysis</CardTitle>
                <CardDescription>Detailed breakdown of the most promising novel clusters identified across all datasets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {mockTopClusters.map((cluster) => (
                    <div key={cluster.id} className="p-3 bg-muted/50 rounded-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                               <span className="font-semibold">{cluster.id} - <span className="text-sm text-muted-foreground">{cluster.potential}</span></span>
                               <div className="flex items-center space-x-4 mt-1">
                                   <Badge variant="outline">Size: {cluster.size.toLocaleString()}</Badge>
                                   <Badge variant={cluster.novelty > 80 ? "destructive" : "secondary"}>Novelty: {cluster.novelty}%</Badge>
                               </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleToggleDetails(cluster.id)}>
                                {selectedCluster === cluster.id ? 'Hide' : 'View'} Details
                            </Button>
                        </div>
                        {selectedCluster === cluster.id && (
                            <div className="mt-4 p-4 bg-card border rounded-lg animate-in fade-in-50">
                                <h4 className="font-semibold mb-3">Detailed Analysis for {cluster.id}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold">Potential Significance</h5>
                                            <p className="text-muted-foreground">{cluster.potential}</p>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold">Taxonomic Clues</h5>
                                            <p className="text-muted-foreground">{cluster.taxonomicClues}</p>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="font-semibold">Representative Sequence</h5>
                                            <pre className="text-xs font-mono bg-muted/80 p-2 rounded mt-1 overflow-x-auto whitespace-pre-wrap">
                                                {cluster.representativeSequence}
                                            </pre>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h5 className="font-semibold">Novelty Score Distribution</h5>
                                        <div className="h-[150px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={cluster.scoreDistribution} margin={{ top: 10, right: 0, left: -20, bottom: -10 }}>
                                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                                                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                                                    <YAxis fontSize={10} tickLine={false} axisLine={false} domain={[0, 'dataMax + 20']} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                                            borderColor: 'rgba(55, 65, 81, 0.9)',
                                                            color: '#d1d5db',
                                                            fontSize: '12px',
                                                            borderRadius: '0.375rem',
                                                        }}
                                                        labelStyle={{ fontWeight: 'bold' }}
                                                        cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
                                                    />
                                                    <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
