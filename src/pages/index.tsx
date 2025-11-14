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

// Premium 3D Stat Card
const StatCard = memo(({ icon: Icon, label, value, colorClass, gradient }: { 
  icon: React.ElementType; 
  label: string; 
  value: number; 
  colorClass: string;
  gradient: string;
}) => (
  <div className="card-3d ultra-glass rounded-[32px] p-10 relative overflow-hidden group border border-amber-500/10 hover:border-amber-500/25 transition-all duration-500">
    {/* Animated background gradient */}
    <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-25 transition-all duration-500`} />
    
    {/* Enhanced decorative elements */}
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
    <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-tr from-purple-500/15 to-amber-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div className={`p-5 rounded-[20px] ${gradient} shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden`}>
          <div className="absolute inset-0 shimmer opacity-20" />
          <Icon size={36} className="text-white relative z-10" strokeWidth={2.5} />
        </div>
        <div className="relative">
          <Star className={`${colorClass} opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180 group-hover:scale-125 drop-shadow-lg`} size={28} strokeWidth={2.5} />
        </div>
      </div>
      
      <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em] mb-3 opacity-90">
        {label}
      </p>
      <p className={`text-6xl font-black ${colorClass} mb-4 drop-shadow-lg tracking-tight`}>{value}</p>
      
      {/* Enhanced progress indicator */}
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden mt-6 shadow-inner">
        <div 
          className={`h-full ${gradient} rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
          style={{ width: `${Math.min(value / 5, 100)}%` }}
        >
          <div className="absolute inset-0 shimmer opacity-50" />
        </div>
      </div>
      
      {/* Percentage label */}
      <p className="text-xs font-bold text-muted-foreground mt-2 text-right">
        {Math.min(Math.round((value / 5) * 100), 100)}% capacity
      </p>
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
  <div className="card-3d ultra-glass rounded-[32px] overflow-hidden group relative border border-amber-500/10 hover:border-amber-500/30 transition-all duration-500">
    {/* Enhanced gradient header with mesh background */}
    <div className="relative h-40 bg-gradient-to-br from-amber-600 via-purple-600 to-amber-500 overflow-hidden">
      {/* Animated mesh pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
      <div className="absolute inset-0 shimmer" />
      
      {/* Enhanced floating particles */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-white/90 rounded-full animate-ping shadow-lg" />
      <div className="absolute top-8 right-12 w-2 h-2 bg-amber-200/90 rounded-full animate-pulse delay-75 shadow-md" />
      <div className="absolute top-6 right-20 w-1.5 h-1.5 bg-white/80 rounded-full animate-ping delay-150" />
      <div className="absolute bottom-6 left-8 w-2 h-2 bg-purple-200/80 rounded-full animate-pulse delay-300" />
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[100%]" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/10 rounded-tr-[100%]" />
      
      {/* Premium status badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className={`px-5 py-2.5 rounded-2xl backdrop-blur-2xl font-black text-xs shadow-2xl border-2 flex items-center gap-2.5 relative overflow-hidden ${
          isPresent
            ? "bg-gradient-to-r from-green-500/95 to-emerald-500/95 text-white border-green-300/60 shadow-green-500/50"
            : "bg-gradient-to-r from-red-500/95 to-rose-500/95 text-white border-red-300/60 shadow-red-500/50"
        }`}>
          <div className="absolute inset-0 shimmer opacity-30" />
          <span className="relative z-10 flex items-center gap-2">
            {isPresent ? <CheckCircle size={15} strokeWidth={3} /> : <XCircle size={15} strokeWidth={3} />}
            {isPresent ? "PRESENT" : "ABSENT"}
          </span>
        </div>
      </div>
    </div>

    {/* Enhanced profile avatar - 3D floating */}
    <div className="absolute left-1/2 top-28 -translate-x-1/2 z-10">
      <div className="relative group/avatar">
        {/* Outer glow ring */}
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500 rounded-[28px] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />
        
        {/* Main avatar */}
        <div className="relative w-36 h-36 rounded-[28px] border-[5px] border-background shadow-2xl bg-gradient-to-br from-amber-500 via-purple-500 to-amber-600 p-1.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 float">
          <div className="w-full h-full rounded-[20px] bg-gradient-to-br from-card to-card/80 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-amber-500/20" />
            <div className="absolute inset-0 bg-mesh-gradient opacity-10" />
            <User size={56} className="text-amber-600 dark:text-amber-400 relative z-10 drop-shadow-lg" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>

    {/* Enhanced content */}
    <div className="pt-28 px-7 pb-7 relative">
      {/* Name with enhanced gradient */}
      <h3 className="text-2xl font-black text-center bg-gradient-to-r from-amber-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-8 line-clamp-2 min-h-[4rem] drop-shadow-sm">
        {student.name}
      </h3>

      {/* Enhanced Info Grid with better 3D effects */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-amber-500/5 hover:from-amber-500/25 hover:to-amber-500/15 transition-all duration-300 group/item border border-amber-500/10 hover:border-amber-500/30 shadow-lg hover:shadow-amber-500/20">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
            <BookOpen size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-black uppercase tracking-wider mb-0.5">UID</p>
            <p className="text-base font-black text-foreground">{student.uid}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-500/15 to-purple-500/5 hover:from-purple-500/25 hover:to-purple-500/15 transition-all duration-300 group/item border border-purple-500/10 hover:border-purple-500/30 shadow-lg hover:shadow-purple-500/20">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
            <Users size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-black uppercase tracking-wider mb-0.5">Section</p>
            <p className="text-base font-black text-foreground">{student.section}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-silver-500/15 to-silver-500/5 hover:from-silver-500/25 hover:to-silver-500/15 transition-all duration-300 group/item border border-silver-500/10 hover:border-silver-500/30 shadow-lg hover:shadow-silver-500/20">
          <div className="p-3 rounded-xl bg-gradient-to-br from-silver-500 to-silver-600 shadow-xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
            <MapPin size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-black uppercase tracking-wider mb-0.5">Group</p>
            <p className="text-base font-black text-foreground">{student.group}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-purple-500/5 hover:from-amber-500/25 hover:via-purple-500/20 hover:to-purple-500/15 transition-all duration-300 group/item border border-amber-500/10 hover:border-purple-500/30 shadow-lg hover:shadow-purple-500/20">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 via-purple-500 to-purple-600 shadow-xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
            <Calendar size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-black uppercase tracking-wider mb-0.5">Batch</p>
            <p className="text-base font-black text-foreground">{student.batch}</p>
          </div>
        </div>
      </div>

      {/* Premium Action Button with enhanced 3D */}
      <button
        onClick={() => onToggle(student.uid)}
        className={`w-full py-5 px-6 rounded-2xl font-black text-base text-white shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl active:scale-[0.98] relative overflow-hidden group/btn border-2 ${
          isPresent
            ? "bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 border-green-400/50 hover:border-green-300/70"
            : "bg-gradient-to-r from-red-500 via-rose-600 to-red-500 border-red-400/50 hover:border-red-300/70"
        }`}
      >
        <div className="absolute inset-0 shimmer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="relative z-10 flex items-center justify-center gap-2.5 drop-shadow-lg">
          {isPresent ? <XCircle size={22} strokeWidth={3} /> : <CheckCircle size={22} strokeWidth={3} />}
          <span className="tracking-wide">
            Mark {isPresent ? "Absent" : "Present"}
          </span>
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
          <div className="ultra-glass rounded-[40px] p-14 relative overflow-hidden border border-amber-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-amber-500/10 animate-pulse" />
            
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-br-[100%]" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-tl-[100%]" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-5 mb-8">
                <Sparkles className="text-amber-500 animate-spin drop-shadow-lg" size={48} strokeWidth={2.5} />
                <h1 className="text-8xl font-black bg-gradient-to-r from-amber-600 via-purple-600 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                  Attendance Portal
                </h1>
                <Zap className="text-purple-500 animate-bounce drop-shadow-lg" size={48} strokeWidth={2.5} />
              </div>
              
              <p className="text-3xl font-black text-muted-foreground mb-8 tracking-wide">
                Chandigarh University <span className="text-amber-500">•</span> CSE Department
              </p>
              
              {lastUpdated && (
                <div className="inline-flex items-center gap-4 px-8 py-4 rounded-[24px] glass-effect border border-amber-500/20 shadow-xl mb-6">
                  <Calendar size={24} className="text-amber-500" strokeWidth={2.5} />
                  <span className="text-base font-bold">
                    Last updated: {lastUpdated.toLocaleString()}
                  </span>
                </div>
              )}
              
              {stats.total > 0 && (
                <div className="mt-10 inline-block">
                  <div className="px-16 py-6 rounded-[32px] bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500 text-white font-black text-4xl shadow-2xl pulse-glow relative overflow-hidden border-4 border-white/20">
                    <div className="absolute inset-0 shimmer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <span className="relative z-10 flex items-center gap-4 drop-shadow-lg">
                      <Award size={40} strokeWidth={2.5} />
                      Attendance Rate: {stats.percentage}%
                      <TrendingUp size={40} strokeWidth={2.5} />
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
