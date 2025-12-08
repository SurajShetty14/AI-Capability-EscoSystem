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
  Users
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
  Bar
} from 'recharts';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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

function AssessmentsTab() {
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Assessments</h2>
      <p className="text-gray-600">Assessment history coming soon...</p>
    </div>
  );
}

// ============================================================================
// 6. LEARNING TAB
// ============================================================================

function LearningTab() {
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Learning Journey</h2>
      <p className="text-gray-600">Learning journey details coming soon...</p>
    </div>
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

