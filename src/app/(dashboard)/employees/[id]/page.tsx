'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  XCircle
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
  Area
} from 'recharts';
import { cn } from '@/lib/utils';

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
        <SkillRadarChart />
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

function SkillRadarChart() {
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
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Skills & Expertise</h2>
      <p className="text-gray-600">Detailed skills breakdown coming soon...</p>
    </div>
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

