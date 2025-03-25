import React, { useState } from 'react';
import { Calendar, Heart, Activity } from 'lucide-react';
import { format } from 'date-fns';

// Define a reusable DashboardCard component
const DashboardCard = ({ title, icon, content }: { title: string; icon: React.ReactNode; content: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {content}
  </div>
);

const Overview: React.FC = () => {
  // Define appointments inside the component
  const [appointments] = useState([
    { id: 1, doctorName: "Dr. Sarah Smith", date: new Date(2024, 2, 25, 14, 30), type: 'upcoming' },
    { id: 2, doctorName: "Dr. John Doe", date: new Date(2024, 2, 20, 10, 0), type: 'past' }
  ]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Patient Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <DashboardCard
          title="Upcoming Appointments"
          icon={<Calendar className="text-blue-500" />}
          content={
            <div className="space-y-3">
              {appointments.filter(apt => apt.type === 'upcoming').map(apt => (
                <div key={apt.id} className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">{apt.doctorName}</p>
                  <p className="text-sm text-gray-600">
                    {format(apt.date, 'PPP')} at {format(apt.date, 'p')}
                  </p>
                  <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                    Join Consultation
                  </button>
                </div>
              ))}
            </div>
          }
        />

        {/* Health Summary */}
        <DashboardCard
          title="Health Summary"
          icon={<Heart className="text-red-500" />}
          content={
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Blood Pressure</span>
                <span className="font-semibold">120/80 mmHg</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Heart Rate</span>
                <span className="font-semibold">72 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Blood Sugar</span>
                <span className="font-semibold">95 mg/dL</span>
              </div>
            </div>
          }
        />

        {/* Recent Activity */}
        <DashboardCard
          title="Recent Activity"
          icon={<Activity className="text-green-500" />}
          content={
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Lab Test Results</p>
                <p className="text-sm text-gray-600">Received on March 15, 2024</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Prescription Updated</p>
                <p className="text-sm text-gray-600">By Dr. John Doe</p>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Overview;
