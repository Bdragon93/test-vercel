import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { AppSidebar } from '@/components/app-sidebar'
import { UserProvider } from '@/context/user-context'
import { User } from '@/types/user'

interface ContextLayoutProps {
  initialUsers: User[];
  children: React.ReactNode;
}

const ContextLayout = async ({ initialUsers, children }: ContextLayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <UserProvider initialUsers={initialUsers}>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default ContextLayout
