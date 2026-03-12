'use client';

interface Shipment {
  id: string;
  tracking: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'pending';
  eta: string;
}

export default function RecentShipments() {
  const shipments: Shipment[] = [
    {
      id: '1',
      tracking: 'TRK-2024-001',
      destination: 'New York, NY',
      status: 'in-transit',
      eta: '2 hours',
    },
    {
      id: '2',
      tracking: 'TRK-2024-002',
      destination: 'Los Angeles, CA',
      status: 'delivered',
      eta: 'Delivered',
    },
    {
      id: '3',
      tracking: 'TRK-2024-003',
      destination: 'Chicago, IL',
      status: 'in-transit',
      eta: '4 hours',
    },
    {
      id: '4',
      tracking: 'TRK-2024-004',
      destination: 'Houston, TX',
      status: 'pending',
      eta: '6 hours',
    },
  ];

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Recent Shipments</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex-1">
              <div className="font-semibold text-slate-900 mb-1">
                {shipment.tracking}
              </div>
              <div className="text-sm text-slate-500">{shipment.destination}</div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  shipment.status
                )}`}
              >
                {shipment.status}
              </span>
              <div className="text-sm text-slate-600 min-w-[80px] text-right">
                {shipment.eta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
