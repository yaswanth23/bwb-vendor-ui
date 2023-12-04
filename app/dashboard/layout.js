import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardLayout from "../ui/dashboard/dashboardLayout/dashboardLayout";

const Layout = async ({ children }) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default Layout;
