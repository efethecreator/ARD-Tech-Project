import React, { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

// ChartJS bileşenlerini kaydet
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [dataCounts, setDataCounts] = useState({
    applications: 0,
    lawyers: 0,
    cases: 0,
  });
  const [loading, setLoading] = useState(true);
  const [hoveredInfo, setHoveredInfo] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/dashboard/counts");
        setDataCounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Dashboard verileri alınamadı:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Pasta grafiği verileri
  const pieChartData = {
    labels: ["Başvurular", "Avukatlar", "Davalar"],
    datasets: [
      {
        label: "Veri Dağılımı",
        data: [dataCounts.applications, dataCounts.lawyers, dataCounts.cases],
        backgroundColor: ["#A9927D", "#5E503F", "#22333B"], // Görseldeki kahverengi ve mavi tonları
        hoverOffset: 4,
      },
    ],
  };

  const cardData = [
    {
      title: "Başvurular",
      count: `${dataCounts.applications} Başvuru`,
      color: "#A9927D", // Bej tonu
      hoverText: "Sisteme yapılan tüm başvuruları burada görebilirsiniz.",
      link: "/applications",
    },
    {
      title: "Avukatlar",
      count: `${dataCounts.lawyers} Kayıtlı Avukat`,
      color: "#5E503F", // Koyu kahverengi tonu
      hoverText: "Sistemde kayıtlı tüm avukatların bilgileri burada bulunur.",
      link: "/lawyers",
    },
    {
      title: "Davalar",
      count: `${dataCounts.cases} Dava`,
      color: "#22333B", // Koyu mavi tonu
      hoverText: "Devam eden ve tamamlanan davaları burada görüntüleyebilirsiniz.",
      link: "/cases",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#5E503F] text-lg">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F3] text-[#0A0908] p-8 min-h-screen flex flex-col items-center">
      {/* Hoşgeldiniz Mesajı */}
      <div className="mb-8 bg-[#F2F4F3] p-6 rounded-lg shadow-md w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">Hoş Geldiniz!</h1>
        <p className="text-lg text-[#0A0908]">
          Yönetim paneline erişim sağladınız. Aşağıdaki kartlardan bilgi alabilir veya detaylara
          ulaşabilirsiniz.
        </p>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative">
        {cardData.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            onMouseEnter={() => setHoveredInfo(card.hoverText)}
            onMouseLeave={() => setHoveredInfo("")}
            className="py-6 px-4 rounded-lg shadow-md text-[#F2F4F3] text-center hover:shadow-lg transition-all"
            style={{ backgroundColor: card.color }}
          >
            <h2 className="text-xl font-medium">{card.title}</h2>
            <p className="mt-2 text-lg">{card.count}</p>
          </Link>
        ))}
        {/* Bilgi kutusu */}
        {hoveredInfo && (
          <div className="absolute top-[120%] left-1/2 transform -translate-x-1/2 bg-[#F2F4F3] p-4 rounded-md shadow-md text-[#0A0908] text-sm w-[90%] max-w-md z-10">
            {hoveredInfo}
          </div>
        )}
      </div>

      {/* Grafik */}
      <div className="bg-[#F2F4F3] rounded-lg shadow-md p-6 mt-16 w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">Veri Dağılımı</h3>
        <Pie data={pieChartData} />
      </div>

      <footer className="mt-12 text-center text-sm text-[#0A0908]">
        Yönetim Paneli © 2024 - Tüm Hakları Saklıdır.
      </footer>
    </div>
  );
};

export default Dashboard;
