import { getUser } from '@/requests/user';
export default async function UserProfile({ params }: { params: { user_id: string } }) {
  const user = await getUser(params.user_id);

  if (!user) {
    return null;
  }

  // TODO: use UserItem component
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Username:</span>
          <span className="col-span-3">{user.name}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Username:</span>
          <span className="col-span-3">{user.username}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Email:</span>
          <span className="col-span-3">{user.email}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Phone:</span>
          <span className="col-span-3">{user.phone}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Website:</span>
          <span className="col-span-3">{user.website}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Company:</span>
          <span className="col-span-3">{user.company.name}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="font-medium">Address:</span>
          <span className="col-span-3">
            {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
          </span>
        </div>
      </div>
    </main>
  );
}
