import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import AdministratorIcon from "../../assets/svg/AdministratorIcon";
// import DisburseIcon from "../../assets/svg/DisburseIcon";
// import HistoryIcon from "../../assets/svg/HistoryIcon";
// import ReportIcon from "../../assets/svg/ReportIcon";
// import MenuIcon from "../../assets/svg/MenuIcon";


// import { isAuthorised } from "../../utils";
import "./sidebar.css";
import LogoutIcon from "../../assets/svg/LogoutIcon";
import MenuIcon from "../../assets/svg/MenuIcon";
import StandUpIcon from "../../assets/svg/StandUpIcon";
import HistoryIcon from "../../assets/svg/HistoryIcon";
import TaskIcon from "../../assets/svg/TaskIcon";
import HomeIcon from "../../assets/svg/HomeIcon";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const routeList = [
    { route: "/", title: "Home" },
    { route: "/task", title: "Task" },
    { route: "/staff", title: "Staff" },
    { route: "/history", title: "History" },
    { route: "/stand-up", title: "Stand-up" },
    // ...(isAuthorised("super-admin")
    //   ? [{ route: "/administrator", title: "Administrator" }]
    //   : []),
  ];

  return (
    <section className={`sidebar hidden sm:block`}>
      <div
        className={` sm:w-60 w-max flex flex-col justify-between transition-all ease-in-out  top-0 left-0 bg-[#] text-white p-5 h-screen pt-8 relative duration-300`}
      >
        <div className={`pt-6 ${"" && " mx-auto"}`}>
          <div className="flex items-center justify-between pb-10 gap-4">
            <div className="text-xl whitespace-nowrap text-[#2B8572] font-bold">Perfomance Metric</div>
            <MenuIcon
              onClick={() => setOpen(!open)}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
          </div>
          {routeList.map((item, index) => {
            const activeItem = location.pathname.includes(item?.route);

            const iconArr = [
              <HomeIcon key={1} index={activeItem} />,
              <TaskIcon key={2} index={activeItem} />,
              <StandUpIcon key={4} index={activeItem} />,
              <HistoryIcon key={3} index={activeItem} />,
              <StandUpIcon key={5} index={activeItem} />,
            ];

            return (
              <Link
                to={item.route}
                key={index}
                className={`${activeItem && "bg-[#2B8572] rounded-[4px]"} ${
                  activeItem ? "text-white" : "text-[#716C81]"
                } hover:text-[#ebe5e5] flex items-center rounded-md p-2 cursor-pointer my-4 text-base space-x-3`}
              >
                <div key={index}> {iconArr[index]}</div>

                <span className={` origin-left duration-200`}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        <div
          className="flex items-center justify-start bg-[#E8E9F2] p-2 rounded-[4px] cursor-pointer"
          onClick={logout}
        >
          <div className="flex items-center  gap-5">
            <LogoutIcon />
            <div className={`text-red-600 text-sm`}> Logout</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
