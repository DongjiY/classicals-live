import { NextPage } from "next";

const LoginEmailSent: NextPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800">
      <section className="w-2/3 mx-auto text-center translate-y-[40vh] dark:text-white">
        <h1 className="font-fancy text-4xl text-emerald-500">Success!</h1>
        <p>
          Login Email Sent. Please double check your inbox and spam folders.
        </p>
        <p>You may now close this tab...</p>
      </section>
    </main>
  );
};

export default LoginEmailSent;
