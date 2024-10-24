'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { AppSidebar } from '@/components/app-sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ContextLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const ContextLayout = ({ children }: ContextLayoutProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default ContextLayout;
