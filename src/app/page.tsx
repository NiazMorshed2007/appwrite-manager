"use client";

import PageLoader from "@/components/shared/PageLoader";
import { getSession } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainPage = () => {
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      try {
        await getSession();
        router.replace("/app");
      } catch (err: any) {
        router.replace("/login");
      }
    };
    check();
  }, []);
  return <PageLoader />;
};

export default MainPage;
