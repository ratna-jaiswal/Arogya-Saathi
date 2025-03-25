import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Video, MessageSquare, FileText, Pill,
  CreditCard, MapPin, Activity, Users, Bell, UserCircle,
  LogOut, ChevronLeft, Settings, Heart, Stethoscope, Clipboard, Guitar as Hospital, AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface Appointment {
  id: number;
  doctorName: string;
  date: Date;
  type: 'upcoming' | 'past';
}

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [appointments] = useState<Appointment[]>([
    { id: 1, doctorName: "Dr. Sarah Smith", date: new Date(2024, 2, 25, 14, 30), type: 'upcoming' },
    { id: 2, doctorName: "Dr. John Doe", date: new Date(2024, 2, 20, 10, 0), type: 'past' }
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
    // Add logout logic here
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
  );

  const renderAppointments = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Appointments</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              All
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Upcoming
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Past
            </button>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Book New Appointment
          </button>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map(apt => (
                <tr key={apt.id}>
                  <td className="px-6 py-4">{apt.doctorName}</td>
                  <td className="px-6 py-4">{format(apt.date, 'PP')}</td>
                  <td className="px-6 py-4">{format(apt.date, 'p')}</td>
                  <td className="px-6 py-4">Video Consultation</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${apt.type === 'upcoming'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {apt.type === 'upcoming' ? 'Scheduled' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {apt.type === 'upcoming' ? (
                      <div className="space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Join</button>
                        <button className="text-red-600 hover:text-red-800">Cancel</button>
                      </div>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-800">View Details</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


  const renderVideoConsult = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Video Consultation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Next Consultation</h3>
          <p>Doctor: Dr. Sarah Smith</p>
          <p>Time: 2:30 PM</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Join Call
          </button>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">System Check</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Test Microphone
            </button>
            <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Test Camera
            </button>
            <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Test Speaker
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  const renderChat = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Chat with Doctors</h2>
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
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Stethoscope className="text-blue-500" size={20} />
                <p className="font-medium">Dr. Sarah Smith</p>
              </div>
              <p className="text-sm text-gray-600">Last message: Please let me know if you have any questions.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Stethoscope className="text-blue-500" size={20} />
                <p className="font-medium">Dr. John Doe</p>
              </div>
              <p className="text-sm text-gray-600">Last message: Your test results look good.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Medical Records</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search records..."
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Upload Record
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clipboard className="text-blue-500" />
              <h3 className="font-medium">Lab Reports</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Last updated: March 15, 2024</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Download
              </button>
            </div>
          </div>
          <div className="border p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="text-green-500" />
              <h3 className="font-medium">Prescriptions</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Last updated: March 10, 2024</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Prescriptions</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search prescriptions..."
            className="px-4 py-2 border rounded-lg w-64"
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Active
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Past
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">Prescription #123</h3>
                <p className="text-sm text-gray-600">Dr. Sarah Smith</p>
                <p className="text-sm text-gray-600">Issued: March 15, 2024</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Active
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Pill className="text-blue-500" size={16} />
                <span>Medication A - 1 tablet twice daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Pill className="text-blue-500" size={16} />
                <span>Medication B - 1 tablet before bed</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Details
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Billing & Payments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Last Payment</span>
              <span className="font-semibold">$150</span>
            </div>
            <div className="flex justify-between">
              <span>Outstanding</span>
              <span className="font-semibold text-red-600">$75</span>
            </div>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Make Payment
          </button>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Consultation</span>
              <span className="font-semibold">$100</span>
            </div>
            <div className="flex justify-between">
              <span>Lab Tests</span>
              <span className="font-semibold">$50</span>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Insurance</h3>
          <p className="text-sm text-gray-600 mb-2">Policy: #INS123456</p>
          <p className="text-sm text-gray-600">Coverage: 80%</p>
          <button className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            View Details
          </button>
        </div>
      </div>
    </div>
  );


  const renderHospitals = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Nearby Hospitals</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search hospitals..."
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            View Map
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Hospital className="text-blue-500" />
              <h3 className="font-medium">City General Hospital</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">2.5 km away</p>
            <p className="text-sm text-gray-600 mb-4">Emergency Services Available</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Get Directions
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const renderVitals = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Health Vitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Blood Pressure</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">120/80</div>
          <p className="text-sm text-gray-600">Last updated: 2 hours ago</p>
          <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            View History
          </button>
        </div>
        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Heart Rate</h3>
          <div className="text-3xl font-bold text-red-600 mb-2">72 bpm</div>
          <p className="text-sm text-gray-600">Last updated: 1 hour ago</p>
          <button className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            View History
          </button>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Blood Sugar</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">95 mg/dL</div>
          <p className="text-sm text-gray-600">Last updated: 3 hours ago</p>
          <button className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            View History
          </button>
        </div>
      </div>
    </div>
  );


  const renderCommunity = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Health Community</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search discussions..."
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Start Discussion
          </button>
        </div>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-blue-500" />
              <h3 className="font-medium">Diabetes Support Group</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Join others in discussing management techniques and sharing experiences.
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Join Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  const renderNotifications = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Notifications</h2>
      <div className="space-y-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              All
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Unread
            </button>
          </div>
          <button className="text-blue-600 hover:text-blue-800">
            Mark all as read
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="text-blue-500" />
              <h3 className="font-medium">Appointment Reminder</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your appointment with Dr. Sarah Smith is tomorrow at 2:30 PM.
            </p>
            <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="text-gray-500" />
              <h3 className="font-medium">Lab Results Available</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your recent lab test results are now available.
            </p>
            <p className="text-xs text-gray-500 mt-2">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ icon, label, id }: { icon: React.ReactNode; label: string; id: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
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
              <h1 className="text-xl font-semibold text-gray-800">Patient Dashboard</h1>
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
              <TabButton icon={<MessageSquare size={20} />} label="Chat" id="chat" />
              <TabButton icon={<FileText size={20} />} label="Records" id="records" />
              <TabButton icon={<Pill size={20} />} label="Prescriptions" id="prescriptions" />
              <TabButton icon={<CreditCard size={20} />} label="Billing" id="billing" />
              <TabButton icon={<MapPin size={20} />} label="Hospitals" id="hospitals" />
              <TabButton icon={<Activity size={20} />} label="Vitals" id="vitals" />
              <TabButton icon={<Users size={20} />} label="Community" id="community" />
              <TabButton icon={<Bell size={20} />} label="Notifications" id="notifications" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'video' && renderVideoConsult()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'records' && renderRecords()}
            {activeTab === 'prescriptions' && renderPrescriptions()}
            {activeTab === 'billing' && renderBilling()}
            {activeTab === 'hospitals' && renderHospitals()}
            {activeTab === 'vitals' && renderVitals()}
            {activeTab === 'community' && renderCommunity()}
            {activeTab === 'notifications' && renderNotifications()}
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
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                    <select
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      rows={3}
                      placeholder="Enter your address"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter emergency contact number"
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

export default PatientDashboard;