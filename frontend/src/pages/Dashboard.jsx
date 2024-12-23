import React, { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { FaFileAlt, FaUsers, FaBriefcase } from "react-icons/fa"; // Icons

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [dataCounts, setDataCounts] = useState({
        applications: 0,
        lawyers: 0,
        cases: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get("/dashboard/counts");
                setDataCounts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Dashboard data could not be retrieved:", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const pieChartData = {
        labels: ["Başvurular", "Kullanıcılar", "Davalar"],
        datasets: [
            {
                label: "Veri Dağılımı",
                data: [dataCounts.applications, dataCounts.users, dataCounts.cases],
                backgroundColor: ["#2980b9", "#27ae60", "#f39c12"], // Livelier colors for better visibility
                hoverOffset: 4,
            },
        ],
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
                Yükleniyor...
            </div>
        );
    }

    return (
        <div className="bg-[#F2F4F3] min-h-screen p-8 flex flex-col">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[#22333B] mb-2">Yönetim Paneli</h1>
                <p className="text-[#22333B]">Genel Bakış ve Özetler</p>
            </header>

            <main className="flex-grow space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <Link to="/applications" className="bg-[#F2F4F3] hover:bg-[#A9927D] p-6 rounded-lg shadow-md transition duration-300 flex flex-col items-center justify-center border border-[#A9927D]">
                        <FaFileAlt className="text-3xl text-[#2980b9] mb-2" />
                        <h2 className="text-xl font-medium text-[#22333B]">Başvurular</h2>
                        <p className="text-3xl font-semibold text-[#22333B]">{dataCounts.applications}</p>
                    </Link>

                    <Link to="/users" className="bg-[#F2F4F3] hover:bg-[#A9927D] p-6 rounded-lg shadow-md transition duration-300 flex flex-col items-center justify-center border border-[#A9927D]">
                        <FaUsers className="text-3xl text-[#27ae60] mb-2" />
                        <h2 className="text-xl font-medium text-[#22333B]">Kullanıcılar</h2>
                        <p className="text-3xl font-semibold text-[#22333B]">{dataCounts.users}</p>
                    </Link>

                    <Link to="/cases" className="bg-[#F2F4F3] hover:bg-[#A9927D] p-6 rounded-lg shadow-md transition duration-300 flex flex-col items-center justify-center border border-[#A9927D]">
                        <FaBriefcase className="text-3xl text-[#f39c12] mb-2" />
                        <h2 className="text-xl font-medium text-[#22333B]">Davalar</h2>
                        <p className="text-3xl font-semibold text-[#22333B]">{dataCounts.cases}</p>
                    </Link>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-[#22333B] mb-4">Veri Dağılımı</h3>
                    <div className="h-64 relative">
                        <Pie data={pieChartData} />
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-[#22333B] mb-4">Sistem Durumu</h3>
                    <ul className="text-[#22333B] space-y-2">
                        <li><span className="font-medium">Başvurular:</span> {dataCounts.applications}</li>
                        <li><span className="font-medium">Kullanıcılar:</span> {dataCounts.users}</li>
                        <li><span className="font-medium">Davalar:</span> {dataCounts.cases}</li>
                    </ul>
                </div>
            </main>

            <footer className="mt-8 py-4 text-center text-sm text-[#22333B] border-t border-[#A9927D]">
                Yönetim Paneli © 2024 - Tüm Hakları Saklıdır.
            </footer>
        </div>
    );
};

export default Dashboard;
