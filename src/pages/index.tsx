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

// Premium 3D Stat Card - RESPONSIVE
const StatCard = memo(({ icon: Icon, label, value, colorClass, gradient }: { 
  icon: React.ElementType; 
  label: string; 
  value: number; 
  colorClass: string;
  gradient: string;
}) => (
  <div className="card-3d ultra-glass rounded-2xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 relative overflow-hidden group border border-amber-500/10 hover:border-amber-500/25 transition-all duration-500">
    {/* Animated background gradient */}
    <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-25 transition-all duration-500`} />
    
    {/* Enhanced decorative elements */}
    <div className="absolute -right-6 sm:-right-10 -top-6 sm:-top-10 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
    <div className="absolute -left-4 sm:-left-8 -bottom-4 sm:-bottom-8 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-tr from-purple-500/15 to-amber-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
        <div className={`p-3 sm:p-4 lg:p-5 rounded-2xl sm:rounded-[20px] ${gradient} shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden`}>
          <div className="absolute inset-0 shimmer opacity-20" />
          <Icon size={24} className="text-white relative z-10 sm:hidden" strokeWidth={2.5} />
          <Icon size={32} className="hidden sm:block lg:hidden text-white relative z-10" strokeWidth={2.5} />
          <Icon size={36} className="hidden lg:block text-white relative z-10" strokeWidth={2.5} />
        </div>
        <div className="relative">
          <Star className={`${colorClass} opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180 group-hover:scale-125 drop-shadow-lg`} size={20} strokeWidth={2.5} />
          <Star className={`hidden sm:block ${colorClass} opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180 group-hover:scale-125 drop-shadow-lg`} size={24} strokeWidth={2.5} />
          <Star className={`hidden lg:block ${colorClass} opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180 group-hover:scale-125 drop-shadow-lg`} size={28} strokeWidth={2.5} />
        </div>
      </div>
      
      <p className="text-xs sm:text-sm font-black text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3 opacity-90">
        {label}
      </p>
      <p className={`text-4xl sm:text-5xl lg:text-6xl font-black ${colorClass} mb-2 sm:mb-4 drop-shadow-lg tracking-tight`}>{value}</p>
      
      {/* Enhanced progress indicator */}
      <div className="h-1.5 sm:h-2 bg-muted/50 rounded-full overflow-hidden mt-4 sm:mt-6 shadow-inner">
        <div 
          className={`h-full ${gradient} rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
          style={{ width: `${Math.min(value / 5, 100)}%` }}
        >
          <div className="absolute inset-0 shimmer opacity-50" />
        </div>
      </div>
      
      {/* Percentage label */}
      <p className="text-[10px] sm:text-xs font-bold text-muted-foreground mt-1 sm:mt-2 text-right">
        {Math.min(Math.round((value / 5) * 100), 100)}% capacity
      </p>
    </div>
  </div>
));
StatCard.displayName = "StatCard";

