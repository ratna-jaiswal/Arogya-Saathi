<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
=======
import React, { useState, useEffect, useRef } from 'react';
>>>>>>> 09a68520b21c74aa68c669eb249764cd7dfbf03e
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, CreditCard, 
  FileText, Building2, Headphones, Star, Bell, 
  Ambulance, UserCircle, ChevronLeft, Settings,
  LogOut
} from 'lucide-react';

const HospitalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

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
        title="Hospital Overview"
        icon={<Building2 className="text-blue-500" />}
        content={
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Active Doctors</span>
              <span className="font-semibold">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Departments</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Staff</span>
              <span className="font-semibold">120</span>
            </div>
          </div>
        }
      />

      <DashboardCard
        title="Today's Statistics"
        icon={<LayoutDashboard className="text-green-500" />}
        content={
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Total Appointments</span>
              <span className="font-semibold">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Emergency Cases</span>
              <span className="font-semibold text-red-500">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Available Beds</span>
              <span className="font-semibold">42</span>
            </div>
          </div>
        }
      />

      <DashboardCard
        title="Revenue Overview"
        icon={<CreditCard className="text-purple-500" />}
        content={
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Today's Revenue</span>
              <span className="font-semibold">$12,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span>This Week</span>
              <span className="font-semibold">$85,670</span>
            </div>
            <div className="flex justify-between items-center">
              <span>This Month</span>
              <span className="font-semibold">$342,890</span>
            </div>
          </div>
        }
      />
    </div>
  );

  const renderDoctorManagement = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Doctor Management</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search doctors..."
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add New Doctor
          </button>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">Dr. John Doe</td>
                <td className="px-6 py-4">Cardiology</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Appointments</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Today
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Week
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Month
          </button>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">Jane Smith</td>
                <td className="px-6 py-4">Dr. John Doe</td>
                <td className="px-6 py-4">10:00 AM</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Billing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Revenue Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Today's Revenue</span>
              <span className="font-semibold">$12,450</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Payments</span>
              <span className="font-semibold">$3,200</span>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Generate Invoice
            </button>
            <button className="w-full px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalRecords = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Medical Records</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search records..."
            className="px-4 py-2 border rounded-lg flex-1"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Upload Record
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-medium">Patient Records</h3>
            <p className="text-sm text-gray-600 mt-2">Last updated: March 15, 2024</p>
            <div className="mt-4 space-x-2">
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

  const renderHospitalStatus = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Hospital Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Bed Availability</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Beds</span>
              <span className="font-semibold">100</span>
            </div>
            <div className="flex justify-between">
              <span>Available</span>
              <span className="font-semibold text-green-600">42</span>
            </div>
            <div className="flex justify-between">
              <span>Occupied</span>
              <span className="font-semibold text-red-600">58</span>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Emergency Room</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Waiting Patients</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between">
              <span>Average Wait Time</span>
              <span className="font-semibold">15 mins</span>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Staff on Duty</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Doctors</span>
              <span className="font-semibold">15</span>
            </div>
            <div className="flex justify-between">
              <span>Nurses</span>
              <span className="font-semibold">30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Support</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-6 rounded-lg">
            <h3 className="font-medium mb-4">Technical Support</h3>
            <p className="text-gray-600 mb-4">Having issues with the system?</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Contact Support
            </button>
          </div>
          <div className="border p-6 rounded-lg">
            <h3 className="font-medium mb-4">Training Resources</h3>
            <p className="text-gray-600 mb-4">Access training materials and guides</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              View Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Feedback</h2>
      <div className="space-y-6">
        <div className="border p-6 rounded-lg">
          <h3 className="font-medium mb-4">Patient Feedback</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Overall Rating</span>
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-current" size={20} />
                <span className="ml-2">4.5/5</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View All Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergency = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Emergency Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Emergency Cases</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Active Cases</span>
              <span className="font-semibold text-red-600">5</span>
            </div>
            <div className="flex justify-between">
              <span>Available Ambulances</span>
              <span className="font-semibold">3</span>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Emergency Alert
          </button>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Dispatch Ambulance
            </button>
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Contact Emergency Team
            </button>
          </div>
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
              <h1 className="text-xl font-semibold text-gray-800">Hospital Dashboard</h1>
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
              <TabButton icon={<Users size={20} />} label="Doctor Management" id="doctors" />
              <TabButton icon={<Calendar size={20} />} label="Appointments" id="appointments" />
              <TabButton icon={<CreditCard size={20} />} label="Billing" id="billing" />
              <TabButton icon={<FileText size={20} />} label="Medical Records" id="records" />
              <TabButton icon={<Building2 size={20} />} label="Hospital Status" id="status" />
              <TabButton icon={<Headphones size={20} />} label="Support" id="support" />
              <TabButton icon={<Star size={20} />} label="Feedback" id="feedback" />
              <TabButton icon={<Ambulance size={20} />} label="Emergency" id="emergency" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'doctors' && renderDoctorManagement()}
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'billing' && renderBilling()}
            {activeTab === 'records' && renderMedicalRecords()}
            {activeTab === 'status' && renderHospitalStatus()}
            {activeTab === 'support' && renderSupport()}
            {activeTab === 'feedback' && renderFeedback()}
            {activeTab === 'emergency' && renderEmergency()}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Hospital Profile Settings</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter hospital name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      rows={3}
                      placeholder="Enter hospital address"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Number</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter emergency number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder="Enter hospital email"
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

export default HospitalDashboard;