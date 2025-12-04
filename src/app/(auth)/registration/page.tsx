import RegistrationForm from "@/components/auth/RegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-sky-50 p-6">
      <div className="max-w-md w-full bg-white/95 p-8 rounded-2xl shadow-xl">
        <RegistrationForm />
      </div>
    </div>
  );
}
