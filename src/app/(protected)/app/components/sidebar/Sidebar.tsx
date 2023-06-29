import Logo from "@/components/shared/Logo";
import SidebarNavs from "./SidebarNavs";
import { config } from "@/config/config";

const Sidebar = () => {
  return (
    <aside className="h-full w-[240px] bg-bg/20 border-r py-4 flex flex-col justify-between">
      <div className="top px-4 flex flex-col items-start">
        <div className="flex items-center gap-2">
          <Logo className="w-[44px] h-[44px]" />
          <h2 className="text-sm font-semibold text-secondary-foreground">
            {config.project_name}
          </h2>
        </div>
        <SidebarNavs />
      </div>
    </aside>
  );
};

export default Sidebar;
