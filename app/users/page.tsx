import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { User } from '@/types'

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export default async function UserList() {
  const users: User[] = await getUsers()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/users/${user.id}`} className="text-blue-500 hover:underline">
                  {user.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{user.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
