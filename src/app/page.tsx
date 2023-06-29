import { Button } from "@/components/ui/button";
import { ToggleTheme } from "@/theme/ToggleTheme";
import Link from "next/link";
import React from "react";

const MainPage = () => {
  return (
    <section className="flex flex-col text-center items-center justify-center h-screen">
      <ToggleTheme />
      <h1 className="text-3xl font-semibold">Welcome to Appwrite Manager!</h1>
      <p className="w-7/12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        quasi suscipit explicabo expedita, odit nulla laborum nam asperiores
        iure hic vero sit est iusto voluptatum obcaecati, eos, blanditiis
        veritatis modi?
      </p>
      <Link href="/login">
        <Button>Let&apos;go </Button>
      </Link>
    </section>
  );
};

export default MainPage;
