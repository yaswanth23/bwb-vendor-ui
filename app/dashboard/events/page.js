import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Event from "./event";

const EventPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return <Event />;
};

export default EventPage;
