'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, X, MessageSquare } from 'lucide-react';

interface ReviewItem {
  id: string;
  type: 'cluster' | 'query';
  name: string;
  noveltyScore: number;
  dbMatch: string | null;
  sequence?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewComments?: string;
}

const mockReviewItems: ReviewItem[] = [
  {
    id: 'C007',
    type: 'cluster',
    name: 'Cluster C007',
    noveltyScore: 92.3,
    dbMatch: null,
    status: 'pending'
  },
  {
    id: 'C014',
    type: 'cluster', 
    name: 'Cluster C014',
    noveltyScore: 78.5,
    dbMatch: 'Weak match - Marine bacterium',
    status: 'pending'
  },
  {
    id: 'Q005',
    type: 'query',
    name: 'Query Q005',
    noveltyScore: 85.7,
    dbMatch: null,
    sequence: 'ATCGATCGATCGATCG...',
    status: 'pending'
  },
  {
    id: 'C019',
    type: 'cluster',
    name: 'Cluster C019',
    noveltyScore: 88.1,
    dbMatch: 'No significant matches',
    status: 'approved',
    reviewComments: 'Confirmed novel species - likely new genus within Bacteroidetes'
  }
];

export function ReviewPanel() {
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  const [reviewDecision, setReviewDecision] = useState<string>('');
  const [reviewComments, setReviewComments] = useState('');

  const pendingItems = mockReviewItems.filter(item => item.status === 'pending');
  const completedItems = mockReviewItems.filter(item => item.status !== 'pending');

  const handleReviewSubmit = () => {
    if (!selectedItem || !reviewDecision) return;
    
    // Here you would typically submit the review to the backend
    console.log('Submitting review:', {
      itemId: selectedItem.id,
      decision: reviewDecision,
      comments: reviewComments
    });
    
    // Reset form
    setSelectedItem(null);
    setReviewDecision('');
    setReviewComments('');
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'pending': <Badge variant="secondary"><AlertTriangle className="h-3 w-3 mr-1" />Needs Review</Badge>,
      'approved': <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>,
      'rejected': <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rejected</Badge>
    };
    return badges[status as keyof typeof badges];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scientist Review Panel</h1>
          <p className="text-muted-foreground">
            Human validation for flagged clusters and queries
          </p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline">
            {pendingItems.length} Pending
          </Badge>
          <Badge variant="outline">
            {completedItems.length} Completed
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Items requiring scientist validation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedItem?.id === item.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="text-orange-600">
                      {item.noveltyScore}% Novel
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.dbMatch || 'No database matches found'}
                  </p>
                  {item.sequence && (
                    <p className="text-xs font-mono mt-1 bg-muted/50 p-1 rounded">
                      {item.sequence}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Form */}
        <Card>
          <CardHeader>
            <CardTitle>Review Form</CardTitle>
            <CardDescription>
              {selectedItem ? `Reviewing ${selectedItem.name}` : 'Select an item to review'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedItem ? (
              <div className="space-y-4">
                <div className="p-3 bg-muted/50 rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{selectedItem.name}</span>
                    <Badge variant="outline" className="text-orange-600">
                      {selectedItem.noveltyScore}% Novel
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.dbMatch || 'No database matches found'}
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="decision">Review Decision</Label>
                  <RadioGroup 
                    value={reviewDecision} 
                    onValueChange={setReviewDecision}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="novel" id="novel" />
                      <Label htmlFor="novel">Confirm as Novel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="known" id="known" />
                      <Label htmlFor="known">Reclassify as Known</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="contamination" id="contamination" />
                      <Label htmlFor="contamination">Mark as Contamination</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="artifact" id="artifact" />
                      <Label htmlFor="artifact">Flag as Sequencing Artifact</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Provide detailed comments about your decision..."
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={handleReviewSubmit}
                    disabled={!reviewDecision}
                    className="flex-1"
                  >
                    Submit Review
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedItem(null);
                      setReviewDecision('');
                      setReviewComments('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select a pending item to start reviewing</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Completed Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Review History</CardTitle>
          <CardDescription>Previously completed reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Novelty Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.noveltyScore}%</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.reviewComments || 'No comments'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}