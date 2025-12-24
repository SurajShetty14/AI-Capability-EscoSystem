'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  BookOpen,
  Target,
  Star,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit,
  MoreVertical,
  Download,
  Share2,
  MessageSquare,
  Video,
  Code,
  GraduationCap,
  Briefcase,
  Trophy,
  Activity,
  BarChart3,
  FileText,
  Repeat,
  XCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  ExternalLink,
  ThumbsUp,
  ArrowUpRight,
  Brain,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
  Eye,
  RefreshCw,
  Filter,
  ArrowDownRight,
  Minus,
  Play,
  Pause,
  Lock,
  Unlock,
  Book,
  Flame,
  PlayCircle
} from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'assessments' | 'learning' | 'projects'>('overview');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <EmployeeHeader />
        
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Content Area */}
        <div className="mt-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'skills' && <SkillsTab />}
          {activeTab === 'assessments' && <AssessmentsTab />}
          {activeTab === 'learning' && <LearningTab />}
          {activeTab === 'projects' && <ProjectsTab />}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 1. EMPLOYEE HEADER - HERO SECTION
// ============================================================================

function EmployeeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Back Button */}
      <Link 
        href="/dashboard/employees"
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">Back to Employees</span>
      </Link>
      
      {/* Profile Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden">
        {/* Background Gradient Banner */}
        <div className="h-32 bg-gradient-to-r from-mint-400 via-green-400 to-blue-400 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm"
            />
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm"
            />
          </div>
        </div>
        
        <div className="px-8 pb-8">
          {/* Profile Photo & Basic Info */}
          <div className="flex flex-col lg:flex-row gap-6 -mt-16 relative z-10">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-mint-400 to-green-500">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status Badge */}
              <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Active
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2">
                    John Doe
                  </h1>
                  <p className="text-lg text-gray-600 font-semibold mb-4">
                    Senior Full Stack Developer
                  </p>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-mint-600" />
                      john.doe@company.com
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-mint-600" />
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-mint-600" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-mint-600" />
                      Joined Jan 2023
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-mint-100 text-mint-700 rounded-full text-sm font-semibold">
                      Expert Level
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      Top Performer
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                      Learning Enthusiast
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <MessageSquare className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <Video className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-mint-500 hover:bg-mint-600 text-white rounded-xl transition-colors shadow-lg shadow-mint-500/30">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8 p-6 bg-gradient-to-r from-mint-50 to-blue-50 rounded-2xl border-2 border-gray-100">
            <QuickStat
              icon={<Trophy className="w-5 h-5 text-amber-600" />}
              label="Capability Score"
              value="94/100"
              trend="+13 pts"
              trendUp
            />
            <QuickStat
              icon={<TrendingUp className="w-5 h-5 text-green-600" />}
              label="Growth Rate"
              value="16.7%"
              trend="Last 3 months"
              trendUp
            />
            <QuickStat
              icon={<BookOpen className="w-5 h-5 text-blue-600" />}
              label="Learning Hours"
              value="124h"
              trend="This year"
            />
            <QuickStat
              icon={<CheckCircle2 className="w-5 h-5 text-mint-600" />}
              label="Assessments"
              value="12"
              trend="8 passed"
            />
            <QuickStat
              icon={<Briefcase className="w-5 h-5 text-purple-600" />}
              label="Projects"
              value="5"
              trend="3 active"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function QuickStat({ icon, label, value, trend, trendUp }: any) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-black text-gray-900">{value}</div>
      <div className="text-xs text-gray-600 font-semibold">{label}</div>
      {trend && (
        <div className={cn(
          "text-xs font-semibold mt-1",
          trendUp ? "text-green-600" : "text-gray-500"
        )}>
          {trend}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. NAVIGATION TABS - GLASSMORPHISM STYLE
// ============================================================================

function NavigationTabs({ activeTab, setActiveTab }: any) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'skills', label: 'Skills & Expertise', icon: Zap },
    { id: 'assessments', label: 'Assessments', icon: FileText },
    { id: 'learning', label: 'Learning Journey', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Briefcase },
  ];
  
  return (
    <div className="mt-6 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-gray-200 p-2 shadow-lg sticky top-6 z-40">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-gradient-to-r from-mint-500 to-green-500 text-white shadow-lg shadow-mint-500/30"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 3. OVERVIEW TAB - COMPREHENSIVE DASHBOARD
// ============================================================================

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Row 1: Capability Score + Skill Radar */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Capability Score Card */}
        <CapabilityScoreCard />
        
        {/* Skill Radar Chart */}
        <OverviewSkillRadarChart />
      </div>
      
      {/* Row 2: Performance Timeline */}
      <PerformanceTimeline />
      
      {/* Row 3: Recent Activity + Learning Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentActivityCard />
        <LearningProgressCard />
      </div>
      
      {/* Row 4: Top Skills Badges */}
      <TopSkillsBadges />
    </div>
  );
}

function CapabilityScoreCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-mint-400/20 to-green-400/20 rounded-full blur-3xl -z-10" />
      
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Trophy className="w-7 h-7 text-amber-500" />
        Capability Score
      </h2>
      
      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-56 h-56">
          <svg className="w-56 h-56 transform -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="100"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="112"
              cy="112"
              r="100"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray="628"
              strokeDashoffset={628 - (628 * 94) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#80EFC0" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-black text-gray-900">94</div>
            <div className="text-sm text-gray-600 font-semibold">/100</div>
          </div>
        </div>
      </div>
      
      {/* Progress Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
          <span className="font-semibold text-gray-700">Previous Score</span>
          <span className="text-lg font-black text-gray-900">81/100</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-mint-50 rounded-xl">
          <span className="font-semibold text-gray-700">Improvement</span>
          <span className="text-lg font-black text-green-600">+13 points</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
          <span className="font-semibold text-gray-700">Ranking</span>
          <span className="text-lg font-black text-blue-600">Top 3%</span>
        </div>
      </div>
    </motion.div>
  );
}

function OverviewSkillRadarChart() {
  const radarData = [
    { skill: 'React', current: 94, target: 100 },
    { skill: 'Node.js', current: 88, target: 100 },
    { skill: 'TypeScript', current: 92, target: 100 },
    { skill: 'MongoDB', current: 85, target: 100 },
    { skill: 'AWS', current: 78, target: 100 },
    { skill: 'System Design', current: 82, target: 100 },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Target className="w-7 h-7 text-blue-500" />
        Skill Distribution
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
          <Radar name="Current" dataKey="current" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
          <Radar name="Target" dataKey="target" stroke="#80EFC0" fill="#80EFC0" fillOpacity={0.1} strokeDasharray="5 5" />
        </RadarChart>
      </ResponsiveContainer>
      
      <div className="mt-6 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-sm font-semibold text-gray-700">Current Level</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-mint-500 rounded-full" />
          <span className="text-sm font-semibold text-gray-700">Target</span>
        </div>
      </div>
    </motion.div>
  );
}

function PerformanceTimeline() {
  const data = [
    { month: 'Jan', score: 78 },
    { month: 'Feb', score: 81 },
    { month: 'Mar', score: 83 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 87 },
    { month: 'Jun', score: 89 },
    { month: 'Jul', score: 91 },
    { month: 'Aug', score: 94 },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-green-500" />
          Performance Timeline
        </h2>
        <select className="px-4 py-2 bg-gray-100 rounded-xl font-semibold text-sm text-gray-700 border-2 border-gray-200">
          <option>Last 8 Months</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} domain={[70, 100]} />
          <Tooltip 
            contentStyle={{ 
              background: 'white', 
              border: '2px solid #E5E7EB', 
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#10B981" 
            strokeWidth={3}
            fill="url(#colorScore)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-xl text-center">
          <div className="text-2xl font-black text-green-600">+16</div>
          <div className="text-xs text-gray-600 font-semibold">Points Growth</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-xl text-center">
          <div className="text-2xl font-black text-blue-600">8/8</div>
          <div className="text-xs text-gray-600 font-semibold">Months Improving</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl text-center">
          <div className="text-2xl font-black text-purple-600">20.5%</div>
          <div className="text-xs text-gray-600 font-semibold">Total Growth</div>
        </div>
      </div>
    </motion.div>
  );
}

function RecentActivityCard() {
  const activities = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      title: 'Completed Full Stack Assessment',
      description: 'Score: 91% (+13 points improvement)',
      time: '2 hours ago',
      color: 'green'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      title: 'Finished React Advanced Patterns Course',
      description: 'Certificate earned • 8 hours',
      time: '1 day ago',
      color: 'blue'
    },
    {
      icon: <Code className="w-5 h-5 text-purple-600" />,
      title: 'Playground Practice Session',
      description: 'Completed 12 coding challenges',
      time: '2 days ago',
      color: 'purple'
    },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Activity className="w-7 h-7 text-mint-500" />
        Recent Activity
      </h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg",
              activity.color === 'green' && "bg-green-50 border-green-200 hover:border-green-300",
              activity.color === 'blue' && "bg-blue-50 border-blue-200 hover:border-blue-300",
              activity.color === 'purple' && "bg-purple-50 border-purple-200 hover:border-purple-300"
            )}
          >
            <div className="flex gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                activity.color === 'green' && "bg-green-100",
                activity.color === 'blue' && "bg-blue-100",
                activity.color === 'purple' && "bg-purple-100"
              )}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors">
        View All Activity →
      </button>
    </motion.div>
  );
}

function LearningProgressCard() {
  const courses = [
    { name: 'React Advanced Patterns', progress: 100, color: 'green' },
    { name: 'System Design Fundamentals', progress: 65, color: 'blue' },
    { name: 'AWS Certification Prep', progress: 40, color: 'amber' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <GraduationCap className="w-7 h-7 text-purple-500" />
        Learning in Progress
      </h2>
      
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900">{course.name}</h3>
              <span className="text-sm font-black text-gray-900">{course.progress}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={cn(
                  "h-full rounded-full",
                  course.color === 'green' && "bg-gradient-to-r from-green-500 to-green-600",
                  course.color === 'blue' && "bg-gradient-to-r from-blue-500 to-blue-600",
                  course.color === 'amber' && "bg-gradient-to-r from-amber-500 to-amber-600"
                )}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-mint-50 to-green-50 rounded-xl border-2 border-mint-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 font-semibold">Total Learning Time</div>
            <div className="text-3xl font-black text-gray-900">124 hours</div>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <BookOpen className="w-8 h-8 text-mint-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TopSkillsBadges() {
  const skills = [
    { name: 'React', level: 94, icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 92, icon: '📘', color: 'from-blue-600 to-indigo-600' },
    { name: 'Node.js', level: 88, icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { name: 'MongoDB', level: 85, icon: '🍃', color: 'from-green-600 to-teal-600' },
    { name: 'AWS', level: 78, icon: '☁️', color: 'from-orange-500 to-amber-500' },
    { name: 'System Design', level: 82, icon: '🏗️', color: 'from-purple-500 to-pink-500' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Star className="w-7 h-7 text-amber-500" />
        Top Skills
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
          >
            <div className={cn(
              "p-6 rounded-2xl bg-gradient-to-br",
              skill.color,
              "text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            )}>
              <div className="text-4xl mb-2">{skill.icon}</div>
              <div className="font-black text-2xl mb-1">{skill.level}</div>
              <div className="text-xs font-semibold opacity-90">{skill.name}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// 4. SKILLS TAB
// ============================================================================

function SkillsTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  return (
    <div className="space-y-6">
      {/* Page Header with Actions */}
      <SkillsHeader />
      
      {/* Skills Overview Cards Row */}
      <SkillsOverviewCards />
      
      {/* Category Tabs */}
      <SkillCategoryTabs 
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      
      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Matrix */}
          <SkillsMatrix category={selectedCategory} />
          
          {/* Skill Progression Timeline */}
          <SkillProgressionTimeline />
          
          {/* Skills by Project */}
          <SkillsByProject />
        </div>
        
        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Skill Distribution Radar */}
          <SkillRadarChart />
          
          {/* Certifications */}
          <CertificationsCard />
          
          {/* Endorsements */}
          <EndorsementsCard />
          
          {/* Learning Recommendations */}
          <LearningRecommendations />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SKILLS HEADER COMPONENT
// ============================================================================

function SkillsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          Skills & Expertise
        </h2>
        <p className="text-gray-600 font-semibold">
          Comprehensive view of technical capabilities and skill progression
        </p>
      </div>
      
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white hover:bg-gray-50 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Skills Report
        </button>
        <button className="px-4 py-2 bg-white hover:bg-gray-50 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 transition-all flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Profile
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-mint-500 to-green-500 hover:from-mint-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// SKILLS OVERVIEW CARDS
// ============================================================================

function SkillsOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Code className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">32</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Total Skills</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">+5 this year</div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl shadow-green-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Award className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">12</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Expert Level</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">90+ proficiency</div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-purple-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <TrendingUp className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">+18%</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Avg Growth</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">Last 6 months</div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl shadow-amber-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Users className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">45</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Endorsements</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">From 12 people</div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// SKILL CATEGORY TABS
// ============================================================================

