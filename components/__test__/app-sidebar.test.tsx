import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppSidebar } from '@/components/app-sidebar'
import { UserContext } from '@/context/user-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { User } from '@/types/user'

// Mock the external components and hooks
jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}))

jest.mock('@/components/ui/sidebar', () => ({
  ...jest.requireActual('@/components/ui/sidebar'),
  useSidebar: () => ({ state: 'expanded', setOpenMobile: jest.fn() }),
}))

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
]

const renderAppSidebar = () => {
  return render(
    <UserContext.Provider value={{ users: mockUsers }}>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </UserContext.Provider>,
  )
}

describe('AppSidebar', () => {
  it('renders the sidebar with theme toggle and search input', () => {
    renderAppSidebar()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
  })

  it('displays all users initially', () => {
    renderAppSidebar()
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
  })

  it('filters users based on debounced search input', async () => {
    renderAppSidebar()
    const searchInput = screen.getByPlaceholderText('Search users...')

    await userEvent.type(searchInput, 'Leanne')

    await waitFor(
      () => {
        expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
        expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument()
      },
      { timeout: 300 }, // debounced time
    )
  })

  it('expands and collapses the Users menu', () => {
    renderAppSidebar()
    const usersButton = screen.getByText('Users')
    const userElement = screen.getByText('Leanne Graham')
    expect(userElement).toBeVisible()
    fireEvent.click(usersButton)
    expect(userElement).not.toBeInTheDocument()
  })
})
