'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Filter,
  Plus,
  Users,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Award,
  Star,
  MoreVertical,
  Download,
  Upload,
  Grid3x3,
  List,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock employee data
const mockEmployees = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Senior Full Stack Developer',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    capabilityScore: 94,
    growthRate: 16.7,
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=12',
    skills: ['React', 'TypeScript', 'Node.js'],
    tags: ['Expert Level', 'Top Performer']
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Frontend Developer',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    capabilityScore: 87,
    growthRate: 12.3,
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=47',
    skills: ['React', 'Vue.js', 'CSS'],
    tags: ['High Performer']
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Backend Developer',
    email: 'mike.johnson@company.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    capabilityScore: 82,
    growthRate: 8.5,
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=33',
    skills: ['Node.js', 'Python', 'AWS'],
    tags: ['Growing']
  },
  {
    id: '4',
    name: 'Sarah Williams',
    role: 'Full Stack Developer',
    email: 'sarah.williams@company.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    capabilityScore: 89,
    growthRate: 14.2,
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=20',
    skills: ['React', 'Node.js', 'MongoDB'],
    tags: ['Top Performer']
  },
  {
    id: '5',
    name: 'David Brown',
    role: 'DevOps Engineer',
    email: 'david.brown@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    capabilityScore: 91,
    growthRate: 18.1,
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=15',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    tags: ['Expert Level', 'Top Performer']
  },
  {
    id: '6',
    name: 'Emily Davis',
    role: 'UI/UX Designer',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 678-9012',
    location: 'Los Angeles, CA',
    capabilityScore: 85,
    growthRate: 10.8,
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=9',
    skills: ['Figma', 'Design Systems', 'Prototyping'],
    tags: ['Creative']
  },
];

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || employee.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">
                Employees
              </h1>
              <p className="text-lg text-gray-600 font-semibold">
                Manage your workforce and track capability development
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-2 border-gray-200 hover:bg-gray-50"
              >
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-2 border-gray-200 hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                className="flex items-center gap-2 bg-mint-500 hover:bg-mint-600 text-white shadow-lg shadow-mint-500/30"
              >
                <Plus className="w-4 h-4" />
                Add Employee
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search employees by name, role, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20"
              />
            </div>
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-2 border-gray-200 hover:bg-gray-50 h-12 px-4"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                    All Employees
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                    Active Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                    Inactive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex gap-1 bg-white border-2 border-gray-200 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === 'grid' ? "bg-mint-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === 'list' ? "bg-mint-500 text-white" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Employees"
            value={mockEmployees.length}
            icon={<Users className="w-5 h-5 text-blue-600" />}
            color="blue"
          />
          <StatCard
            label="Active"
            value={mockEmployees.filter(e => e.status === 'active').length}
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
            color="green"
          />
          <StatCard
            label="Avg Capability Score"
            value={Math.round(mockEmployees.reduce((acc, e) => acc + e.capabilityScore, 0) / mockEmployees.length)}
            icon={<Award className="w-5 h-5 text-amber-600" />}
            color="amber"
          />
          <StatCard
            label="Avg Growth Rate"
            value={`${(mockEmployees.reduce((acc, e) => acc + e.growthRate, 0) / mockEmployees.length).toFixed(1)}%`}
            icon={<Star className="w-5 h-5 text-purple-600" />}
            color="purple"
          />
        </div>

        {/* Employee Cards/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee, index) => (
              <EmployeeCard key={employee.id} employee={employee} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEmployees.map((employee, index) => (
              <EmployeeListItem key={employee.id} employee={employee} index={index} />
            ))}
          </div>
        )}

        {filteredEmployees.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    amber: 'bg-amber-50 border-amber-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 rounded-2xl border-2 shadow-lg",
        colorClasses[color as keyof typeof colorClasses]
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-semibold text-gray-600">{label}</div>
    </motion.div>
  );
}

function EmployeeCard({ employee, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/dashboard/employees/${employee.id}`}>
        <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all overflow-hidden cursor-pointer group hover:border-mint-300">
          {/* Header with gradient */}
          <div className="h-24 bg-gradient-to-r from-mint-400 via-green-400 to-blue-400 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
          </div>

          {/* Content */}
          <div className="px-6 pb-6 -mt-12 relative">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-mint-400 to-green-500">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
            </div>

            {/* Info */}
            <div className="mb-4">
              <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-mint-600 transition-colors">
                {employee.name}
              </h3>
              <p className="text-sm text-gray-600 font-semibold mb-3">
                {employee.role}
              </p>

              {/* Contact */}
              <div className="space-y-2 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-mint-600" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-mint-600" />
                  <span>{employee.location}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {employee.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-mint-100 text-mint-700 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-gray-100">
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Capability</div>
                <div className="text-2xl font-black text-gray-900">{employee.capabilityScore}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Growth</div>
                <div className="text-2xl font-black text-green-600">+{employee.growthRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function EmployeeListItem({ employee, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/dashboard/employees/${employee.id}`}>
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer group hover:border-mint-300">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-xl border-2 border-white shadow-lg overflow-hidden bg-gradient-to-br from-mint-400 to-green-500">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-mint-600 transition-colors">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    {employee.role}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-mint-600" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-mint-600" />
                  <span>{employee.location}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {employee.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-mint-100 text-mint-700 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 flex-shrink-0">
              <div className="text-center">
                <div className="text-xs text-gray-600 font-semibold mb-1">Capability</div>
                <div className="text-2xl font-black text-gray-900">{employee.capabilityScore}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600 font-semibold mb-1">Growth</div>
                <div className="text-2xl font-black text-green-600">+{employee.growthRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

