import { useSelector } from "react-redux";
import SideBar from "../components/core/dashboard/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <div className="mt-[150px]">Loading....</div>;
  }

  return (
    <div className="flex relative mt-14 text-white">
      <SideBar></SideBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
