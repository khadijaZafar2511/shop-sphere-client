


import { TrendingUp } from "lucide-react";
const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-8  space-y-1 flex flex-col rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between">
      <div className="bg-blue-50 px-2 py-1 flex items-center border rounded-md border-none text-blue-600">
        <Icon size={20} />
      </div>
      <span className="bg-green-50 flex items-center text-green-600 mr-1 text-xs font-medium  border rounded-md border-none gap-1 p-1">
        <TrendingUp size={12} />
        {trend}%
      </span>
    </div>
    <h1 className="text-gray-500  text-sm font-medium mt-6">{title}</h1>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);


import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
];

// const SalesChart = () => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
//     <h3 className="font-semibold text-gray-800 mb-6">Revenue Overview</h3>
//     <ResponsiveContainer width="100%" height="100%">
//       <AreaChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Area
//           type="monotone"
//           dataKey="revenue"
//           stroke="#3b82f6"
//           fill="#dbeafe"
//         />
//       </AreaChart>
//     </ResponsiveContainer>
//   </div>
// );
const SalesChart = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
    <h3 className="font-semibold text-gray-800 mb-6">Revenue Overview</h3>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
         <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          fill="#dbeafe"
        /> 
      </AreaChart>
    </ResponsiveContainer>
  </div>
);



import { ShoppingBag, Package, DollarSign, Users } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Store Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back, Admin.</p>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend="12.5"
        />
        <StatCard
          title="Total Orders"
          value="+2,350"
          icon={ShoppingBag}
          trend="8.2"
        />
        <StatCard
          title="Products Sold"
          value="12,234"
          icon={Package}
          trend="5.4"
        />
        <StatCard title="Total Products" value="452" icon={Users} trend="2.1" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Sales</h3>
          {/* Add a simple list or table here */}
        </div>
      </div>
    </div>
  );
}
