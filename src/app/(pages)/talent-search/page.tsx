'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  Users,
  Zap,
  Target,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
  Star,
  Award,
  Briefcase,
  Code,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  Download,
  Share2,
  Send,
  Plus,
  Sparkles,
  Grid3x3,
  List,
  Mail,
  Phone,
  CheckCircle,
  Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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
    availability: 'available',
    availabilityPercent: 100,
    experience: 8,
    department: 'Engineering',
    skills: [
      { name: 'React', level: 94 },
      { name: 'TypeScript', level: 92 },
      { name: 'Node.js', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'AWS', level: 78 },
    ],
    avatar: 'https://i.pravatar.cc/150?img=12',
    matchScore: 98,
    tags: ['Expert Level', 'Top Performer'],
    currentProjects: 0,
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
    availability: 'partial',
    availabilityPercent: 40,
    experience: 5,
    department: 'Engineering',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Vue.js', level: 85 },
      { name: 'CSS', level: 88 },
      { name: 'TypeScript', level: 82 },
    ],
    avatar: 'https://i.pravatar.cc/150?img=47',
    matchScore: 85,
    tags: ['High Performer'],
    currentProjects: 2,
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
    availability: 'available',
    availabilityPercent: 100,
    experience: 6,
    department: 'Engineering',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 75 },
    ],
    avatar: 'https://i.pravatar.cc/150?img=33',
    matchScore: 78,
    tags: ['Growing'],
    currentProjects: 0,
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
    availability: 'soon',
    availabilityPercent: 0,
    experience: 7,
    department: 'Engineering',
    skills: [
      { name: 'React', level: 87 },
      { name: 'Node.js', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'TypeScript', level: 88 },
    ],
    avatar: 'https://i.pravatar.cc/150?img=20',
    matchScore: 92,
    tags: ['Top Performer'],
    currentProjects: 3,
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
    availability: 'available',
    availabilityPercent: 100,
    experience: 10,
    department: 'Engineering',
    skills: [
      { name: 'AWS', level: 95 },
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes', level: 88 },
      { name: 'Terraform', level: 85 },
    ],
    avatar: 'https://i.pravatar.cc/150?img=15',
    matchScore: 88,
    tags: ['Expert Level', 'Top Performer'],
    currentProjects: 1,
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
    availability: 'partial',
    availabilityPercent: 60,
    experience: 4,
    department: 'Design',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Design Systems', level: 88 },
      { name: 'Prototyping', level: 85 },
    ],
    avatar: 'https://i.pravatar.cc/150?img=9',
    matchScore: 75,
    tags: ['Creative'],
    currentProjects: 1,
  },
];

const allSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Vue.js', 'Angular', 'CSS', 'Figma', 'Design Systems'];
const allLocations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA', 'Los Angeles, CA'];
const allDepartments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'];

