"use client";
import PageLoader from "@/components/shared/PageLoader";
import { getSession } from "@/lib/services/auth.service";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const check = async () => {
      try {
        await getSession();
      } catch (err: any) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);
  return (
    <>
      {" "}
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Provider store={store}>{children}</Provider>
        </>
      )}
    </>
  );
};

export default ProtectedLayout;
