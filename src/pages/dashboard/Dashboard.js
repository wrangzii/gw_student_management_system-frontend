import { useAuth } from "~/store/auth";

function Dashboard() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
