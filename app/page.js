import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return <div>Page Not Found</div>;
};

export default Home;
