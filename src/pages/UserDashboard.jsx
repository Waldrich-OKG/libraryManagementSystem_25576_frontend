import { useAxios } from "../utils/axiosInstance";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


export default function UserDashboard() {
  const axios = useAxios();

  const fetchData = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold">Welcome to User Dashboard</h2>
          {/* User-specific content */}
        </main>
      </div>
      <Footer />
    </div>
  );
}