export default function TalentSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    skills: [] as string[],
    minCapability: 0,
    maxCapability: 100,
    availability: 'all',
    location: [] as string[],
    experience: [0, 15] as [number, number],
    department: [] as string[],
  });
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock search function
  const performSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      let results = [...mockEmployees];
      
      // Apply filters
      if (filters.skills.length > 0) {
        results = results.filter(emp => 
          filters.skills.some(skill => 
            emp.skills.some((s: any) => s.name === skill)
          )
        );
      }
      
      if (filters.minCapability > 0 || filters.maxCapability < 100) {
        results = results.filter(emp => 
          emp.capabilityScore >= filters.minCapability && 
          emp.capabilityScore <= filters.maxCapability
        );
      }
      
      if (filters.availability !== 'all') {
        results = results.filter(emp => emp.availability === filters.availability);
      }
      
      if (filters.location.length > 0) {
        results = results.filter(emp => filters.location.includes(emp.location));
      }
      
      if (filters.experience[0] > 0 || filters.experience[1] < 15) {
        results = results.filter(emp => 
          emp.experience >= filters.experience[0] && 
          emp.experience <= filters.experience[1]
        );
      }
      
      if (filters.department.length > 0) {
        results = results.filter(emp => filters.department.includes(emp.department));
      }
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(emp =>
          emp.name.toLowerCase().includes(query) ||
          emp.role.toLowerCase().includes(query) ||
          emp.skills.some((s: any) => s.name.toLowerCase().includes(query))
        );
      }
      
      // Sort results
      results.sort((a, b) => {
        switch (sortBy) {
          case 'match':
            return b.matchScore - a.matchScore;
          case 'capability':
            return b.capabilityScore - a.capabilityScore;
          case 'growth':
            return b.growthRate - a.growthRate;
          case 'availability':
            return b.availabilityPercent - a.availabilityPercent;
          default:
            return 0;
        }
      });
      
      setEmployees(results);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    performSearch();
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-blue-50">
      <div className="max-w-[1800px] mx-auto p-6">
        {/* Page Header */}
        <PageHeader 
          selectedCount={selectedEmployees.length}
          onAssign={() => setShowAssignModal(true)}
          onClearSelection={() => setSelectedEmployees([])}
        />
        
        {/* Search Bar */}
        <SearchBar 
          query={searchQuery}
          setQuery={setSearchQuery}
          onSearch={performSearch}
        />
        
        {/* Main Content Area */}
        <div className="flex gap-6 mt-6">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <FilterSidebar 
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </AnimatePresence>
          
          {/* Results Area */}
          <div className="flex-1">
            {/* Results Header */}
            <ResultsHeader
              count={employees.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
            
            {/* Results Grid/List */}
            {loading ? (
              <LoadingSkeleton viewMode={viewMode} />
            ) : employees.length === 0 ? (
              <EmptyState />
            ) : (
              <ResultsGrid
                employees={employees}
                viewMode={viewMode}
                selectedEmployees={selectedEmployees}
                setSelectedEmployees={setSelectedEmployees}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Assign to Project Modal */}
      <AssignModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        selectedEmployees={selectedEmployees}
      />
    </div>
  );
}

// ============================================================================
// PAGE HEADER COMPONENT
// ============================================================================

