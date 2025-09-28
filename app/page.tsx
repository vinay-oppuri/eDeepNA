import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Database, Zap, Globe, Microscope, ArrowRight, CircleCheck as CheckCircle, AArrowDown as DNA } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Comprehensive Analysis',
    description: 'Upload DNA datasets or individual queries for deep analysis through our bioinformatics pipeline'
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Track pipeline progress with visual indicators and get instant results as analysis completes'
  },
  {
    icon: Globe,
    title: 'Interactive Dashboards',
    description: 'Explore results through interactive visualizations, cluster browsers, and taxonomic breakdowns'
  },
  {
    icon: Microscope,
    title: 'Scientist Review',
    description: 'Human-in-the-loop validation system for novel discoveries with integrated review workflows'
  }
];

const useCases = [
  'Biodiversity assessment in unexplored marine environments',
  'Novel species discovery through eDNA clustering',
  'Taxonomic classification of unknown sequences',
  'Marine ecosystem monitoring and conservation'
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <DNA className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EDeepNA</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6">
            Deep-Sea eDNA Analysis Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Marine
            <span className="block text-blue-600">Biodiversity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced bioinformatics platform for environmental DNA analysis, 
            enabling marine biologists to uncover novel species and understand 
            deep-sea ecosystems through cutting-edge computational tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="min-w-40">
                <Users className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="min-w-40">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Analysis Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for marine eDNA research
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Revolutionizing Marine Biology Research
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                EDeepNA combines state-of-the-art bioinformatics algorithms with 
                intuitive interfaces to help marine biologists analyze environmental 
                DNA samples from the deep sea. Our platform enables the discovery 
                of novel species and provides insights into previously unexplored 
                marine ecosystems.
              </p>
              
              <div className="space-y-3 mb-8">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{useCase}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/login">
                <Button size="lg">
                  Start Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <Card className="p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Analysis Progress</span>
                    <Badge variant="secondary">Running</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Quality Control</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Sequence Alignment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-sm">Clustering Analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-4 w-4 bg-gray-300 rounded-full" />
                      <span className="text-sm text-gray-400">Taxonomic Classification</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-xs text-gray-500 mb-2">Novel clusters found</div>
                    <div className="text-2xl font-bold text-blue-600">267</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <DNA className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">EDeepNA</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advancing marine biodiversity research through environmental DNA analysis
            </p>
            <p className="text-sm text-gray-500">
              © 2024 EDeepNA Project. All rights reserved. | Restricted to verified scientists only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}