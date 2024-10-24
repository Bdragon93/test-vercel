// import { Button } from '@/components/ui/button';

export default function Home() {
  // const [users, setUsers] = useState<User[]>([]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-1 p-6 overflow-auto">
        {/* selectedUser ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedUser.name}'s Posts</h2>
              <Button onClick={() => {}}>View Profile</Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Select a user to view their posts</p>
          </div>
          )*/}
      </main>
    </div>
  );
}
