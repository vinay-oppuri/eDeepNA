'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { TrendingUp, BarChart2, Compass, Check, X, Target } from 'lucide-react';

// --- MOCK DATA ---
const trendData = [
  { name: 'Jan', value: 180 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 220 },
  { name: 'Apr', value: 410 },
  { name: 'May', value: 280 },
  { name: 'Jun', value: 350 },
];

const taxonomicData = [
  { name: 'DS_01', familyA: 40, familyB: 30, familyC: 20, familyD: 5, other: 5 },
  { name: 'DS_02', familyA: 25, familyB: 20, familyC: 30, familyD: 15, other: 10 },
  { name: 'Vent_04', familyA: 15, familyB: 45, familyC: 25, familyD: 10, other: 5 },
];

const novelVsKnownData = [
  { name: 'Novel', value: 22 },
  { name: 'Known', value: 78 },
];

const topClustersData = [
    { name: 'C01', value: 1200 },
    { name: 'C02', value: 980 },
    { name: 'C03', value: 850 },
    { name: 'C04', value: 700 },
    { name: 'C05', value: 650 },
    { name: 'C06', value: 580 },
    { name: 'C07', value: 540 },
    { name: 'C08', value: 490 },
    { name: 'C09', value: 450 },
    { name: 'C10', value: 410 },
];

const datasetComparisonData = {
  labels: ['DS_01', 'DS_02', 'DS_03', 'AV_04', 'AV_05'],
  matrix: [
    [0, 120, 45, 10, 5],
    [120, 0, 80, 15, 8],
    [45, 80, 0, 25, 12],
    [10, 15, 25, 0, 90],
    [5, 8, 12, 90, 0],
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm text-white p-3 rounded-lg border border-gray-700 shadow-lg">
        <p className="font-bold text-base">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>
            {pld.name}: {pld.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


export function GlobalOverview() {
  return (
    <div className="space-y-8 bg-gray-900 text-white p-8 rounded-2xl">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold">Global Overview</h1>
                <p className="text-muted-foreground text-lg">Comprehensive analysis across all datasets</p>
            </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend of Novel Clusters Over Time */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><TrendingUp className="mr-2" />Trend of Novel Clusters Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8884d8', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Taxonomic Coverage */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><BarChart2 className="mr-2" />Taxonomic Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taxonomicData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="#9ca3af" width={60} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} />
                    <Legend wrapperStyle={{ color: 'white', paddingBottom: '20px' }} align="center" />
                    <Bar dataKey="familyA" stackId="a" fill="#3b82f6" name="familyA" />
                    <Bar dataKey="familyB" stackId="a" fill="#10b981" name="familyB" />
                    <Bar dataKey="familyC" stackId="a" fill="#f97316" name="familyC" />
                    <Bar dataKey="familyD" stackId="a" fill="#a855f7" name="familyD" />
                    <Bar dataKey="other" stackId="a" fill="#64748b" name="Other" />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Novel vs. Known Ratio */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><Compass className="mr-2" />Novel vs. Known Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={novelVsKnownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell key={`cell-0`} fill="#0ea5e9" />
                  <Cell key={`cell-1`} fill="#334155" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="#9ca3af" className="text-lg">
                  Known
                </text>
                 <text x="50%" y="40%" textAnchor="middle" dominantBaseline="central" fill="#0ea5e9" className="text-3xl font-bold">
                  22%
                </text>
                 <text x="50%" y="50%" dy={20} textAnchor="middle" fill="#0ea5e9">
                  Novel
                </text>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 10 Largest Clusters */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
                <CardTitle className="flex items-center text-xl"><Target className="mr-2"/>Top 10 Largest Clusters</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topClustersData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} />
                        <Bar dataKey="value" name="Size" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Dataset Comparison (Shared Clusters) */}
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
                <CardTitle className="flex items-center text-xl">Dataset Comparison (Shared Clusters)</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                <div className="grid grid-cols-6 gap-1 p-4">
                    <div></div>
                    {datasetComparisonData.labels.map(label => <div key={label} className="text-center font-bold text-sm text-gray-400">{label}</div>)}
                    {datasetComparisonData.matrix.map((row, i) => (
                        <>
                            <div className="text-center font-bold text-sm text-gray-400">{datasetComparisonData.labels[i]}</div>
                            {row.map((value, j) => {
                                let bgColor = 'bg-gray-700';
                                if (value > 100) bgColor = 'bg-cyan-500';
                                else if (value > 50) bgColor = 'bg-cyan-600';
                                else if (value > 20) bgColor = 'bg-cyan-700';
                                else if (value > 0) bgColor = 'bg-cyan-800';
                                return (
                                <div key={j} className={`w-20 h-20 flex items-center justify-center rounded-lg text-white font-bold text-lg ${bgColor} ${i === j ? 'opacity-50' : ''}`}>
                                    {i !== j ? value : ''}
                                </div>
                                )
                            })}
                        </>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
