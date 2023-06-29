import React from "react";

const MainPage = () => {
  return (
    <div className="pt-4">
      <h1 className="text-3xl font-semibold">Welcome Back, John!</h1>
      <p className="w-6/12 mt-2 text-muted-foreground text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate,
        itaque. Vero corporis, ipsa suscipit aliquam repudiandae consequatur
        dolorum recusandae nam assum
      </p>
      <div className="flex items-center gap-2 flex-wrap mt-7">
        <div className="w-[260px] bg-muted-foreground/20 p-5 rounded-lg transition-all border hover:border-secondary-foreground/10">
          <h1 className="text-sm mb-2 text-muted-foreground">
            Total Documents
          </h1>
          <h1 className="text-2xl font-medium">100+</h1>
        </div>

        <div className="w-[260px] bg-muted-foreground/20 p-5 rounded-lg transition-all border hover:border-secondary-foreground/10">
          <h1 className="text-sm mb-2 text-muted-foreground">
            Total Documents
          </h1>
          <h1 className="text-2xl font-medium">100+</h1>
        </div>

        <div className="w-[260px] bg-muted-foreground/20 p-5 rounded-lg transition-all border hover:border-secondary-foreground/10">
          <h1 className="text-sm mb-2 text-muted-foreground">
            Total Documents
          </h1>
          <h1 className="text-2xl font-medium">100+</h1>
        </div>
        <div className="w-[260px] bg-muted-foreground/20 p-5 rounded-lg transition-all border hover:border-secondary-foreground/10">
          <h1 className="text-sm mb-2 text-muted-foreground">
            Total Documents
          </h1>
          <h1 className="text-2xl font-medium">100+</h1>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
