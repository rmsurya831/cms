"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const storedUsers = localStorage.getItem("cmsUsers");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (matchedUser) {
      localStorage.setItem(
        "cmsLoggedInUser",
        JSON.stringify({
          name: matchedUser.name,
          email: matchedUser.email,
        })
      );

      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please sign up if you don't have an account.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            CustomerHub
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Login to your Customer Management account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            onClick={() => router.push("/dashboard")}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </main>
  );
}