import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Video, MessageSquare, FileText, 
  Stethoscope, CreditCard, Brain, Bell, UserCircle,
  ChevronLeft, Settings, LogOut
} from 'lucide-react';
import { format } from 'date-fns';

interface Appointment {
  id: number;
  patientName: string;
  date: Date;
  type: string;
}

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [appointments] = useState<Appointment[]>([
    { id: 1, patientName: "John Smith", date: new Date(2024, 2, 25, 14, 30), type: 'Video Consultation' },
    { id: 2, patientName: "Mary Johnson", date: new Date(2024, 2, 25, 16, 0), type: 'In-Person' }
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const DashboardCard = ({ title, icon, content }: { title: string; icon: React.ReactNode; content: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {content}
    </div>
  );

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="Today's Appointments"
        icon={<Calendar className="text-blue-500" />}
        content={
          <div className="space-y-3">
            {appointments.map(apt => (
              <div key={apt.id} className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium">{apt.patientName}</p>
                <p className="text-sm text-gray-600">
                  {format(apt.date, 'p')} - {apt.type}
                </p>
                <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                  Start Consultation
                </button>
              </div>
            ))}
          </div>
        }
      />

      <DashboardCard
        title="Quick Stats"
        icon={<Clock className="text-green-500" />}
        content={
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Total Patients Today</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Completed Consultations</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending Consultations</span>
              <span className="font-semibold">3</span>
            </div>
          </div>
        }
      />

      <DashboardCard
        title="Earnings Overview"
        icon={<CreditCard className="text-purple-500" />}
        content={
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Today's Earnings</span>
              <span className="font-semibold">$450</span>
            </div>
            <div className="flex justify-between items-center">
              <span>This Week</span>
              <span className="font-semibold">$2,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span>This Month</span>
              <span className="font-semibold">$8,920</span>
            </div>
          </div>
        }
      />
    </div>
  );

  const renderAppointments = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Appointments</h2>
      <div className="space-y-4">
        {appointments.map(apt => (
          <div key={apt.id} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{apt.patientName}</p>
                <p className="text-sm text-gray-600">{format(apt.date, 'PPP')} at {format(apt.date, 'p')}</p>
                <p className="text-sm text-gray-600">{apt.type}</p>
              </div>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Start
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVideoConsult = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Video Consultations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Next Consultation</h3>
          <p>Patient: John Smith</p>
          <p>Time: 2:30 PM</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Join Call
          </button>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Audio/Video Check</h3>
          <button className="w-full px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mb-2">
            Test Microphone
          </button>
          <button className="w-full px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Test Camera
          </button>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Patient Chat</h2>
      <div className="border rounded-xl h-[500px] flex flex-col">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* Chat messages would go here */}
            <p className="text-gray-600 text-center">No messages yet</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalRecords = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Medical Records</h2>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium">John Smith</h3>
          <p className="text-sm text-gray-600">Last Updated: March 15, 2024</p>
          <div className="mt-2 space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View Records
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Prescriptions</h2>
      <div className="space-y-4">
        <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Create New Prescription
        </button>
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium">Recent Prescriptions</h3>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>John Smith - March 15, 2024</span>
              <button className="px-4 py-1 text-blue-600 hover:text-blue-800">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Earnings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Total Earnings</h3>
          <p className="text-3xl font-bold">$8,920</p>
          <p className="text-sm text-gray-600">This Month</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Pending Payments</h3>
          <p className="text-3xl font-bold">$1,250</p>
          <p className="text-sm text-gray-600">To be settled</p>
        </div>
      </div>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">AI Assistant</h2>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium mb-2">Symptom Checker</h3>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Describe patient symptoms..."
          ></textarea>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Analyze Symptoms
          </button>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium mb-2">Drug Interaction Checker</h3>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter medications..."
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Check Interactions
          </button>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ icon, label, id }: { icon: React.ReactNode; label: string; id: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Doctor Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell size={24} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-sm text-gray-600">No new notifications</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <UserCircle size={24} />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Settings size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col gap-2">
              <TabButton icon={<UserCircle size={20} />} label="Overview" id="overview" />
              <TabButton icon={<Calendar size={20} />} label="Appointments" id="appointments" />
              <TabButton icon={<Video size={20} />} label="Video Consult" id="video" />
              <TabButton icon={<MessageSquare size={20} />} label="Patient Chat" id="chat" />
              <TabButton icon={<FileText size={20} />} label="Medical Records" id="records" />
              <TabButton icon={<Stethoscope size={20} />} label="Prescriptions" id="prescriptions" />
              <TabButton icon={<CreditCard size={20} />} label="Earnings" id="earnings" />
              <TabButton icon={<Brain size={20} />} label="AI Assistant" id="ai" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'video' && renderVideoConsult()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'records' && renderMedicalRecords()}
            {activeTab === 'prescriptions' && renderPrescriptions()}
            {activeTab === 'earnings' && renderEarnings()}
            {activeTab === 'ai' && renderAIAssistant()}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter your specialization"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter years of experience"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter consultation fee"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;