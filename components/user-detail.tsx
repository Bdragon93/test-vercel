import { User } from '@/types'

export function UserDetail({ user }: { user: User }) {
  const { name, username, email, phone, website, company, address } = user
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Name:</span>
          <span className="col-span-3">{name}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Username:</span>
          <span className="col-span-3">{username}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Email:</span>
          <span className="col-span-3">{email}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Phone:</span>
          <span className="col-span-3">{phone}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Website:</span>
          <span className="col-span-3">{website}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Company:</span>
          <span className="col-span-3">{company.name}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Address:</span>
          <span className="col-span-3">
            {address.street}, {address.suite}, {address.city}, {address.zipcode}
          </span>
        </div>
      </div>
    </main>
  )
}
