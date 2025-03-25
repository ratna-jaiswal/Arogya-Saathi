import { useParams } from 'react-router-dom';
import PatientDashboard from './dashboards/PatientDashboard';
import DoctorDashboard from './dashboards/DoctorDashboard';
import HospitalDashboard from './dashboards/HospitalDashboard';

function DashboardPage() {
  const { role } = useParams<{ role: string }>();

  const renderDashboard = () => {
    switch (role) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'hospital':
        return <HospitalDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return renderDashboard();
}

export default DashboardPage;