
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create the QueryClient outside of component to avoid re-creation on render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Reduce unnecessary refetches
    },
  },
});

// This component handles smooth scrolling for anchor links with improved performance
const ScrollToAnchor = () => {
  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
          // Use requestAnimationFrame for smoother scrolling and optimize with will-change
          element.style.willChange = 'scroll-position';
          window.scrollTo({
            top: element.offsetTop - 80, // Add some offset for header
            behavior: 'smooth',
          });
          
          // Reset will-change after animation finishes
          setTimeout(() => {
            element.style.willChange = 'auto';
          }, 1000);
          
          // Update URL without page reload
          window.history.pushState({}, '', href);
        }
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return null;
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simple optimization for initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToAnchor />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
