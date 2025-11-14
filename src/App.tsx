import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes";
import { ModeToggle } from "./components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { Digital } from "react-activity";
import "react-activity/dist/Digital.css";

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background">
    <div className="space-y-4 text-center">
      <Digital color="hsl(var(--primary))" size={48} speed={1} animating={true} />
      <p className="text-muted-foreground text-lg font-medium">Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen">
        {/* Theme toggle button - fixed position */}
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        
        {/* Main content */}
        <Suspense fallback={<LoadingFallback />}>
          <AppRoutes />
        </Suspense>
        
        {/* Toast notifications */}
        <Toaster />
      </div>
    </Router>
  );
};

export default App;