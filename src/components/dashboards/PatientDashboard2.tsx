import React, { useState } from 'react';
import Overview from './patient/Overview';
import Appointments from './patient/Appointments';
import VideoConsultations from './patient/VideoConsultations';
import Chat from './patient/Chat';
import MedicalRecords from './patient/MedicalRecords';
import Prescriptions from './patient/Prescriptions';
import Billing from './patient/Billing';
import NearbyHospitals from './patient/NearbyHospitals';
import HealthVitals from './patient/HealthVitals';
import Community from './patient/Community';

const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'appointments': return <Appointments />;
      case 'video-consultations': return <VideoConsultations />;
      case 'chat': return <Chat />;
      case 'medical-records': return <MedicalRecords />;
      case 'prescriptions': return <Prescriptions />;
      case 'billing': return <Billing />;
      case 'nearby-hospitals': return <NearbyHospitals />;
      case 'health-vitals': return <HealthVitals />;
      case 'community': return <Community />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-100 p-4 h-screen">
        <ul className="space-y-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'appointments', label: 'Appointments' },
            { id: 'video-consultations', label: 'Video Consultations' },
            { id: 'chat', label: 'Chat' },
            { id: 'medical-records', label: 'Medical Records' },
            { id: 'prescriptions', label: 'Prescriptions' },
            { id: 'billing', label: 'Billing' },
            { id: 'nearby-hospitals', label: 'Nearby Hospitals' },
            { id: 'health-vitals', label: 'Health Vitals' },
            { id: 'community', label: 'Community' }
          ].map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => setActiveTab(item.id)} 
                className={`w-full text-left p-2 rounded ${activeTab === item.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderTab()}
      </div>
    </div>
  );
};

export default PatientDashboard;
