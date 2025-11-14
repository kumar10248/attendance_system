import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Digital } from "react-activity";
import { User, MapPin, Users, BookOpen, Calendar, Download, Search, Sparkles } from "lucide-react";
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

// Memoized stat card component
const StatCard = memo(({ icon: Icon, label, value, colorClass }: { 
  icon: React.ElementType; 
  label: string; 
  value: number; 
  colorClass: string;
}) => (
  <Card className="bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-border/50 overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-amber-purple opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    <CardContent className="p-6 text-center relative z-10">
      <div className="mb-3 flex justify-center">
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={28} className={colorClass} />
        </div>
      </div>
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`text-4xl font-bold ${colorClass}`}>{value}</p>
    </CardContent>
  </Card>
));
StatCard.displayName = "StatCard";

// Memoized student card component
const StudentCard = memo(({ 
  student, 
  isPresent, 
  onToggle 
}: { 
  student: Student; 
  isPresent: boolean; 
  onToggle: (uid: string) => void;
}) => (
  <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card border-2 border-border/50 animate-fade-in">
    <CardContent className="p-0 relative">
      <div className="relative overflow-hidden">
        <div className="h-28 bg-gradient-amber-purple relative">
          <div className="absolute inset-0 shimmer opacity-30" />
        </div>
        
        <div className="absolute -bottom-14 inset-x-0 flex justify-center">
          <div className="w-28 h-28 rounded-full border-4 border-card shadow-2xl bg-gradient-to-br from-amber-500 to-purple-500 p-1 group-hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <User size={40} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 px-6 pb-6">
        <h3 className="text-xl font-bold text-center text-foreground mb-4 line-clamp-2 min-h-[3.5rem]">
          {student.name}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <BookOpen size={16} className="text-amber-600 dark:text-amber-500" />
            </div>
            <span className="text-sm font-medium">{student.uid}</span>
          </div>
          <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Users size={16} className="text-purple-600 dark:text-purple-500" />
            </div>
            <span className="text-sm font-medium">Section {student.section}</span>
          </div>
          <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 rounded-lg bg-silver-500/10">
              <MapPin size={16} className="text-silver-600 dark:text-silver-500" />
            </div>
            <span className="text-sm font-medium">Group {student.group}</span>
          </div>
          <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Calendar size={16} className="text-amber-600 dark:text-amber-500" />
            </div>
            <span className="text-sm font-medium">Batch {student.batch}</span>
          </div>
        </div>

        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
            isPresent
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}>
            {isPresent ? "✓ Present" : "✗ Absent"}
          </span>
        </div>

        <Button
          onClick={() => onToggle(student.uid)}
          className={`w-full transform transition-all duration-300 hover:scale-105 font-semibold shadow-lg ${
            isPresent
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
          }`}
        >
          Mark {isPresent ? "Absent" : "Present"}
        </Button>
      </div>
    </CardContent>
  </Card>
));
StudentCard.displayName = "StudentCard";

const Home = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    section: "",
    group: "",
  });
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
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
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

    if (!searchLower && !sectionLower && !groupLower) {
      return data;
    }

    return data.filter((student) => {
      const matchesSearch = !searchLower || 
        student.name.toLowerCase().includes(searchLower) ||
        student.uid.toLowerCase().includes(searchLower) ||
        student.section.toLowerCase().includes(searchLower);
      
      const matchesSection = !sectionLower || 
        student.section.toLowerCase().includes(sectionLower);
      
      const matchesGroup = !groupLower || 
        student.group.toLowerCase().includes(groupLower);
      
      return matchesSearch && matchesSection && matchesGroup;
    });
  }, [data, filters]);

  const handleSearch = useCallback(() => {
    const filtered = getFilteredData();
    setDisplayedData(filtered);
  }, [getFilteredData]);

  const handleFilterChange = useCallback((key: keyof Filters) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      worksheet["!cols"] = [
        { wch: 15 }, { wch: maxWidth }, { wch: 10 }, 
        { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 20 }
      ];

      XLSXModule.writeFile(workbook, `Attendance_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      setError("Failed to export data. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-background via-amber-50/20 to-purple-50/20 dark:from-background dark:via-amber-950/10 dark:to-purple-950/10">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <header className="text-center glass-effect rounded-2xl shadow-xl p-8 animate-fade-in border-2 border-border/50">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="text-amber-500 mr-2" size={32} />
            <h1 className="text-5xl font-extrabold bg-gradient-amber-purple bg-clip-text text-transparent">
              Attendance Portal
            </h1>
            <Sparkles className="text-purple-500 ml-2" size={32} />
          </div>
          <h2 className="text-xl text-muted-foreground font-medium">
            Chandigarh University - CSE Department
          </h2>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center gap-2">
              <Calendar size={16} />
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
          {stats.total > 0 && (
            <div className="mt-4 inline-block px-6 py-2 rounded-full bg-gradient-amber-purple text-white font-bold text-lg shadow-lg">
              Attendance Rate: {stats.percentage}%
            </div>
          )}
        </header>

        <div className="glass-effect rounded-2xl shadow-xl p-6 animate-fade-in border-2 border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              value={filters.search}
              onChange={handleFilterChange("search")}
              placeholder="🔍 Search by name, UID, or section"
              className="w-full bg-background/50 border-2 border-silver-500/30 focus:border-primary transition-all"
            />
            <Input
              value={filters.section}
              onChange={handleFilterChange("section")}
              placeholder="📚 Filter by section"
              className="w-full bg-background/50 border-2 border-silver-500/30 focus:border-accent transition-all"
            />
            <Input
              value={filters.group}
              onChange={handleFilterChange("group")}
              placeholder="👥 Filter by group"
              className="w-full bg-background/50 border-2 border-silver-500/30 focus:border-accent transition-all"
            />
            <Button 
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
            >
              <Search size={18} />
              Search
            </Button>
            <Button 
              onClick={handleExport}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
              disabled={displayedData.length === 0 || isExporting}
            >
              <Download size={18} />
              {isExporting ? "Exporting..." : "Export"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <StatCard icon={Users} label="Total Students" value={stats.total} colorClass="text-amber-600 dark:text-amber-500" />
          <StatCard icon={User} label="Present" value={stats.present} colorClass="text-green-600 dark:text-green-500" />
          <StatCard icon={User} label="Absent" value={stats.absent} colorClass="text-red-600 dark:text-red-500" />
        </div>

        {error && (
          <div className="bg-destructive/10 border-2 border-destructive text-destructive-foreground px-6 py-4 rounded-lg animate-fade-in font-medium">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Digital color="hsl(var(--primary))" size={48} speed={1} animating={true} />
            <p className="text-muted-foreground text-lg font-medium">Loading students data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedData.length > 0 ? (
              displayedData.map((student) => (
                <StudentCard
                  key={student.uid}
                  student={student}
                  isPresent={attendance[student.uid]}
                  onToggle={handleAttendance}
                />
              ))
            ) : (
              <div className="col-span-full">
                <Card className="p-12 text-center glass-effect border-2 border-dashed border-border">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-6 rounded-full bg-muted">
                      <Search size={48} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {data.length > 0 ? 'No students found' : 'Ready to start'}
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      {data.length > 0 
                        ? 'Try adjusting your search filters to find students' 
                        : 'Click the search button to load and view all students'}
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
