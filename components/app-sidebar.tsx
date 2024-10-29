'use client';

import { useState, useMemo } from 'react';
import { UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { useSidebar } from '@/components/ui/sidebar';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

import { ThemeToggle } from '@/components/theme-toggle';
import { useUserContext } from '@/context/UserContext';

const userItem = {
  title: 'Users',
  url: '/users',
  icon: UsersIcon,
  isActive: true,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, setOpenMobile } = useSidebar();

  const { users } = useUserContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const filteredUsers = useMemo(() => {
    const lowerSearchTerm = searchQuery.toLowerCase();
    return users.filter(
      (user) => user.name.toLowerCase().includes(lowerSearchTerm) || user.email.toLowerCase().includes(lowerSearchTerm),
    );
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ThemeToggle />
        {state === 'expanded' && (
          <Input placeholder="Search users..." value={searchQuery} onChange={handleSearchChange} className="mb-2" />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible asChild defaultOpen={userItem.isActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={userItem.title}>
                    {userItem.icon && <userItem.icon />}
                    <span>{userItem.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {filteredUsers.map(({ id, name }) => (
                      <SidebarMenuSubItem key={id}>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/users/${id}/posts`} onClick={() => setOpenMobile(false)}>
                            <span>{name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