function SkillCategoryTabs({ selected, onSelect }: any) {
  const categories = [
    { id: 'all', label: 'All Skills', icon: Target, count: 32, color: 'mint' },
    { id: 'frontend', label: 'Frontend', icon: Code, count: 8, color: 'blue' },
    { id: 'backend', label: 'Backend', icon: Zap, count: 10, color: 'green' },
    { id: 'devops', label: 'DevOps', icon: Rocket, count: 6, color: 'orange' },
    { id: 'design', label: 'Design', icon: Sparkles, count: 4, color: 'purple' },
    { id: 'soft', label: 'Soft Skills', icon: Brain, count: 4, color: 'pink' },
  ];
  
  return (
    <div className="bg-white rounded-2xl p-2 border-2 border-gray-200 shadow-lg">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap",
              selected === category.id
                ? cn(
                    "shadow-lg",
                    category.color === 'mint' && "bg-gradient-to-r from-mint-500 to-green-500 text-white",
                    category.color === 'blue' && "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
                    category.color === 'green' && "bg-gradient-to-r from-green-500 to-green-600 text-white",
                    category.color === 'orange' && "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
                    category.color === 'purple' && "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
                    category.color === 'pink' && "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                  )
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <category.icon className="w-5 h-5" />
            <span>{category.label}</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-bold",
              selected === category.id
                ? "bg-white/20"
                : "bg-gray-200 text-gray-700"
            )}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SKILLS MATRIX COMPONENT
// ============================================================================

function SkillsMatrix({ category }: any) {
  const skills = [
    // Frontend Skills
    { 
      name: 'React', 
      level: 94, 
      category: 'frontend', 
      icon: '⚛️',
      color: 'from-blue-500 to-cyan-500',
      experience: '5 years',
      lastUsed: '2 days ago',
      projects: 12,
      endorsements: 8,
      trend: '+12%',
      badges: ['Expert', 'Top 5%']
    },
    { 
      name: 'TypeScript', 
      level: 92, 
      category: 'frontend', 
      icon: '📘',
      color: 'from-blue-600 to-indigo-600',
      experience: '4 years',
      lastUsed: '1 day ago',
      projects: 10,
      endorsements: 7,
      trend: '+15%',
      badges: ['Expert']
    },
    { 
      name: 'Next.js', 
      level: 88, 
      category: 'frontend', 
      icon: '▲',
      color: 'from-gray-800 to-gray-900',
      experience: '3 years',
      lastUsed: '3 days ago',
      projects: 8,
      endorsements: 6,
      trend: '+20%',
      badges: ['Advanced']
    },
    { 
      name: 'CSS/Tailwind', 
      level: 90, 
      category: 'frontend', 
      icon: '🎨',
      color: 'from-cyan-500 to-blue-500',
      experience: '6 years',
      lastUsed: '1 day ago',
      projects: 15,
      endorsements: 9,
      trend: '+8%',
      badges: ['Expert']
    },
    
    // Backend Skills
    { 
      name: 'Node.js', 
      level: 88, 
      category: 'backend', 
      icon: '🟢',
      color: 'from-green-500 to-emerald-500',
      experience: '5 years',
      lastUsed: '2 days ago',
      projects: 14,
      endorsements: 10,
      trend: '+10%',
      badges: ['Expert', 'Certified']
    },
    { 
      name: 'Python', 
      level: 82, 
      category: 'backend', 
      icon: '🐍',
      color: 'from-blue-600 to-yellow-500',
      experience: '3 years',
      lastUsed: '1 week ago',
      projects: 7,
      endorsements: 5,
      trend: '+18%',
      badges: ['Advanced']
    },
    { 
      name: 'PostgreSQL', 
      level: 85, 
      category: 'backend', 
      icon: '🐘',
      color: 'from-blue-700 to-blue-800',
      experience: '4 years',
      lastUsed: '3 days ago',
      projects: 11,
      endorsements: 6,
      trend: '+12%',
      badges: ['Advanced']
    },
    { 
      name: 'GraphQL', 
      level: 80, 
      category: 'backend', 
      icon: '◆',
      color: 'from-pink-500 to-purple-500',
      experience: '2 years',
      lastUsed: '1 week ago',
      projects: 5,
      endorsements: 4,
      trend: '+25%',
      badges: ['Advanced']
    },
    
    // DevOps Skills
    { 
      name: 'AWS', 
      level: 78, 
      category: 'devops', 
      icon: '☁️',
      color: 'from-orange-500 to-amber-500',
      experience: '3 years',
      lastUsed: '5 days ago',
      projects: 9,
      endorsements: 7,
      trend: '+22%',
      badges: ['Certified']
    },
    { 
      name: 'Docker', 
      level: 85, 
      category: 'devops', 
      icon: '🐳',
      color: 'from-blue-500 to-blue-600',
      experience: '4 years',
      lastUsed: '2 days ago',
      projects: 12,
      endorsements: 8,
      trend: '+15%',
      badges: ['Expert']
    },
    { 
      name: 'Kubernetes', 
      level: 72, 
      category: 'devops', 
      icon: '⎈',
      color: 'from-blue-600 to-indigo-700',
      experience: '2 years',
      lastUsed: '1 week ago',
      projects: 4,
      endorsements: 3,
      trend: '+30%',
      badges: ['Intermediate']
    },
    
    // Design Skills
    { 
      name: 'Figma', 
      level: 75, 
      category: 'design', 
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      experience: '2 years',
      lastUsed: '4 days ago',
      projects: 6,
      endorsements: 5,
      trend: '+20%',
      badges: ['Advanced']
    },
    { 
      name: 'UI/UX Design', 
      level: 78, 
      category: 'design', 
      icon: '✨',
      color: 'from-pink-500 to-rose-500',
      experience: '3 years',
      lastUsed: '1 week ago',
      projects: 8,
      endorsements: 6,
      trend: '+15%',
      badges: ['Advanced']
    },
    
    // Soft Skills
    { 
      name: 'Leadership', 
      level: 88, 
      category: 'soft', 
      icon: '👑',
      color: 'from-amber-500 to-orange-500',
      experience: '5 years',
      lastUsed: 'Ongoing',
      projects: 20,
      endorsements: 12,
      trend: '+10%',
      badges: ['Expert']
    },
    { 
      name: 'Communication', 
      level: 92, 
      category: 'soft', 
      icon: '💬',
      color: 'from-blue-500 to-purple-500',
      experience: '6 years',
      lastUsed: 'Ongoing',
      projects: 25,
      endorsements: 15,
      trend: '+8%',
      badges: ['Expert', 'Top Rated']
    },
  ];
  
  const filteredSkills = category === 'all' 
    ? skills 
    : skills.filter(s => s.category === category);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <Target className="w-7 h-7 text-mint-600" />
          Skills Matrix
        </h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-sm text-gray-700 transition-colors">
            Sort by Level
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-sm text-gray-700 transition-colors">
            Sort by Recent
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillCard({ skill, index }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Main Row */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg flex-shrink-0",
          skill.color
        )}>
          {skill.icon}
        </div>
        
        {/* Name & Level */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{skill.name}</h4>
            {skill.badges.map((badge: string) => (
              <span key={badge} className="px-2 py-0.5 bg-mint-100 text-mint-700 rounded-full text-xs font-semibold">
                {badge}
              </span>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.05 }}
                className={cn(
                  "h-full rounded-full bg-gradient-to-r",
                  skill.color
                )}
              />
            </div>
            <span className="text-sm font-black text-gray-900 w-12 text-right">
              {skill.level}
            </span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span className="font-semibold">{skill.projects}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span className="font-semibold">{skill.endorsements}</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="font-bold">{skill.trend}</span>
          </div>
        </div>
        
        {/* Expand Icon */}
        <ChevronRight className={cn(
          "w-5 h-5 text-gray-400 transition-transform flex-shrink-0",
          isExpanded && "rotate-90"
        )} />
      </div>
      
      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Experience</div>
                <div className="font-bold text-gray-900">{skill.experience}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Last Used</div>
                <div className="font-bold text-gray-900">{skill.lastUsed}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Projects</div>
                <div className="font-bold text-gray-900">{skill.projects} completed</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Endorsements</div>
                <div className="font-bold text-gray-900">{skill.endorsements} people</div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 bg-mint-500 hover:bg-mint-600 text-white rounded-lg font-semibold text-sm transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-lg font-semibold text-sm text-gray-700 transition-colors">
                Endorse
              </button>
              <button className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-lg font-semibold text-sm text-gray-700 transition-colors">
                View Projects
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// SKILL PROGRESSION TIMELINE
// ============================================================================

function SkillProgressionTimeline() {
  const data = [
    { month: 'Jan', frontend: 88, backend: 82, devops: 70 },
    { month: 'Feb', frontend: 89, backend: 83, devops: 72 },
    { month: 'Mar', frontend: 90, backend: 84, devops: 74 },
    { month: 'Apr', frontend: 91, backend: 85, devops: 75 },
    { month: 'May', frontend: 92, backend: 86, devops: 76 },
    { month: 'Jun', frontend: 93, backend: 87, devops: 77 },
    { month: 'Jul', frontend: 93, backend: 88, devops: 78 },
    { month: 'Aug', frontend: 94, backend: 88, devops: 78 },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-green-600" />
          Skill Progression
        </h3>
        <select className="px-4 py-2 bg-gray-100 rounded-xl font-semibold text-sm text-gray-700 border-2 border-gray-200">
          <option>Last 8 Months</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorFrontend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBackend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDevops" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} domain={[65, 100]} />
          <Tooltip 
            contentStyle={{ 
              background: 'white', 
              border: '2px solid #E5E7EB', 
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="frontend" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fill="url(#colorFrontend)"
            name="Frontend"
          />
          <Area 
            type="monotone" 
            dataKey="backend" 
            stroke="#10B981" 
            strokeWidth={3}
            fill="url(#colorBackend)"
            name="Backend"
          />
          <Area 
            type="monotone" 
            dataKey="devops" 
            stroke="#F59E0B" 
            strokeWidth={3}
            fill="url(#colorDevops)"
            name="DevOps"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-sm font-semibold text-gray-700">Frontend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-sm font-semibold text-gray-700">Backend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-sm font-semibold text-gray-700">DevOps</span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SKILLS BY PROJECT
// ============================================================================

function SkillsByProject() {
  const projects = [
    { name: 'E-Commerce Platform', skills: ['React', 'Node.js', 'MongoDB'], duration: '6 months', status: 'completed' },
    { name: 'Mobile App Redesign', skills: ['React Native', 'TypeScript', 'Figma'], duration: '3 months', status: 'active' },
    { name: 'API Migration', skills: ['Node.js', 'PostgreSQL', 'AWS'], duration: '4 months', status: 'completed' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Briefcase className="w-7 h-7 text-purple-600" />
        Skills by Project
      </h3>
      
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.duration}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                    project.status === 'completed' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// SKILL RADAR CHART
// ============================================================================

function SkillRadarChart() {
  const radarData = [
    { skill: 'Frontend', current: 92, target: 100 },
    { skill: 'Backend', current: 88, target: 100 },
    { skill: 'DevOps', current: 78, target: 100 },
    { skill: 'Design', current: 76, target: 100 },
    { skill: 'Soft Skills', current: 90, target: 100 },
    { skill: 'Architecture', current: 85, target: 100 },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-blue-500" />
        Skill Distribution
      </h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
          <Radar name="Current" dataKey="current" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
          <Radar name="Target" dataKey="target" stroke="#80EFC0" fill="#80EFC0" fillOpacity={0.1} strokeDasharray="5 5" />
        </RadarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs font-semibold text-gray-700">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-mint-500 rounded-full" />
          <span className="text-xs font-semibold text-gray-700">Target</span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// CERTIFICATIONS CARD
// ============================================================================

function CertificationsCard() {
  const certifications = [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023', icon: '☁️', color: 'from-orange-500 to-amber-500' },
    { name: 'React Advanced Patterns', issuer: 'Meta', date: '2023', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js Professional', issuer: 'OpenJS Foundation', date: '2022', icon: '🟢', color: 'from-green-500 to-emerald-500' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-amber-600" />
        Certifications
      </h3>
      
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-amber-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl shadow-md flex-shrink-0",
                cert.color
              )}>
                {cert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm mb-1">{cert.name}</h4>
                <p className="text-xs text-gray-600 font-semibold">{cert.issuer}</p>
                <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-sm text-gray-700 transition-colors">
        View All Certifications →
      </button>
    </motion.div>
  );
}

// ============================================================================
// ENDORSEMENTS CARD
// ============================================================================

function EndorsementsCard() {
  const endorsements = [
    { skill: 'React', count: 8, endorsers: ['Sarah Chen', 'Mike Johnson', 'Emily Davis'] },
    { skill: 'Leadership', count: 12, endorsers: ['David Brown', 'Jane Smith'] },
    { skill: 'Node.js', count: 10, endorsers: ['John Doe', 'Alice Williams'] },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <ThumbsUp className="w-6 h-6 text-pink-600" />
        Top Endorsements
      </h3>
      
      <div className="space-y-4">
        {endorsements.map((endorsement, index) => (
          <div
            key={index}
            className="p-4 bg-pink-50 rounded-xl border-2 border-pink-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-900">{endorsement.skill}</span>
              <span className="text-sm font-black text-pink-600">{endorsement.count} endorsements</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {endorsement.endorsers.map((name, i) => (
                <span key={i} className="text-xs text-gray-600 font-semibold">
                  {name}
                  {i < endorsement.endorsers.length - 1 && ','}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl font-semibold text-sm transition-colors">
        View All Endorsements →
      </button>
    </motion.div>
  );
}

// ============================================================================
// LEARNING RECOMMENDATIONS
// ============================================================================

function LearningRecommendations() {
  const recommendations = [
    { title: 'Kubernetes Advanced', reason: 'Based on your DevOps skills', icon: '⎈', color: 'from-blue-600 to-indigo-700' },
    { title: 'System Design Mastery', reason: 'Level up your architecture skills', icon: '🏗️', color: 'from-purple-500 to-pink-500' },
    { title: 'GraphQL Deep Dive', reason: 'Expand your backend expertise', icon: '◆', color: 'from-pink-500 to-purple-500' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-amber-600" />
        Learning Recommendations
      </h3>
      
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200 hover:border-amber-300 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl shadow-md flex-shrink-0",
                rec.color
              )}>
                {rec.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm mb-1">{rec.title}</h4>
                <p className="text-xs text-gray-600">{rec.reason}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl font-semibold text-sm transition-colors">
        View All Recommendations →
      </button>
    </motion.div>
  );
}

// ============================================================================
// 5. ASSESSMENTS TAB
// ============================================================================

// ============================================================================
// 4. ASSESSMENTS TAB
// ============================================================================

function AssessmentsTab() {
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AssessmentsHeader />
      
      {/* Stats Overview Cards */}
      <AssessmentStatsCards />
      
      {/* Performance Timeline Chart */}
      <PerformanceTimelineChart />
      
      {/* Filter & Sort Bar */}
      <FilterSortBar 
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Assessment List (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <AssessmentsList 
            filterBy={filterBy}
            sortBy={sortBy}
            expandedAssessment={expandedAssessment}
            setExpandedAssessment={setExpandedAssessment}
          />
        </div>
        
        {/* Right: Insights Sidebar (1/3) */}
        <div className="space-y-6">
          <ScoreDistributionCard />
          <StrengthsWeaknessesCard />
          <UpcomingRetakesCard />
          <ImprovementTipsCard />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ASSESSMENTS HEADER
// ============================================================================

function AssessmentsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          Assessment History
        </h2>
        <p className="text-gray-600 font-semibold">
          Complete record of all assessments taken, scores, and performance trends
        </p>
      </div>
      
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white hover:bg-gray-50 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-mint-500 to-green-500 hover:from-mint-600 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2">
          <Play className="w-4 h-4" />
          Assign Assessment
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// ASSESSMENT STATS CARDS
// ============================================================================

function AssessmentStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {/* Total Assessments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <FileText className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">12</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Total Assessments</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">+3 this year</div>
      </motion.div>
      
      {/* Average Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl shadow-green-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Award className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">89%</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Average Score</div>
        <div className="text-xs mt-2 opacity-75 relative z-10 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          +5.2% from last quarter
        </div>
      </motion.div>
      
      {/* Pass Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-purple-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <CheckCircle2 className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">100%</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Pass Rate</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">12/12 passed</div>
      </motion.div>
      
      {/* Avg Improvement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl shadow-amber-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <TrendingUp className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">+12%</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Avg Improvement</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">Per retake</div>
      </motion.div>
      
      {/* Perfect Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Trophy className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">3</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Perfect Scores</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">100% achievements</div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// PERFORMANCE TIMELINE CHART
// ============================================================================

function PerformanceTimelineChart() {
  const data = [
    { date: 'Jan 15', score: 78, assessment: 'React Basics' },
    { date: 'Feb 10', score: 82, assessment: 'JavaScript Advanced' },
    { date: 'Mar 5', score: 85, assessment: 'TypeScript' },
    { date: 'Apr 20', score: 88, assessment: 'Node.js' },
    { date: 'May 12', score: 91, assessment: 'System Design' },
    { date: 'Jun 8', score: 89, assessment: 'AWS Fundamentals' },
    { date: 'Jul 25', score: 93, assessment: 'React Advanced' },
    { date: 'Aug 15', score: 95, assessment: 'Full Stack' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-blue-600" />
          Performance Timeline
        </h3>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} 
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            domain={[70, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              background: 'white', 
              border: '2px solid #E5E7EB', 
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
            content={({ active, payload }: any) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shadow-xl">
                    <p className="font-bold text-gray-900">{payload[0].payload.assessment}</p>
                    <p className="text-sm text-gray-600">{payload[0].payload.date}</p>
                    <p className="text-2xl font-black text-green-600 mt-1">
                      {payload[0].value}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Summary Stats Below Chart */}
      <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
        <div className="text-center">
          <div className="text-2xl font-black text-gray-900">+17%</div>
          <div className="text-xs text-gray-600 font-semibold">Total Growth</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-green-600">8/8</div>
          <div className="text-xs text-gray-600 font-semibold">Improving Trend</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-blue-600">95%</div>
          <div className="text-xs text-gray-600 font-semibold">Highest Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-purple-600">3</div>
          <div className="text-xs text-gray-600 font-semibold">Perfect Scores</div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// FILTER & SORT BAR
// ============================================================================

function FilterSortBar({ filterBy, setFilterBy, sortBy, setSortBy }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Filter:</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilterBy('all')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all",
              filterBy === 'all'
                ? "bg-mint-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            All (12)
          </button>
          <button
            onClick={() => setFilterBy('passed')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all",
              filterBy === 'passed'
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            Passed (12)
          </button>
          <button
            onClick={() => setFilterBy('retaken')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all",
              filterBy === 'retaken'
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            Retaken (4)
          </button>
          <button
            onClick={() => setFilterBy('perfect')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all",
              filterBy === 'perfect'
                ? "bg-amber-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            Perfect (3)
          </button>
        </div>
      </div>
      
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="highest">Highest Score</SelectItem>
          <SelectItem value="lowest">Lowest Score</SelectItem>
          <SelectItem value="improvement">Best Improvement</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

// ============================================================================
// ASSESSMENTS LIST
// ============================================================================

function AssessmentsList({ filterBy, sortBy, expandedAssessment, setExpandedAssessment }: any) {
  const assessments = [
    {
      id: '1',
      title: 'Full Stack Developer Assessment',
      date: 'Aug 15, 2024',
      score: 95,
      previousScore: 82,
      improvement: 13,
      duration: '2h 30m',
      status: 'passed',
      attempt: 2,
      isPerfect: false,
      breakdown: {
        mcq: { score: 92, total: 10, correct: 9 },
        coding: { score: 96, total: 5, passed: 5 },
        subjective: { score: 97, total: 3 }
      },
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      nextRetakeDate: null,
      canRetake: false
    },
    {
      id: '2',
      title: 'React Advanced Patterns',
      date: 'Jul 25, 2024',
      score: 93,
      previousScore: null,
      improvement: null,
      duration: '1h 45m',
      status: 'passed',
      attempt: 1,
      isPerfect: false,
      breakdown: {
        mcq: { score: 90, total: 15, correct: 13 },
        coding: { score: 95, total: 5, passed: 5 }
      },
      skills: ['React', 'Hooks', 'Context API'],
      nextRetakeDate: 'Sep 25, 2024',
      canRetake: true
    },
    {
      id: '3',
      title: 'AWS Fundamentals',
      date: 'Jun 8, 2024',
      score: 89,
      previousScore: null,
      improvement: null,
      duration: '2h 10m',
      status: 'passed',
      attempt: 1,
      isPerfect: false,
      breakdown: {
        mcq: { score: 88, total: 20, correct: 17 },
        coding: { score: 90, total: 3, passed: 3 }
      },
      skills: ['AWS', 'EC2', 'S3', 'Lambda'],
      nextRetakeDate: 'Aug 8, 2024',
      canRetake: true
    },
    {
      id: '4',
      title: 'System Design Fundamentals',
      date: 'May 12, 2024',
      score: 91,
      previousScore: null,
      improvement: null,
      duration: '3h 00m',
      status: 'passed',
      attempt: 1,
      isPerfect: false,
      breakdown: {
        subjective: { score: 91, total: 5 }
      },
      skills: ['System Design', 'Architecture', 'Scalability'],
      nextRetakeDate: null,
      canRetake: true
    },
    {
      id: '5',
      title: 'Node.js Backend Development',
      date: 'Apr 20, 2024',
      score: 88,
      previousScore: 75,
      improvement: 13,
      duration: '2h 15m',
      status: 'passed',
      attempt: 2,
      isPerfect: false,
      breakdown: {
        mcq: { score: 85, total: 12, correct: 10 },
        coding: { score: 90, total: 4, passed: 4 }
      },
      skills: ['Node.js', 'Express', 'REST API'],
      nextRetakeDate: null,
      canRetake: true
    },
    {
      id: '6',
      title: 'TypeScript Advanced',
      date: 'Mar 5, 2024',
      score: 100,
      previousScore: null,
      improvement: null,
      duration: '1h 30m',
      status: 'passed',
      attempt: 1,
      isPerfect: true,
      breakdown: {
        mcq: { score: 100, total: 15, correct: 15 },
        coding: { score: 100, total: 5, passed: 5 }
      },
      skills: ['TypeScript', 'Generics', 'Advanced Types'],
      nextRetakeDate: null,
      canRetake: false
    },
  ];
  
  return (
    <div className="space-y-4">
      {assessments.map((assessment, index) => (
        <AssessmentCard
          key={assessment.id}
          assessment={assessment}
          index={index}
          isExpanded={expandedAssessment === assessment.id}
          onToggleExpand={() => 
            setExpandedAssessment(
              expandedAssessment === assessment.id ? null : assessment.id
            )
          }
        />
      ))}
    </div>
  );
}

// ============================================================================
// ASSESSMENT CARD COMPONENT
// ============================================================================

function AssessmentCard({ assessment, index, isExpanded, onToggleExpand }: any) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 75) return 'from-blue-500 to-blue-600';
    if (score >= 60) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Main Card Content */}
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Score Circle */}
          <div className={cn(
            "w-24 h-24 rounded-2xl bg-gradient-to-br flex flex-col items-center justify-center text-white shadow-xl flex-shrink-0",
            getScoreBgColor(assessment.score)
          )}>
            <div className="text-3xl font-black">{assessment.score}</div>
            <div className="text-xs font-semibold opacity-90">/ 100</div>
          </div>
          
          {/* Assessment Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                  {assessment.title}
                  {assessment.isPerfect && (
                    <Trophy className="w-5 h-5 text-amber-500" />
                  )}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {assessment.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {assessment.duration}
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <RefreshCw className="w-4 h-4" />
                    Attempt {assessment.attempt}
                  </div>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {assessment.improvement && (
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +{assessment.improvement}%
                  </div>
                )}
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Passed
                </span>
              </div>
            </div>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {assessment.skills.map((skill: string) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              <div className="text-sm">
                <span className="text-gray-600 font-semibold">MCQ:</span>
                <span className={cn("ml-2 font-black", getScoreColor(assessment.breakdown.mcq?.score || 0))}>
                  {assessment.breakdown.mcq?.score}%
                </span>
              </div>
              {assessment.breakdown.coding && (
                <div className="text-sm">
                  <span className="text-gray-600 font-semibold">Coding:</span>
                  <span className={cn("ml-2 font-black", getScoreColor(assessment.breakdown.coding.score))}>
                    {assessment.breakdown.coding.score}%
                  </span>
                </div>
              )}
              {assessment.breakdown.subjective && (
                <div className="text-sm">
                  <span className="text-gray-600 font-semibold">Subjective:</span>
                  <span className={cn("ml-2 font-black", getScoreColor(assessment.breakdown.subjective.score))}>
                    {assessment.breakdown.subjective.score}%
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Expand Button */}
          <button
            onClick={onToggleExpand}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronDown className={cn(
              "w-6 h-6 text-gray-600 transition-transform",
              isExpanded && "rotate-180"
            )} />
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-mint-500 hover:bg-mint-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Report
          </button>
          {assessment.canRetake && (
            <button 
              className={cn(
                "px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2",
                assessment.nextRetakeDate
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              )}
              disabled={!!assessment.nextRetakeDate}
            >
              {assessment.nextRetakeDate ? (
                <>
                  <Lock className="w-4 h-4" />
                  Cooldown until {assessment.nextRetakeDate}
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Retake
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Expanded Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t-2 border-gray-200 bg-gray-50"
          >
            <div className="p-6">
              <AssessmentDetailedBreakdown assessment={assessment} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// ASSESSMENT DETAILED BREAKDOWN
// ============================================================================

function AssessmentDetailedBreakdown({ assessment }: any) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-black text-gray-900 mb-4">Detailed Breakdown</h4>
      
      {/* MCQ Breakdown */}
      {assessment.breakdown.mcq && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Multiple Choice Questions
            </h5>
            <span className="text-2xl font-black text-blue-600">
              {assessment.breakdown.mcq.score}%
            </span>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Total</div>
                <div className="text-2xl font-black text-gray-900">
                  {assessment.breakdown.mcq.total}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Correct</div>
                <div className="text-2xl font-black text-green-600">
                  {assessment.breakdown.mcq.correct}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Incorrect</div>
                <div className="text-2xl font-black text-red-600">
                  {assessment.breakdown.mcq.total - assessment.breakdown.mcq.correct}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Coding Breakdown */}
      {assessment.breakdown.coding && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-gray-900 flex items-center gap-2">
              <Code className="w-5 h-5 text-green-600" />
              Coding Challenges
            </h5>
            <span className="text-2xl font-black text-green-600">
              {assessment.breakdown.coding.score}%
            </span>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Total</div>
                <div className="text-2xl font-black text-gray-900">
                  {assessment.breakdown.coding.total}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Passed</div>
                <div className="text-2xl font-black text-green-600">
                  {assessment.breakdown.coding.passed}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Subjective Breakdown */}
      {assessment.breakdown.subjective && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Subjective Questions
            </h5>
            <span className="text-2xl font-black text-purple-600">
              {assessment.breakdown.subjective.score}%
            </span>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <div className="text-center">
              <div className="text-xs text-gray-600 font-semibold mb-1">Total Questions</div>
              <div className="text-2xl font-black text-gray-900">
                {assessment.breakdown.subjective.total}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Previous Attempt Comparison */}
      {assessment.previousScore && (
        <div className="bg-gradient-to-r from-green-50 to-mint-50 rounded-xl p-4 border-2 border-green-200">
          <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Improvement from Previous Attempt
          </h5>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-semibold">Previous Score</div>
              <div className="text-3xl font-black text-gray-900">{assessment.previousScore}%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600">→</div>
              <div className="text-sm text-green-600 font-bold">+{assessment.improvement}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-semibold">Current Score</div>
              <div className="text-3xl font-black text-green-600">{assessment.score}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SCORE DISTRIBUTION CARD
// ============================================================================

function ScoreDistributionCard() {
  const data = [
    { name: '90-100', value: 3, color: '#10B981' },
    { name: '75-89', value: 7, color: '#3B82F6' },
    { name: '60-74', value: 2, color: '#F59E0B' },
    { name: '<60', value: 0, color: '#EF4444' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        Score Distribution
      </h3>
      
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-semibold text-gray-700">{item.name}</span>
            </div>
            <span className="font-black text-gray-900">{item.value} assessments</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// STRENGTHS & WEAKNESSES CARD
// ============================================================================

function StrengthsWeaknessesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-purple-600" />
        Strengths & Weaknesses
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">Top Strengths</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="space-y-2">
            {['React', 'TypeScript', 'Node.js'].map((skill) => (
              <div key={skill} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-900">{skill}</span>
                <span className="text-sm font-black text-green-600">95%+</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">Areas to Improve</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="space-y-2">
            {['AWS', 'System Design'].map((skill) => (
              <div key={skill} className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-900">{skill}</span>
                <span className="text-sm font-black text-amber-600">75-85%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// UPCOMING RETAKES CARD
// ============================================================================

function UpcomingRetakesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-blue-600" />
        Upcoming Retakes
      </h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="font-bold text-gray-900 text-sm mb-1">React Advanced Patterns</div>
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Available Sep 25, 2024
          </div>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="font-bold text-gray-900 text-sm mb-1">AWS Fundamentals</div>
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Available Aug 8, 2024
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// IMPROVEMENT TIPS CARD
// ============================================================================

function ImprovementTipsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-mint-50 to-green-50 rounded-3xl p-6 border-2 border-mint-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-amber-600" />
        Improvement Tips
      </h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-white rounded-xl border-2 border-gray-200">
          <div className="flex items-start gap-2">
            <Book className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-bold text-gray-900 text-sm mb-1">Focus on System Design</div>
              <div className="text-xs text-gray-600">Review scalability patterns and architecture principles</div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white rounded-xl border-2 border-gray-200">
          <div className="flex items-start gap-2">
            <Code className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-bold text-gray-900 text-sm mb-1">Practice AWS Services</div>
              <div className="text-xs text-gray-600">Hands-on labs for EC2, S3, and Lambda</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// 6. LEARNING TAB
// ============================================================================

// ============================================================================
// 6. LEARNING JOURNEY TAB
// ============================================================================

function LearningTab() {
  const [selectedPath, setSelectedPath] = useState<string | null>('fullstack');
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <LearningHeader />
      
      {/* Learning Stats Overview */}
      <LearningStatsCards />
      
      {/* Learning Streak & Progress */}
      <StreakProgressSection />
      
      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Learning Paths & Courses (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Path Roadmap */}
          <LearningPathRoadmap 
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
          />
          
          {/* Active Courses */}
          <ActiveCoursesSection />
          
          {/* Completed Courses */}
          <CompletedCoursesSection />
        </div>
        
        {/* Right: Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Learning Goals */}
          <LearningGoalsCard />
          
          {/* Achievements & Badges */}
          <AchievementsBadgesCard />
          
          {/* Certifications */}
          <LearningCertificationsCard />
          
          {/* Recommended Courses */}
          <RecommendedCoursesCard />
        </div>
      </div>
      
      {/* Learning Timeline */}
      <LearningTimeline />
    </div>
  );
}

// ============================================================================
// LEARNING HEADER
// ============================================================================

function LearningHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          Learning Journey
        </h2>
        <p className="text-gray-600 font-semibold">
          Track progress, complete courses, and unlock new skills on your path to mastery
        </p>
      </div>
      
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white hover:bg-gray-50 rounded-xl font-semibold text-gray-700 border-2 border-gray-200 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// LEARNING STATS CARDS
// ============================================================================

function LearningStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {/* Total Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Clock className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">124h</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Learning Hours</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">+18h this month</div>
      </motion.div>
      
      {/* Courses Completed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl shadow-green-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <CheckCircle2 className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">28</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Courses Done</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">+5 this year</div>
      </motion.div>
      
      {/* Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-purple-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Award className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">12</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Certificates</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">Verified</div>
      </motion.div>
      
      {/* Learning Streak */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl shadow-amber-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Flame className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">15</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Day Streak</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">Keep it up! 🔥</div>
      </motion.div>
      
      {/* Skill Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl shadow-pink-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <Zap className="w-8 h-8 mb-3 relative z-10" />
        <div className="text-4xl font-black mb-1 relative z-10">Lvl 8</div>
        <div className="text-sm font-semibold opacity-90 relative z-10">Skill Level</div>
        <div className="text-xs mt-2 opacity-75 relative z-10">Expert tier</div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// STREAK & PROGRESS SECTION
// ============================================================================

function StreakProgressSection() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyProgress = [true, true, true, true, true, false, false]; // Last 7 days
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-2">
            <Flame className="w-7 h-7 text-orange-500" />
            Learning Streak
          </h3>
          <p className="text-gray-600 font-semibold">
            You're on a 15-day streak! Keep learning to maintain it.
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-5xl font-black text-orange-500">15</div>
          <div className="text-sm text-gray-600 font-semibold">days in a row</div>
        </div>
      </div>
      
      {/* Weekly Calendar */}
      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-xs text-gray-600 font-semibold mb-2">{day}</div>
            <div className={cn(
              "w-full aspect-square rounded-xl flex items-center justify-center transition-all",
              dailyProgress[index]
                ? "bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg"
                : "bg-gray-100 border-2 border-gray-200 border-dashed"
            )}>
              {dailyProgress[index] ? (
                <Flame className="w-6 h-6 text-white" />
              ) : (
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-900">Next Milestone: 30 days</span>
          <span className="text-sm font-bold text-orange-600">50% there</span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// LEARNING PATH ROADMAP
// ============================================================================

function LearningPathRoadmap({ selectedPath, setSelectedPath }: any) {
  const paths = [
    {
      id: 'fullstack',
      name: 'Full Stack Developer Path',
      progress: 65,
      icon: '🚀',
      color: 'from-blue-500 to-indigo-500',
      totalCourses: 12,
      completedCourses: 8,
      estimatedWeeks: 8,
      status: 'active'
    },
    {
      id: 'cloud',
      name: 'AWS Cloud Architect Path',
      progress: 40,
      icon: '☁️',
      color: 'from-orange-500 to-amber-500',
      totalCourses: 10,
      completedCourses: 4,
      estimatedWeeks: 12,
      status: 'active'
    },
    {
      id: 'systemdesign',
      name: 'System Design Mastery',
      progress: 25,
      icon: '🏗️',
      color: 'from-purple-500 to-pink-500',
      totalCourses: 8,
      completedCourses: 2,
      estimatedWeeks: 10,
      status: 'active'
    },
  ];
  
  const milestones = [
    { 
      id: 1, 
      title: 'React Fundamentals', 
      status: 'completed',
      course: 'React Complete Guide',
      platform: 'Udemy',
      duration: '12h',
      completedDate: 'Jun 2024'
    },
    { 
      id: 2, 
      title: 'TypeScript Mastery', 
      status: 'completed',
      course: 'TypeScript Advanced',
      platform: 'Coursera',
      duration: '8h',
      completedDate: 'Jul 2024'
    },
    { 
      id: 3, 
      title: 'Node.js Backend', 
      status: 'completed',
      course: 'Node.js Complete Course',
      platform: 'Udemy',
      duration: '15h',
      completedDate: 'Jul 2024'
    },
    { 
      id: 4, 
      title: 'Database Design', 
      status: 'in_progress',
      course: 'PostgreSQL Deep Dive',
      platform: 'Internal',
      duration: '10h',
      progress: 60
    },
    { 
      id: 5, 
      title: 'API Development', 
      status: 'in_progress',
      course: 'RESTful API Design',
      platform: 'YouTube',
      duration: '6h',
      progress: 30
    },
    { 
      id: 6, 
      title: 'Deployment & DevOps', 
      status: 'locked',
      course: 'Docker & Kubernetes',
      platform: 'Udemy',
      duration: '20h',
      unlockAfter: 'Complete Database Design'
    },
    { 
      id: 7, 
      title: 'Final Project', 
      status: 'locked',
      course: 'Full Stack Capstone',
      platform: 'Internal',
      duration: '40h',
      unlockAfter: 'Complete all courses'
    },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Target className="w-7 h-7 text-purple-600" />
        Learning Path Roadmap
      </h3>
      
      {/* Path Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {paths.map((path) => (
          <button
            key={path.id}
            onClick={() => setSelectedPath(path.id)}
            className={cn(
              "text-left p-4 rounded-2xl border-2 transition-all",
              selectedPath === path.id
                ? "border-purple-500 bg-purple-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <div className="text-3xl mb-2">{path.icon}</div>
            <h4 className="font-bold text-gray-900 mb-2">{path.name}</h4>
            <div className="text-sm text-gray-600 mb-3">
              {path.completedCourses}/{path.totalCourses} courses • {path.estimatedWeeks} weeks
            </div>
            <Progress value={path.progress} className="h-2" />
            <div className="text-xs font-bold text-purple-600 mt-2">{path.progress}% complete</div>
          </button>
        ))}
      </div>
      
      {/* Roadmap Visualization */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-gray-300" />
        
        {/* Milestones */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <MilestoneNode 
              key={milestone.id} 
              milestone={milestone} 
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MilestoneNode({ milestone, index }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-600';
      case 'in_progress': return 'bg-blue-500 border-blue-600';
      case 'locked': return 'bg-gray-300 border-gray-400';
      default: return 'bg-gray-200 border-gray-300';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-white" />;
      case 'in_progress': return <PlayCircle className="w-5 h-5 text-white" />;
      case 'locked': return <Lock className="w-5 h-5 text-white" />;
      default: return null;
    }
  };
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Udemy': return 'bg-orange-100 text-orange-700';
      case 'Coursera': return 'bg-blue-100 text-blue-700';
      case 'YouTube': return 'bg-red-100 text-red-700';
      case 'Internal': return 'bg-mint-100 text-mint-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-20"
    >
      {/* Node Circle */}
      <div className={cn(
        "absolute left-0 w-16 h-16 rounded-2xl border-4 flex items-center justify-center shadow-xl",
        getStatusColor(milestone.status)
      )}>
        {getStatusIcon(milestone.status)}
      </div>
      
      {/* Content Card */}
      <div 
        onClick={() => milestone.status !== 'locked' && setIsExpanded(!isExpanded)}
        className={cn(
          "bg-white rounded-2xl p-6 border-2 transition-all",
          milestone.status === 'locked' 
            ? "border-gray-200 opacity-60" 
            : "border-gray-200 hover:border-gray-300 hover:shadow-lg cursor-pointer"
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-lg font-black text-gray-900">{milestone.title}</h4>
              <span className={cn(
                "px-2 py-1 rounded-lg text-xs font-bold",
                getPlatformColor(milestone.platform)
              )}>
                {milestone.platform}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 font-semibold mb-2">{milestone.course}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {milestone.duration}
              </div>
              {milestone.status === 'completed' && milestone.completedDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {milestone.completedDate}
                </div>
              )}
            </div>
            
            {/* Progress Bar for In Progress */}
            {milestone.status === 'in_progress' && milestone.progress && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-700">Progress</span>
                  <span className="text-xs font-bold text-blue-600">{milestone.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {/* Locked Message */}
            {milestone.status === 'locked' && milestone.unlockAfter && (
              <div className="mt-3 p-3 bg-gray-100 rounded-lg flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700 font-semibold">
                  {milestone.unlockAfter}
                </span>
              </div>
            )}
          </div>
          
          {/* Status Badge */}
          <div className="ml-4">
            {milestone.status === 'completed' && (
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Done
              </div>
            )}
            {milestone.status === 'in_progress' && (
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold flex items-center gap-1">
                <PlayCircle className="w-4 h-4" />
                In Progress
              </div>
            )}
            {milestone.status === 'locked' && (
              <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-bold flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Locked
              </div>
            )}
          </div>
        </div>
        
        {/* Expanded Actions */}
        <AnimatePresence>
          {isExpanded && milestone.status !== 'locked' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex gap-2">
                {milestone.status === 'in_progress' && (
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    Continue Learning
                  </button>
                )}
                {milestone.status === 'completed' && (
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    View Certificate
                  </button>
                )}
                <button className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 transition-all flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open Course
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ============================================================================
// ACTIVE COURSES SECTION
// ============================================================================

function ActiveCoursesSection() {
  const activeCourses = [
    {
      id: 1,
      title: 'PostgreSQL Deep Dive',
      platform: 'Internal',
      instructor: 'Sarah Chen',
      progress: 60,
      totalHours: 10,
      completedHours: 6,
      thumbnail: '🗄️',
      color: 'from-mint-500 to-green-500',
      lastAccessed: '2 hours ago',
      nextLesson: 'Advanced Joins and Subqueries',
      dueDate: 'Sep 15, 2024'
    },
    {
      id: 2,
      title: 'RESTful API Design',
      platform: 'YouTube',
      instructor: 'Tech With Tim',
      progress: 30,
      totalHours: 6,
      completedHours: 1.8,
      thumbnail: '🔌',
      color: 'from-red-500 to-rose-500',
      lastAccessed: '1 day ago',
      nextLesson: 'Authentication & Authorization',
      dueDate: 'Sep 20, 2024'
    },
    {
      id: 3,
      title: 'React Performance Optimization',
      platform: 'Udemy',
      instructor: 'Maximilian Schwarzmüller',
      progress: 15,
      totalHours: 8,
      completedHours: 1.2,
      thumbnail: '⚡',
      color: 'from-blue-500 to-cyan-500',
      lastAccessed: '3 days ago',
      nextLesson: 'Memoization Techniques',
      dueDate: 'Sep 25, 2024'
    },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <PlayCircle className="w-7 h-7 text-blue-600" />
          Active Courses
        </h3>
        <span className="text-sm font-semibold text-gray-600">{activeCourses.length} in progress</span>
      </div>
      
      <div className="space-y-4">
        {activeCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all cursor-pointer border-2 border-transparent hover:border-gray-200"
          >
            <div className="flex items-start gap-4">
              {/* Thumbnail */}
              <div className={cn(
                "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-lg flex-shrink-0",
                course.color
              )}>
                {course.thumbnail}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">{course.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold">{course.instructor}</span>
                      <span>•</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-lg text-xs font-bold",
                        course.platform === 'Udemy' && "bg-orange-100 text-orange-700",
                        course.platform === 'YouTube' && "bg-red-100 text-red-700",
                        course.platform === 'Internal' && "bg-mint-100 text-mint-700"
                      )}>
                        {course.platform}
                      </span>
                    </div>
                  </div>
                  
                  <span className="text-2xl font-black text-blue-600">{course.progress}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-600 font-semibold">
                    <span>{course.completedHours}h / {course.totalHours}h</span>
                    <span>{course.totalHours - course.completedHours}h remaining</span>
                  </div>
                </div>
                
                {/* Info Row */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.lastAccessed}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due {course.dueDate}
                  </div>
                </div>
                
                {/* Next Lesson */}
                <div className="p-3 bg-blue-50 rounded-lg border-2 border-blue-200 mb-3">
                  <div className="text-xs text-blue-700 font-bold mb-1">Up Next:</div>
                  <div className="text-sm font-bold text-gray-900">{course.nextLesson}</div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    Continue
                  </button>
                  <button className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 transition-all">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// COMPLETED COURSES SECTION
// ============================================================================

function CompletedCoursesSection() {
  const completedCourses = [
    {
      id: 1,
      title: 'React Complete Guide',
      platform: 'Udemy',
      instructor: 'Maximilian Schwarzmüller',
      completedDate: 'Jun 15, 2024',
      duration: '12h',
      thumbnail: '⚛️',
      color: 'from-blue-500 to-cyan-500',
      certificate: true,
      rating: 5
    },
    {
      id: 2,
      title: 'TypeScript Advanced',
      platform: 'Coursera',
      instructor: 'Dr. Angela Yu',
      completedDate: 'Jul 10, 2024',
      duration: '8h',
      thumbnail: '📘',
      color: 'from-blue-600 to-indigo-600',
      certificate: true,
      rating: 5
    },
    {
      id: 3,
      title: 'Node.js Complete Course',
      platform: 'Udemy',
      instructor: 'Jonas Schmedtmann',
      completedDate: 'Jul 25, 2024',
      duration: '15h',
      thumbnail: '🟢',
      color: 'from-green-500 to-emerald-500',
      certificate: true,
      rating: 5
    },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
          Completed Courses
        </h3>
        <span className="text-sm font-semibold text-gray-600">{completedCourses.length} completed</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {completedCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all cursor-pointer border-2 border-transparent hover:border-gray-200"
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg mb-4",
              course.color
            )}>
              {course.thumbnail}
            </div>
            <h4 className="font-black text-gray-900 mb-2">{course.title}</h4>
            <div className="text-sm text-gray-600 mb-3">
              <div className="font-semibold">{course.instructor}</div>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3" />
                {course.completedDate}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(course.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {course.certificate && (
                <Award className="w-5 h-5 text-green-600" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// LEARNING GOALS CARD
// ============================================================================

function LearningGoalsCard() {
  const goals = [
    { id: 1, title: 'Complete Full Stack Path', progress: 65, target: 100, dueDate: 'Dec 2024', color: 'blue' },
    { id: 2, title: 'Earn AWS Certification', progress: 40, target: 100, dueDate: 'Nov 2024', color: 'orange' },
    { id: 3, title: 'Master System Design', progress: 25, target: 100, dueDate: 'Jan 2025', color: 'purple' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Target className="w-6 h-6 text-purple-600" />
        Learning Goals
      </h3>
      
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-900 text-sm">{goal.title}</h4>
              <span className="text-xs font-bold text-gray-600">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Due {goal.dueDate}</span>
              <span className="font-semibold">{goal.progress}/{goal.target}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" />
        Add Goal
      </button>
    </motion.div>
  );
}

// ============================================================================
// ACHIEVEMENTS & BADGES CARD
// ============================================================================

function AchievementsBadgesCard() {
  const achievements = [
    { id: 1, name: 'Early Bird', icon: '🌅', description: 'Completed 5 courses before 9 AM', unlocked: true },
    { id: 2, name: 'Night Owl', icon: '🦉', description: 'Learned 10 hours after midnight', unlocked: true },
    { id: 3, name: 'Streak Master', icon: '🔥', description: '30-day learning streak', unlocked: false },
    { id: 4, name: 'Speed Learner', icon: '⚡', description: 'Complete course in 1 day', unlocked: true },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-amber-600" />
        Achievements
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn(
              "p-4 rounded-xl text-center border-2 transition-all",
              achievement.unlocked
                ? "bg-white border-amber-300 shadow-md"
                : "bg-gray-100 border-gray-300 opacity-50"
            )}
          >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <div className={cn(
              "text-xs font-bold mb-1",
              achievement.unlocked ? "text-gray-900" : "text-gray-500"
            )}>
              {achievement.name}
            </div>
            {achievement.unlocked && (
              <div className="text-xs text-gray-600">{achievement.description}</div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// LEARNING CERTIFICATIONS CARD
// ============================================================================

function LearningCertificationsCard() {
  const certifications = [
    { id: 1, name: 'React Developer', issuer: 'Udemy', date: 'Jun 2024', verified: true },
    { id: 2, name: 'TypeScript Expert', issuer: 'Coursera', date: 'Jul 2024', verified: true },
    { id: 3, name: 'Node.js Professional', issuer: 'Udemy', date: 'Jul 2024', verified: true },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-purple-600" />
        Certifications
      </h3>
      
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-900 text-sm">{cert.name}</h4>
              {cert.verified && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className="text-xs text-gray-600">
              <div className="font-semibold">{cert.issuer}</div>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" />
                {cert.date}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 transition-all">
        View All Certificates
      </button>
    </motion.div>
  );
}

// ============================================================================
// RECOMMENDED COURSES CARD
// ============================================================================

function RecommendedCoursesCard() {
  const recommendations = [
    { id: 1, title: 'Docker & Kubernetes', platform: 'Udemy', duration: '20h', color: 'blue' },
    { id: 2, title: 'GraphQL Mastery', platform: 'Coursera', duration: '12h', color: 'pink' },
    { id: 3, title: 'Microservices Architecture', platform: 'Internal', duration: '15h', color: 'purple' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-blue-200 shadow-xl"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-blue-600" />
        Recommended
      </h3>
      
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all cursor-pointer">
            <h4 className="font-bold text-gray-900 text-sm mb-1">{rec.title}</h4>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{rec.platform}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {rec.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all">
        Explore More
      </button>
    </motion.div>
  );
}

// ============================================================================
// LEARNING TIMELINE
// ============================================================================

function LearningTimeline() {
  const timelineEvents = [
    { date: 'Aug 15, 2024', event: 'Completed Full Stack Assessment', type: 'assessment', icon: FileText },
    { date: 'Aug 10, 2024', event: 'Earned React Developer Certificate', type: 'certificate', icon: Award },
    { date: 'Aug 5, 2024', event: 'Started PostgreSQL Deep Dive', type: 'course', icon: BookOpen },
    { date: 'Jul 25, 2024', event: 'Completed Node.js Course', type: 'course', icon: CheckCircle2 },
    { date: 'Jul 20, 2024', event: 'Achieved 10-day learning streak', type: 'achievement', icon: Flame },
    { date: 'Jul 10, 2024', event: 'Completed TypeScript Advanced', type: 'course', icon: CheckCircle2 },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl"
    >
      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="w-7 h-7 text-purple-600" />
        Learning Timeline
      </h3>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-gray-300" />
        
        <div className="space-y-6">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <div key={index} className="relative pl-20">
                {/* Icon Circle */}
                <div className="absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                  <div className="text-xs text-gray-600 font-semibold mb-1">{event.date}</div>
                  <div className="font-bold text-gray-900">{event.event}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// 7. PROJECTS TAB
// ============================================================================

function ProjectsTab() {
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Projects</h2>
      <p className="text-gray-600">Project assignments coming soon...</p>
    </div>
  );
}

