import { useEffect, useState, useCallback, useMemo, memo } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Digital } from "react-activity";
import { 
  User, MapPin, Users, BookOpen, Calendar, Download, Search, 
  Sparkles, TrendingUp, Award, Zap, Star, CheckCircle, XCircle 
} from "lucide-react";
import "react-activity/dist/Digital.css";

interface Student {
  uid: string;
  name: string;
  section: string;
  group: string;
  batch: string;
}

interface Filters {
  search: string;
  section: string;
  group: string;
}

// Modern 3D Stat Card
const StatCard = memo(({ icon: Icon, label, value, colorClass, gradient }: { 
  icon: React.ElementType; 
  label: string; 
  value: number; 
  colorClass: string;
  gradient: string;
}) => (
  <div className="card-3d ultra-glass rounded-3xl p-8 relative overflow-hidden group">
    {/* Animated background gradient */}
    <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`} />
    
    {/* Decorative elements */}
    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10 backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          <Icon size={32} className={colorClass} strokeWidth={2.5} />
        </div>
        <Star className={`${colorClass} opacity-30 group-hover:opacity-100 transition-opacity duration-300`} size={24} />
      </div>
      
      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 opacity-80">
        {label}
      </p>
      <p className={`text-5xl font-black ${colorClass} mb-2`}>{value}</p>
      
      {/* Progress indicator */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-4">
        <div 
          className={`h-full ${gradient} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(value / 5, 100)}%` }}
        />
      </div>
    </div>
  </div>
));
StatCard.displayName = "StatCard";

// Ultra Modern Student Card with 3D Effect
const StudentCard = memo(({ 
  student, 
  isPresent, 
  onToggle 
}: { 
  student: Student; 
  isPresent: boolean; 
  onToggle: (uid: string) => void;
}) => (
  <div className="card-3d ultra-glass rounded-3xl overflow-hidden group relative">
    {/* Gradient header with mesh background */}
    <div className="relative h-36 bg-gradient-to-br from-amber-500 via-purple-500 to-amber-600 overflow-hidden">
      {/* Animated mesh pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
      <div className="absolute inset-0 shimmer" />
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping" />
      <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-75" />
      <div className="absolute top-6 right-20 w-1 h-1 bg-white rounded-full animate-ping delay-150" />
      
      {/* Status badge - floating */}
      <div className="absolute top-4 left-4 z-20">
        <div className={`px-4 py-2 rounded-full backdrop-blur-xl font-bold text-xs shadow-2xl border-2 flex items-center gap-2 ${
          isPresent
            ? "bg-green-500/90 text-white border-green-300/50"
            : "bg-red-500/90 text-white border-red-300/50"
        }`}>
          {isPresent ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {isPresent ? "Present" : "Absent"}
        </div>
      </div>
    </div>

    {/* Profile avatar - 3D floating */}
    <div className="absolute left-1/2 top-24 -translate-x-1/2 z-10">
      <div className="relative group/avatar">
        <div className="w-32 h-32 rounded-3xl border-4 border-card shadow-2xl bg-gradient-to-br from-amber-400 via-purple-500 to-amber-600 p-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 float">
          <div className="w-full h-full rounded-[20px] bg-card flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-purple-500/20" />
            <User size={48} className="text-primary relative z-10" strokeWidth={2} />
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-purple-500 rounded-3xl blur-xl opacity-50 group-hover/avatar:opacity-75 transition-opacity -z-10" />
      </div>
    </div>

    {/* Content */}
    <div className="pt-24 px-6 pb-6 relative">
      {/* Name with gradient */}
      <h3 className="text-2xl font-black text-center text-foreground mb-6 line-clamp-2 min-h-[4rem] text-shimmer">
        {student.name}
      </h3>

      {/* Info Grid with 3D cards */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 hover:from-amber-500/20 hover:to-amber-500/10 transition-all duration-300 group/item">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg group-hover/item:scale-110 transition-transform">
            <BookOpen size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-semibold uppercase">UID</p>
            <p className="text-sm font-bold text-foreground">{student.uid}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10 transition-all duration-300 group/item">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover/item:scale-110 transition-transform">
            <Users size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Section</p>
            <p className="text-sm font-bold text-foreground">{student.section}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-silver-500/10 to-silver-500/5 hover:from-silver-500/20 hover:to-silver-500/10 transition-all duration-300 group/item">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-silver-500 to-silver-600 shadow-lg group-hover/item:scale-110 transition-transform">
            <MapPin size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Group</p>
            <p className="text-sm font-bold text-foreground">{student.group}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-purple-500/5 hover:from-amber-500/20 hover:to-purple-500/10 transition-all duration-300 group/item">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-purple-500 shadow-lg group-hover/item:scale-110 transition-transform">
            <Calendar size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-semibold uppercase">Batch</p>
            <p className="text-sm font-bold text-foreground">{student.batch}</p>
          </div>
        </div>
      </div>

      {/* Action Button - Modern 3D */}
      <button
        onClick={() => onToggle(student.uid)}
        className={`w-full py-4 px-6 rounded-2xl font-black text-white shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl active:scale-95 relative overflow-hidden group/btn ${
          isPresent
            ? "bg-gradient-to-r from-green-500 via-green-600 to-green-500"
            : "bg-gradient-to-r from-red-500 via-red-600 to-red-500"
        }`}
      >
        <span className="absolute inset-0 shimmer" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isPresent ? <XCircle size={20} /> : <CheckCircle size={20} />}
          Mark {isPresent ? "Absent" : "Present"}
        </span>
      </button>
    </div>
  </div>
));
StudentCard.displayName = "StudentCard";

const Home = () => {
  const [filters, setFilters] = useState<Filters>({ search: "", section: "", group: "" });
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [displayedData, setDisplayedData] = useState<Student[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const cachedData = sessionStorage.getItem('students_data');
      const cacheTimestamp = sessionStorage.getItem('students_cache_time');
      const now = new Date().getTime();
      
      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < 300000) {
        const student = JSON.parse(cachedData);
        setData(student);
        const initialAttendance = student.reduce((acc: Record<string, boolean>, curr: Student) => {
          acc[curr.uid] = true;
          return acc;
        }, {});
        setAttendance(initialAttendance);
        setLastUpdated(new Date(parseInt(cacheTimestamp)));
        setLoading(false);
        return;
      }
      
      const res = await fetch("https://students-list-backend.onrender.com/all");
      if (!res.ok) throw new Error('Failed to fetch students data');
      const { student } = await res.json();
      
      sessionStorage.setItem('students_data', JSON.stringify(student));
      sessionStorage.setItem('students_cache_time', now.toString());
      
      setData(student);
      const initialAttendance = student.reduce((acc: Record<string, boolean>, curr: Student) => {
        acc[curr.uid] = true;
        return acc;
      }, {});
      setAttendance(initialAttendance);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getFilteredData = useCallback(() => {
    const searchLower = filters.search.toLowerCase().trim();
    const sectionLower = filters.section.toLowerCase().trim();
    const groupLower = filters.group.toLowerCase().trim();

    if (!searchLower && !sectionLower && !groupLower) return data;

    return data.filter((student) => {
      const matchesSearch = !searchLower || 
        student.name.toLowerCase().includes(searchLower) ||
        student.uid.toLowerCase().includes(searchLower) ||
        student.section.toLowerCase().includes(searchLower);
      const matchesSection = !sectionLower || student.section.toLowerCase().includes(sectionLower);
      const matchesGroup = !groupLower || student.group.toLowerCase().includes(groupLower);
      return matchesSearch && matchesSection && matchesGroup;
    });
  }, [data, filters]);

  const handleSearch = useCallback(() => {
    setDisplayedData(getFilteredData());
  }, [getFilteredData]);

  const handleFilterChange = useCallback((key: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [key]: e.target.value }));
  }, []);

  const handleAttendance = useCallback((uid: string) => {
    setAttendance(prev => ({ ...prev, [uid]: !prev[uid] }));
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const XLSXModule = await import("xlsx");
      const attendanceData = displayedData.map((student) => ({
        UID: student.uid,
        Name: student.name,
        Section: student.section,
        Group: student.group,
        Batch: student.batch,
        Status: attendance[student.uid] ? "Present" : "Absent",
        Timestamp: new Date().toLocaleString(),
      }));
      const worksheet = XLSXModule.utils.json_to_sheet(attendanceData);
      const workbook = XLSXModule.utils.book_new();
      XLSXModule.utils.book_append_sheet(workbook, worksheet, "Attendance");
      const maxWidth = attendanceData.reduce((w, r) => Math.max(w, r.Name.length), 10);
      worksheet["!cols"] = [{ wch: 15 }, { wch: maxWidth }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 20 }];
      XLSXModule.writeFile(workbook, `Attendance_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      setError("Failed to export data.");
    } finally {
      setIsExporting(false);
    }
  }, [displayedData, attendance]);

  const stats = useMemo(() => ({
    total: displayedData.length,
    present: displayedData.filter(s => attendance[s.uid]).length,
    absent: displayedData.filter(s => !attendance[s.uid]).length,
    percentage: displayedData.length > 0 
      ? ((displayedData.filter(s => attendance[s.uid]).length / displayedData.length) * 100).toFixed(1)
      : "0"
  }), [displayedData, attendance]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background with mesh gradient */}
      <div className="fixed inset-0 bg-background bg-mesh-gradient" />
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-12 space-y-12">
        {/* Hero Header */}
        <header className="text-center fade-in-scale">
          <div className="ultra-glass rounded-[32px] p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-amber-500/10 animate-pulse" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Sparkles className="text-amber-500 animate-spin" size={40} />
                <h1 className="text-7xl font-black text-shimmer neon-glow">
                  Attendance Portal
                </h1>
                <Zap className="text-purple-500 animate-bounce" size={40} />
              </div>
              
              <p className="text-2xl font-bold text-muted-foreground mb-6">
                Chandigarh University • CSE Department
              </p>
              
              {lastUpdated && (
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect">
                  <Calendar size={20} className="text-amber-500" />
                  <span className="text-sm font-semibold">
                    Last updated: {lastUpdated.toLocaleString()}
                  </span>
                </div>
              )}
              
              {stats.total > 0 && (
                <div className="mt-8 inline-block">
                  <div className="px-12 py-5 rounded-[28px] bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500 text-white font-black text-3xl shadow-2xl pulse-glow relative overflow-hidden">
                    <div className="absolute inset-0 shimmer" />
                    <span className="relative z-10 flex items-center gap-3">
                      <Award size={32} />
                      Attendance Rate: {stats.percentage}%
                      <TrendingUp size={32} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Search Controls */}
        <div className="ultra-glass rounded-[28px] p-8 slide-in-right">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <Input
              value={filters.search}
              onChange={handleFilterChange("search")}
              placeholder="🔍 Search by name, UID..."
              className="h-14 rounded-2xl bg-background/50 border-2 border-silver-500/30 focus:border-amber-500 transition-all text-lg font-semibold"
            />
            <Input
              value={filters.section}
              onChange={handleFilterChange("section")}
              placeholder="�� Section"
              className="h-14 rounded-2xl bg-background/50 border-2 border-silver-500/30 focus:border-purple-500 transition-all text-lg font-semibold"
            />
            <Input
              value={filters.group}
              onChange={handleFilterChange("group")}
              placeholder="👥 Group"
              className="h-14 rounded-2xl bg-background/50 border-2 border-silver-500/30 focus:border-purple-500 transition-all text-lg font-semibold"
            />
            <Button 
              onClick={handleSearch}
              className="h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-lg shadow-2xl hover:shadow-amber-500/50 transition-all"
            >
              <Search size={22} />
              Search
            </Button>
            <Button 
              onClick={handleExport}
              className="h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-black text-lg shadow-2xl hover:shadow-purple-500/50 transition-all"
              disabled={displayedData.length === 0 || isExporting}
            >
              <Download size={22} />
              {isExporting ? "Exporting..." : "Export"}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in">
          <StatCard 
            icon={Users} 
            label="Total Students" 
            value={stats.total} 
            colorClass="text-amber-600 dark:text-amber-400" 
            gradient="bg-gradient-to-br from-amber-500 to-amber-600"
          />
          <StatCard 
            icon={CheckCircle} 
            label="Present Today" 
            value={stats.present} 
            colorClass="text-green-600 dark:text-green-400" 
            gradient="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard 
            icon={XCircle} 
            label="Absent Today" 
            value={stats.absent} 
            colorClass="text-red-600 dark:text-red-400" 
            gradient="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        {error && (
          <div className="ultra-glass border-2 border-red-500 text-red-600 px-8 py-6 rounded-3xl font-bold text-lg fade-in-scale">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <Digital color="hsl(var(--primary))" size={64} speed={1} animating={true} />
            <p className="text-2xl font-bold text-muted-foreground">Loading students...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedData.length > 0 ? (
              displayedData.map((student, idx) => (
                <div key={student.uid} className="fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <StudentCard
                    student={student}
                    isPresent={attendance[student.uid]}
                    onToggle={handleAttendance}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="ultra-glass p-20 text-center rounded-[32px] border-2 border-dashed border-border">
                  <div className="space-y-6">
                    <div className="p-8 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 inline-block">
                      <Search size={64} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-3xl font-black text-foreground">
                      {data.length > 0 ? 'No students found' : 'Ready to start'}
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      {data.length > 0 
                        ? 'Try adjusting your search filters' 
                        : 'Click search to load students'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
