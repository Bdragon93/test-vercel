'use client';

import { User } from '@/types';
import { FormEvent, useState, useEffect } from 'react';
import { UsersIcon } from 'lucide-react';
import Link from 'next/link';
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

import { SearchForm } from '@/components/search-form';
import { ModeToggle } from '@/components/mode-toggle';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/requests/user';

const userItem = {
  title: 'Users',
  url: '/users',
  icon: UsersIcon,
  isActive: true,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [users, setUsers] = useState<User[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ['fetchUsersData'],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const findUserByNameOrEmail = (keyword: string): User[] => {
    const lowerSearchTerm = keyword.toLowerCase();
    if (!data) {
      return [];
    }
    // TODO: handle error if fetch fails
    return data.filter(
      (user) => user.name.toLowerCase().includes(lowerSearchTerm) || user.email.toLowerCase().includes(lowerSearchTerm),
    );
  };

  // TODO: debounce

  const onSearchUser = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement; // Cast to HTMLInputElement
    setUsers(findUserByNameOrEmail(target.value));
  };

  // TODO handle loading or fetch from server
  console.log(isLoading);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModeToggle />
        <SearchForm onChange={onSearchUser} />
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
                    {users?.map(({ id, name }) => (
                      <SidebarMenuSubItem key={id}>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/users/${id}/posts`}>
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
