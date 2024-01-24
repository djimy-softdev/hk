import LoginForm from '@/app/ui/auth/login-form';

export default async function Page() {
  return (
    <main>
      {/* profile */}
      <div className="m-auto  mt-10 flex max-w-lg	flex-col rounded-md bg-gray-50 p-2 md:p-4">
        {/* header */}
        <div className="flex justify-center">
          <h1 className=" text-lg font-bold">Login</h1>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
