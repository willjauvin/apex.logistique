import DashboardLayout from '@/components/DashboardLayout';
import StatsCards from '@/components/StatsCards';
import RecentShipments from '@/components/RecentShipments';
import QuickActions from '@/components/QuickActions';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Monitor your platform activity and metrics</p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentShipments />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
