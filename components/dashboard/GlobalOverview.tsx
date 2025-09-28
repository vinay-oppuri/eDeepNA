'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
  { id: 'C001', size: 1245, novelty: 89 },
  { id: 'C023', size: 987, novelty: 76 },
  { id: 'C045', size: 834, novelty: 92 },
  { id: 'C067', size: 723, novelty: 68 },
  { id: 'C089', size: 612, novelty: 83 }
];

export function GlobalOverview() {
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
            <CardDescription>Largest clusters by size and novelty score</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockTopClusters}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="size" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}