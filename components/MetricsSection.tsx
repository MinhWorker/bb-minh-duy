"use client";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";

type Metric = {
  id: number;
  name: string;
  value: number;
};

const MetricsSection = () => {
  const [familiesCount, setFamiliesCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/metrics");
        const data: Metric[] = await res.json();
        const families = data.find((m) => m.name === "families_supported");
        if (families) {
          setFamiliesCount(families.value);
        }
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };
    fetchMetrics();
  }, []);

  if (familiesCount === null) return null;

  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 my-12 rounded-r-2xl shadow-sm max-w-4xl mx-auto">
      <div className="flex items-center gap-6">
        <div className="bg-emerald-100 p-4 rounded-full">
          <Users className="text-emerald-600 w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-1">Sức mạnh Cộng đồng</h3>
          <p className="text-emerald-700 text-lg">
            Hơn <span className="font-extrabold text-3xl mx-1 text-emerald-600">{familiesCount} hộ gia đình</span> tại Cà Mau đang cùng chúng tôi gìn giữ nghề truyền thống.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;