function PageHeader({ selectedCount, onAssign, onClearSelection }: any) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-mint-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-mint-500/30">
            <Search className="w-6 h-6 text-white" />
          </div>
          Talent Search
        </h1>
        <p className="text-gray-600 font-semibold">
          Find the perfect talent for your project based on skills, availability, and capability
        </p>
      </div>
      
      <div className="flex gap-3">
        {selectedCount > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 bg-mint-50 border-2 border-mint-200 rounded-xl">
            <span className="text-sm font-bold text-mint-700">{selectedCount} selected</span>
            <button
              onClick={onClearSelection}
              className="text-xs font-semibold text-mint-600 hover:text-mint-700"
            >
              Clear
            </button>
          </div>
        )}
        <button className="px-6 py-3 bg-white hover:bg-gray-50 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Results
        </button>
        <button 
          onClick={selectedCount > 0 ? onAssign : undefined}
          className={cn(
            "px-6 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2",
            selectedCount > 0
              ? "bg-gradient-to-r from-mint-500 to-green-500 hover:from-mint-600 hover:to-green-600 text-white"
              : "bg-gradient-to-r from-mint-500 to-green-500 hover:from-mint-600 hover:to-green-600 text-white"
          )}
        >
          <Plus className="w-5 h-5" />
          {selectedCount > 0 ? `Assign ${selectedCount} to Project` : 'Create Project'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// SEARCH BAR COMPONENT
// ============================================================================

function SearchBar({ query, setQuery, onSearch }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-xl mb-6"
    >
      <div className="flex gap-4">
        {/* Main Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, skills, role... (e.g., 'React developer with 5+ years')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-mint-500 focus:ring-2 focus:ring-mint-200 focus:bg-white text-gray-900 font-semibold placeholder:text-gray-500 transition-all"
          />
        </div>
        
        {/* Search Button */}
        <button
          onClick={onSearch}
          className="px-8 py-4 bg-gradient-to-r from-mint-500 to-green-500 hover:from-mint-600 hover:to-green-600 text-white rounded-xl font-bold shadow-lg shadow-mint-500/30 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Search Talent
        </button>
      </div>
      
      {/* Quick Filters */}
      <div className="flex gap-2 mt-4">
        <span className="text-sm font-semibold text-gray-700">Quick Filters:</span>
        <button className="px-3 py-1 bg-mint-50 hover:bg-mint-100 text-mint-700 rounded-lg text-sm font-semibold transition-colors">
          Available Now
        </button>
        <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold transition-colors">
          Top Performers
        </button>
        <button className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold transition-colors">
          High Growth
        </button>
        <button className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-sm font-semibold transition-colors">
          Recently Assessed
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// FILTER SIDEBAR COMPONENT
// ============================================================================

function FilterSidebar({ filters, setFilters }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-80 flex-shrink-0"
    >
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-xl sticky top-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-mint-600" />
            Filters
          </h2>
          <button 
            onClick={() => setFilters({
              skills: [],
              minCapability: 0,
              maxCapability: 100,
              availability: 'all',
              location: [],
              experience: [0, 15],
              department: [],
            })}
            className="text-sm font-semibold text-mint-600 hover:text-mint-700"
          >
            Clear All
          </button>
        </div>
        
        <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-hide">
          {/* Skills Filter */}
          <FilterSection title="Required Skills" icon={<Code className="w-5 h-5 text-blue-600" />}>
            <SkillsSelect 
              selected={filters.skills}
              onChange={(skills: string[]) => setFilters({ ...filters, skills })}
            />
          </FilterSection>
          
          {/* Capability Score Range */}
          <FilterSection title="Capability Score" icon={<Award className="w-5 h-5 text-amber-600" />}>
            <div className="space-y-4">
              <Slider
                value={[filters.minCapability, filters.maxCapability]}
                onValueChange={([min, max]) => 
                  setFilters({ ...filters, minCapability: min, maxCapability: max })
                }
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>{filters.minCapability}</span>
                <span>{filters.maxCapability}</span>
              </div>
            </div>
          </FilterSection>
          
          {/* Availability */}
          <FilterSection title="Availability" icon={<Calendar className="w-5 h-5 text-green-600" />}>
            <Select
              value={filters.availability}
              onValueChange={(value) => setFilters({ ...filters, availability: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="partial">Partially Available</SelectItem>
                <SelectItem value="soon">Available Soon</SelectItem>
              </SelectContent>
            </Select>
          </FilterSection>
          
          {/* Location */}
          <FilterSection title="Location" icon={<MapPin className="w-5 h-5 text-red-600" />}>
            <LocationSelect
              selected={filters.location}
              onChange={(locations: string[]) => setFilters({ ...filters, location: locations })}
            />
          </FilterSection>
          
          {/* Experience Range */}
          <FilterSection title="Years of Experience" icon={<Briefcase className="w-5 h-5 text-purple-600" />}>
            <div className="space-y-4">
              <Slider
                value={filters.experience}
                onValueChange={(value) => setFilters({ ...filters, experience: value })}
                min={0}
                max={15}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>{filters.experience[0]} years</span>
                <span>{filters.experience[1]}+ years</span>
              </div>
            </div>
          </FilterSection>
          
          {/* Department */}
          <FilterSection title="Department" icon={<Users className="w-5 h-5 text-mint-600" />}>
            <DepartmentSelect
              selected={filters.department}
              onChange={(depts: string[]) => setFilters({ ...filters, department: depts })}
            />
          </FilterSection>
        </div>
        
        <button className="w-full mt-6 py-3 bg-gradient-to-r from-mint-500 to-green-500 hover:from-mint-600 hover:to-green-600 text-white rounded-xl font-bold shadow-lg transition-all">
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
}

function FilterSection({ title, icon, children }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ============================================================================
// SKILLS SELECT COMPONENT
// ============================================================================

function SkillsSelect({ selected, onChange }: any) {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
      {allSkills.map((skill) => (
        <div key={skill} className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(skill)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...selected, skill]);
              } else {
                onChange(selected.filter((s: string) => s !== skill));
              }
            }}
          />
          <label className="text-sm font-semibold text-gray-700 cursor-pointer flex-1">
            {skill}
          </label>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// LOCATION SELECT COMPONENT
// ============================================================================

function LocationSelect({ selected, onChange }: any) {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
      {allLocations.map((location) => (
        <div key={location} className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(location)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...selected, location]);
              } else {
                onChange(selected.filter((l: string) => l !== location));
              }
            }}
          />
          <label className="text-sm font-semibold text-gray-700 cursor-pointer flex-1">
            {location}
          </label>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// DEPARTMENT SELECT COMPONENT
// ============================================================================

function DepartmentSelect({ selected, onChange }: any) {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
      {allDepartments.map((dept) => (
        <div key={dept} className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(dept)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...selected, dept]);
              } else {
                onChange(selected.filter((d: string) => d !== dept));
              }
            }}
          />
          <label className="text-sm font-semibold text-gray-700 cursor-pointer flex-1">
            {dept}
          </label>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// RESULTS HEADER COMPONENT
// ============================================================================

function ResultsHeader({ 
  count, 
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode,
  showFilters,
  setShowFilters 
}: any) {
  return (
    <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-lg mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Filter className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <div>
          <span className="text-2xl font-black text-gray-900">{count}</span>
          <span className="text-gray-600 font-semibold ml-2">results found</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Best Match</SelectItem>
            <SelectItem value="capability">Capability Score</SelectItem>
            <SelectItem value="growth">Growth Rate</SelectItem>
            <SelectItem value="availability">Availability</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
          </SelectContent>
        </Select>
        
        {/* View Toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === 'grid' && "bg-white shadow-sm"
            )}
          >
            <Grid3x3 className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === 'list' && "bg-white shadow-sm"
            )}
          >
            <List className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RESULTS GRID COMPONENT
// ============================================================================

function ResultsGrid({ employees, viewMode, selectedEmployees, setSelectedEmployees }: any) {
  return (
    <div className={cn(
      "gap-6",
      viewMode === 'grid' && "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
      viewMode === 'list' && "space-y-4"
    )}>
      {employees.map((employee: any, index: number) => (
        <EmployeeResultCard
          key={employee.id}
          employee={employee}
          viewMode={viewMode}
          index={index}
          isSelected={selectedEmployees.includes(employee.id)}
          onToggleSelect={() => {
            if (selectedEmployees.includes(employee.id)) {
              setSelectedEmployees(selectedEmployees.filter((id: string) => id !== employee.id));
            } else {
              setSelectedEmployees([...selectedEmployees, employee.id]);
            }
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// EMPLOYEE RESULT CARD COMPONENT
// ============================================================================

function EmployeeResultCard({ employee, viewMode, index, isSelected, onToggleSelect }: any) {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link href={`/dashboard/employees/${employee.id}`}>
          <div className={cn(
            "bg-white rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer",
            isSelected ? "border-mint-500 bg-mint-50" : "border-gray-200 hover:border-mint-300"
          )}>
            <div className="flex items-center gap-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSelect();
                }}
                className="flex-shrink-0"
              >
                {isSelected ? (
                  <CheckCircle className="w-6 h-6 text-mint-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
              </button>
              
              <div className="w-16 h-16 rounded-xl border-2 border-white shadow-lg overflow-hidden bg-gradient-to-br from-mint-400 to-green-500 flex-shrink-0">
                <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">{employee.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold">{employee.role}</p>
                  </div>
                  <MatchScore score={employee.matchScore} />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-mint-600" />
                    {employee.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    {employee.capabilityScore}/100
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    +{employee.growthRate}%
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {employee.availabilityPercent}% available
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {employee.skills.slice(0, 4).map((skill: any) => (
                    <Badge key={skill.name} variant="secondary" className="text-xs">
                      {skill.name} {skill.level}%
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/dashboard/employees/${employee.id}`}>
        <div className={cn(
          "bg-white rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all overflow-hidden cursor-pointer group relative",
          isSelected ? "border-mint-500 bg-mint-50" : "border-gray-200 hover:border-mint-300"
        )}>
          {/* Selection Checkbox */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSelect();
            }}
            className="absolute top-4 right-4 z-10"
          >
            {isSelected ? (
              <div className="w-6 h-6 bg-mint-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            ) : (
              <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Circle className="w-4 h-4 text-gray-400 m-0.5" />
              </div>
            )}
          </button>
          
          {/* Header with gradient */}
          <div className="h-24 bg-gradient-to-r from-mint-400 via-green-400 to-blue-400 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
            <div className="absolute top-4 left-4">
              <MatchScore score={employee.matchScore} />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 -mt-12 relative">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-mint-400 to-green-500">
                <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-6 h-6 border-2 border-white rounded-full",
                employee.availability === 'available' && "bg-green-500",
                employee.availability === 'partial' && "bg-amber-500",
                employee.availability === 'soon' && "bg-gray-400"
              )} />
            </div>

            {/* Info */}
            <div className="mb-4">
              <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-mint-600 transition-colors">
                {employee.name}
              </h3>
              <p className="text-sm text-gray-600 font-semibold mb-3">
                {employee.role}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-mint-50 rounded-xl">
                  <div className="text-xs text-gray-600 font-semibold mb-1">Capability</div>
                  <div className="text-2xl font-black text-gray-900">{employee.capabilityScore}</div>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <div className="text-xs text-gray-600 font-semibold mb-1">Growth</div>
                  <div className="text-2xl font-black text-green-600">+{employee.growthRate}%</div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {employee.skills.slice(0, 3).map((skill: any) => (
                  <Badge key={skill.name} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
                {employee.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{employee.skills.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Location & Availability */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="w-3 h-3 text-mint-600" />
                  {employee.location}
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Clock className="w-3 h-3 text-blue-600" />
                  {employee.availabilityPercent}% available
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// MATCH SCORE COMPONENT
// ============================================================================

function MatchScore({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 75) return 'from-mint-500 to-green-500';
    if (score >= 60) return 'from-amber-500 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <div className={cn(
      "px-3 py-1.5 rounded-full text-white text-xs font-black shadow-lg flex items-center gap-1.5 bg-gradient-to-r",
      getColor()
    )}>
      <Zap className="w-3 h-3" />
      {score}% Match
    </div>
  );
}

// ============================================================================
// LOADING SKELETON
// ============================================================================

function LoadingSkeleton({ viewMode }: any) {
  return (
    <div className={cn(
      "gap-6",
      viewMode === 'grid' && "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
      viewMode === 'list' && "space-y-4"
    )}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-3xl border-2 border-gray-200 p-6 animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-4" />
          <div className="h-6 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// EMPTY STATE
// ============================================================================

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl p-16 border-2 border-gray-200 shadow-xl text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2">No employees found</h3>
      <p className="text-gray-600 font-semibold mb-6">
        Try adjusting your search criteria or filters
      </p>
      <button className="px-6 py-3 bg-mint-500 hover:bg-mint-600 text-white rounded-xl font-semibold transition-colors">
        Clear All Filters
      </button>
    </div>
  );
}

// ============================================================================
// ASSIGN MODAL
// ============================================================================

function AssignModal({ open, onClose, selectedEmployees }: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Assign to Project</DialogTitle>
          <DialogDescription>
            Assign {selectedEmployees.length} selected employee(s) to a project
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Select Project</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a project..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project1">E-Commerce Platform</SelectItem>
                <SelectItem value="project2">Mobile App Redesign</SelectItem>
                <SelectItem value="project3">API Migration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Allocation (%)</label>
            <Slider defaultValue={[100]} max={100} step={10} />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1 bg-mint-500 hover:bg-mint-600">
              Assign Employees
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

