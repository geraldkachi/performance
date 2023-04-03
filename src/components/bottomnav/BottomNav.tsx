import { Link, useLocation } from "react-router-dom";
import HistoryIcon from "../../assets/svg/HistoryIcon";
import HomeIcon from "../../assets/svg/HomeIcon";
import StandUpIcon from "../../assets/svg/StandUpIcon";
import TaskIcon from "../../assets/svg/TaskIcon";

// import AdministratorIcon from "../assets/svg/AdministratorIcon";
// import HistoryIcon from "../assets/svg/HistoryIcon";
// import DisburseIcon from "../assets/svg/DisburseIcon";
// import { isAuthorised } from "../utils";
// import ReportIcon from "../assets/svg/ReportIcon";

const BottomNav = () => {
  const location = useLocation();

  const routeList = [
    { route: "/home", title: "Home" },
    { route: "/task", title: "Task" },
    { route: "/staff", title: "Staff" },
    { route: "/history", title: "History" },
    { route: "/stand-up", title: "Stand-up" },
    // ...(isAuthorised("super-admin")
    //   ? [{ route: "/administrator", title: "Administrator" }]
    //   : []),
  ];

  return (
    <section className="bg-[#ffffff] sm:hidden bottomnav px-3 py-2 fixed  bottom-0 w-full shadow-xl flex items-center gap-3 justify-between overflow-x-scroll rounded-tr-3xl rounded-tl-3xl border border-[#aad0d0]">
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
            className={`${activeItem && "text-white rounded-2xl bg-[#2B8572] w-max whitespace-nowrap"
              } flex justify-evenly flex-1 gap-x-4 items-center rounded-full px-3 py-2 cursor-pointer my-3  text-base space-x-1`}
          >
            <div className=""> {iconArr[index]}</div>

            <span className={`origin-left duration-200 whitespace-nowrap`}>{item.title}</span>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomNav;
