"use client";
import PageLoader from "@/components/shared/PageLoader";
import { getSession } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const check = async () => {
      try {
        await getSession();
        router.replace("/app");
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);
  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <main className="w-screen h-screen flex flex-col overflow-hidden items-center justify-center">
          {children}
        </main>
      )}
    </>
  );
};

export default AuthLayout;