// Premium Redesigned Student Card
const StudentCard = memo(({ 
  student, 
  isPresent, 
  onToggle 
}: { 
  student: Student; 
  isPresent: boolean; 
  onToggle: (uid: string) => void;
}) => (
  <div className="card-3d ultra-glass rounded-3xl sm:rounded-[32px] overflow-hidden group relative border-2 border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 shadow-2xl hover:shadow-3xl">
    {/* Sleek gradient header */}
    <div className="relative h-32 sm:h-36 bg-gradient-to-br from-amber-500 via-purple-500 to-amber-600 overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
      <div className="absolute inset-0 shimmer opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      
      {/* Elegant floating particles */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-white/80 rounded-full animate-ping" />
      <div className="absolute top-6 sm:top-8 right-8 sm:right-12 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-200/70 rounded-full animate-pulse delay-100" />
      <div className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-purple-200/60 rounded-full animate-ping delay-200" />
      
      {/* Status badge with premium design */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
        <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl backdrop-blur-xl font-black text-[10px] sm:text-xs shadow-2xl border flex items-center gap-1.5 sm:gap-2 relative overflow-hidden ${
          isPresent
            ? "bg-emerald-500/95 text-white border-emerald-300/50 shadow-emerald-500/50"
            : "bg-rose-500/95 text-white border-rose-300/50 shadow-rose-500/50"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
            {isPresent ? <CheckCircle size={12} strokeWidth={3} className="sm:w-[14px] sm:h-[14px]" /> : <XCircle size={12} strokeWidth={3} className="sm:w-[14px] sm:h-[14px]" />}
            {isPresent ? "PRESENT" : "ABSENT"}
          </span>
        </div>
      </div>
      
      {/* Wave decoration at bottom */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '30px' }}>
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor" className="text-background"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor" className="text-background"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" className="text-background"></path>
      </svg>
    </div>

    {/* Compact profile avatar */}
    <div className="flex justify-center -mt-12 sm:-mt-14 mb-4 sm:mb-5 relative z-10">
      <div className="relative group/avatar">
        {/* Glow ring */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500 rounded-[24px] blur-xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />
        
        {/* Avatar container */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] sm:rounded-[24px] border-[3px] sm:border-4 border-background shadow-2xl bg-gradient-to-br from-amber-500 via-purple-500 to-amber-600 p-1 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
          <div className="w-full h-full rounded-[16px] sm:rounded-[18px] bg-gradient-to-br from-card to-card/90 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-purple-500/15 to-amber-500/20" />
            <User size={40} className="text-amber-600 dark:text-amber-400 relative z-10 sm:w-12 sm:h-12" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>

    {/* Card content */}
    <div className="px-4 sm:px-6 pb-5 sm:pb-6">
      {/* Student name with better typography */}
      <h3 className="text-xl sm:text-2xl font-black text-center bg-gradient-to-r from-amber-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-5 sm:mb-6 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] leading-tight">
        {student.name}
      </h3>

      {/* Compact info grid with modern design */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6">
        {/* UID */}
        <div className="col-span-2 flex items-center gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent hover:from-amber-500/20 transition-all duration-300 group/item border border-amber-500/20 hover:border-amber-500/40">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg group-hover/item:scale-110 transition-transform">
            <BookOpen size={16} className="text-white sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wide mb-0.5">Student ID</p>
            <p className="text-sm sm:text-base font-black text-foreground truncate">{student.uid}</p>
          </div>
        </div>

        {/* Section */}
        <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/20 transition-all duration-300 group/item border border-purple-500/20 hover:border-purple-500/40">
          <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover/item:scale-110 transition-transform">
            <Users size={14} className="text-white sm:w-4 sm:h-4" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Section</p>
            <p className="text-xs sm:text-sm font-black text-foreground truncate">{student.section}</p>
          </div>
        </div>

        {/* Group */}
        <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-silver-500/10 to-transparent hover:from-silver-500/20 transition-all duration-300 group/item border border-silver-500/20 hover:border-silver-500/40">
          <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-silver-500 to-silver-600 shadow-lg group-hover/item:scale-110 transition-transform">
            <MapPin size={14} className="text-white sm:w-4 sm:h-4" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Group</p>
            <p className="text-xs sm:text-sm font-black text-foreground truncate">{student.group}</p>
          </div>
        </div>

        {/* Batch */}
        <div className="col-span-2 flex items-center gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/10 via-amber-500/5 to-transparent hover:from-purple-500/20 hover:via-amber-500/15 transition-all duration-300 group/item border border-purple-500/20 hover:border-amber-500/40">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500 shadow-lg group-hover/item:scale-110 transition-transform">
            <Calendar size={16} className="text-white sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wide mb-0.5">Batch</p>
            <p className="text-sm sm:text-base font-black text-foreground truncate">{student.batch}</p>
          </div>
        </div>
      </div>

      {/* Modern action button */}
      <button
        onClick={() => onToggle(student.uid)}
        className={`w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base text-white shadow-2xl transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/btn ${
          isPresent
            ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-green-600"
            : "bg-gradient-to-r from-rose-500 via-rose-600 to-red-500 hover:from-rose-600 hover:via-rose-700 hover:to-red-600"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
        <div className="absolute inset-0 shimmer opacity-30" />
        <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-lg">
          {isPresent ? (
            <>
              <XCircle size={18} strokeWidth={3} className="sm:w-5 sm:h-5" />
              <span className="tracking-wide">Mark Absent</span>
            </>
          ) : (
            <>
              <CheckCircle size={18} strokeWidth={3} className="sm:w-5 sm:h-5" />
              <span className="tracking-wide">Mark Present</span>
            </>
          )}
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
      
      {/* Floating orbs - hidden on mobile */}
      <div className="hidden md:block fixed top-20 left-20 w-64 h-64 lg:w-96 lg:h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="hidden md:block fixed bottom-20 right-20 w-64 h-64 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Hero Header */}
        <header className="text-center fade-in-scale">
          <div className="ultra-glass rounded-3xl sm:rounded-[40px] p-6 sm:p-10 lg:p-14 relative overflow-hidden border border-amber-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-amber-500/10 animate-pulse" />
            
            {/* Decorative corner elements - hidden on mobile */}
            <div className="hidden sm:block absolute top-0 left-0 w-20 lg:w-32 h-20 lg:h-32 bg-amber-500/10 rounded-br-[100%]" />
            <div className="hidden sm:block absolute bottom-0 right-0 w-20 lg:w-32 h-20 lg:h-32 bg-purple-500/10 rounded-tl-[100%]" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-4 sm:mb-8">
                <Sparkles className="text-amber-500 animate-spin drop-shadow-lg" size={32} strokeWidth={2.5} />
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black bg-gradient-to-r from-amber-600 via-purple-600 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                  Attendance Portal
                </h1>
                <Zap className="text-purple-500 animate-bounce drop-shadow-lg" size={32} strokeWidth={2.5} />
              </div>
              
              <p className="text-lg sm:text-2xl lg:text-3xl font-black text-muted-foreground mb-4 sm:mb-8 tracking-wide">
                Chandigarh University <span className="text-amber-500">•</span> CSE Department
              </p>
              
              {lastUpdated && (
                <div className="inline-flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-2 sm:py-4 rounded-2xl sm:rounded-[24px] glass-effect border border-amber-500/20 shadow-xl mb-4 sm:mb-6">
                  <Calendar size={18} className="text-amber-500 sm:hidden" strokeWidth={2.5} />
                  <Calendar size={24} className="hidden sm:block text-amber-500" strokeWidth={2.5} />
                  <span className="text-xs sm:text-base font-bold">
                    Last updated: {lastUpdated.toLocaleString()}
                  </span>
                </div>
              )}
              
              {stats.total > 0 && (
                <div className="mt-6 sm:mt-10 inline-block">
                  <div className="px-6 sm:px-12 lg:px-16 py-3 sm:py-5 lg:py-6 rounded-3xl sm:rounded-[32px] bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500 text-white font-black text-xl sm:text-3xl lg:text-4xl shadow-2xl pulse-glow relative overflow-hidden border-2 sm:border-4 border-white/20">
                    <div className="absolute inset-0 shimmer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <span className="relative z-10 flex items-center gap-2 sm:gap-4 drop-shadow-lg">
                      <Award size={24} className="sm:hidden" strokeWidth={2.5} />
                      <Award size={40} className="hidden sm:block" strokeWidth={2.5} />
                      <span className="text-sm sm:text-3xl lg:text-4xl">Attendance Rate: {stats.percentage}%</span>
                      <TrendingUp size={24} className="sm:hidden" strokeWidth={2.5} />
                      <TrendingUp size={40} className="hidden sm:block" strokeWidth={2.5} />
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
          <div className="ultra-glass border-2 border-red-500 text-red-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-bold text-sm sm:text-base lg:text-lg fade-in-scale">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-24 space-y-4 sm:space-y-6">
            <Digital color="hsl(var(--primary))" size={48} speed={1} animating={true} className="sm:hidden" />
            <Digital color="hsl(var(--primary))" size={64} speed={1} animating={true} className="hidden sm:block" />
            <p className="text-lg sm:text-2xl font-bold text-muted-foreground">Loading students...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
                <div className="ultra-glass p-8 sm:p-12 lg:p-20 text-center rounded-2xl sm:rounded-3xl lg:rounded-[32px] border-2 border-dashed border-border">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="p-6 sm:p-8 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 inline-block">
                      <Search size={48} className="text-muted-foreground sm:hidden" />
                      <Search size={64} className="hidden sm:block text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                      {data.length > 0 ? 'No students found' : 'Ready to start'}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto px-4">
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
