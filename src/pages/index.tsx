import { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Digital } from "react-activity";
import { User, MapPin, Users, BookOpen, Calendar, Download, Search } from "lucide-react";
import "react-activity/dist/Digital.css";
import * as XLSX from "xlsx";

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

const Home = () => {
  // State management
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

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://students-list-backend.onrender.com/all");
      if (!res.ok) throw new Error('Failed to fetch students data');
      const { student } = await res.json();
      
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

  // Handlers
  const getFilteredData = useCallback(() => {
    const searchLower = filters.search.toLowerCase();
    const sectionLower = filters.section.toLowerCase();
    const groupLower = filters.group.toLowerCase();

    return data.filter((student) => (
      (student.name.toLowerCase().includes(searchLower) ||
       student.uid.toLowerCase().includes(searchLower) ||
       student.section.toLowerCase().includes(searchLower)) &&
      student.section.toLowerCase().includes(sectionLower) &&
      student.group.toLowerCase().includes(groupLower)
    ));
  }, [data, filters]);

  const handleSearch = useCallback(() => {
    const filtered = getFilteredData();
    setDisplayedData(filtered);
  }, [getFilteredData]);

  const handleFilterChange = (key: keyof Filters) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleAttendance = useCallback((uid: string) => {
    setAttendance(prev => ({ ...prev, [uid]: !prev[uid] }));
  }, []);

  const handleExport = useCallback(() => {
    const attendanceData = displayedData.map((student) => ({
      UID: student.uid,
      Name: student.name,
      Section: student.section,
      Group: student.group,
      Batch: student.batch,
      Status: attendance[student.uid] ? "Present" : "Absent",
      Timestamp: new Date().toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(attendanceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    
    const maxWidth = attendanceData.reduce((w, r) => Math.max(w, r.Name.length), 10);
    worksheet["!cols"] = [
      { wch: 15 }, { wch: maxWidth }, { wch: 10 }, 
      { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 20 }
    ];

    XLSX.writeFile(workbook, `Attendance_${new Date().toISOString().split('T')[0]}.xlsx`);
  }, [displayedData, attendance]);

  // Stats calculations
  const stats = useMemo(() => ({
    total: displayedData.length,
    present: displayedData.filter(s => attendance[s.uid]).length,
    absent: displayedData.filter(s => !attendance[s.uid]).length,
  }), [displayedData, attendance]);

  return (
    <div className=" dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Attendance Marking Solution
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            Chandigarh University - 3rd Year CSE Program
          </h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </header>

        {/* Search and filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              value={filters.search}
              onChange={handleFilterChange("search")}
              placeholder="Search by name, UID, or section"
              className="w-full bg-gray-50 dark:bg-gray-700"
            />
            <Input
              value={filters.section}
              onChange={handleFilterChange("section")}
              placeholder="Filter by section"
              className="w-full bg-gray-50 dark:bg-gray-700"
            />
            <Input
              value={filters.group}
              onChange={handleFilterChange("group")}
              placeholder="Filter by group"
              className="w-full bg-gray-50 dark:bg-gray-700"
            />
            <Button 
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Search size={18} />
              Search
            </Button>
            <Button 
              onClick={handleExport}
              className="w-full bg-green-600 hover:bg-green-700 gap-2"
              disabled={displayedData.length === 0}
            >
              <Download size={18} />
              Export
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users size={24} className="mx-auto mb-2 text-blue-500" />
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Students</p>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <User size={24} className="mx-auto mb-2 text-green-500" />
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Present</p>
              <p className="text-3xl font-bold text-green-600">{stats.present}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <User size={24} className="mx-auto mb-2 text-red-500" />
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Absent</p>
              <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
            </CardContent>
          </Card>
        </div>

        {/* Error handling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Student cards grid */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Digital color="#28a745" size={32} speed={1} animating={true} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedData.length > 0 ? (
              displayedData.map((student) => (
                <Card 
                  key={student.uid}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-0">
                    {/* Card Header with Gradient */}
                    <div className="relative">
                      <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500" />
                      
                      {/* Profile Section */}
                      <div className="absolute -bottom-12 inset-x-0 flex justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg bg-white dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <User size={40} className="text-gray-500 dark:text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="pt-16 px-6 pb-6">
                      {/* Name */}
                      <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                        {student.name}
                      </h3>

                      {/* Info Grid */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                          <BookOpen size={18} className="text-blue-500" />
                          <span>UID: {student.uid}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                          <Users size={18} className="text-purple-500" />
                          <span>Section: {student.section}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                          <MapPin size={18} className="text-green-500" />
                          <span>Group: {student.group}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                          <Calendar size={18} className="text-orange-500" />
                          <span>Batch: {student.batch}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          attendance[student.uid]
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}>
                          {attendance[student.uid] ? "Present" : "Absent"}
                        </span>
                      </div>

                      {/* Attendance Button */}
                      <Button
                        onClick={() => handleAttendance(student.uid)}
                        className={`w-full transform transition-all duration-300 hover:scale-105 ${
                          attendance[student.uid]
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        Mark {attendance[student.uid] ? "Absent" : "Present"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full">
                <Card className="p-8 text-center bg-white dark:bg-gray-800 border-2 border-dashed">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <User size={48} className="text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      {data.length > 0 ? 'No students found matching the search criteria' : 'Click search to view students'}
                    </h3>
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