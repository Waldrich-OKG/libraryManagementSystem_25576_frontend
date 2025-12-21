import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
          {/* Admin-specific content */}
        </main>
      </div>
      <Footer />
    </div>
  );
}