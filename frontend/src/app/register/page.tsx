import { RegisterForm } from "@/features/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="max-w-md mx-auto p-10">
      <h1 className="text-2xl font-bold text-center mb-6">Daftar Akun</h1>
      <RegisterForm />
    </main>
  );
}
