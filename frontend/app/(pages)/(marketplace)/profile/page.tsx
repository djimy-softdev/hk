import { getUserProfile } from '@/app/lib';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const user = await getUserProfile();

  return (
    <main>
      {/* header */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Profile
      </h1>

      {/* profile */}
      <div className="flex flex-col justify-between	rounded-md bg-gray-50 p-2 md:p-4">
        <div className="flex flex-col">
          <div>
            <span className=" font-bold">Username: </span>
            <span> {user.username}</span>
          </div>

          <div>
            <span className=" font-bold">ROLES: </span>
            {user.roles.map((role) => {
              return <span key={role}>{role}</span>;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
