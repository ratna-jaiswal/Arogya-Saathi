<<<<<<< HEAD
import { useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 09a68520b21c74aa68c669eb249764cd7dfbf03e
import { useNavigate } from 'react-router-dom';
import { UserRound, Stethoscope, Building2, ArrowLeft } from 'lucide-react';

type Role = 'patient' | 'doctor' | 'hospital' | null;
type AuthMode = 'login' | 'signup';

<<<<<<< HEAD
// type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
// type Gender = 'male' | 'female' | 'other';
=======
type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type Gender = 'male' | 'female' | 'other';
>>>>>>> 09a68520b21c74aa68c669eb249764cd7dfbf03e

function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      // In a real app, you would handle authentication here
      navigate(`/dashboard/${selectedRole}`);
    }
  };

  const RoleButton = ({ role, icon, label, color }: { role: Role; icon: React.ReactNode; label: string; color: string }) => (
    <button
      onClick={() => setSelectedRole(role)}
      className={`${color} text-white py-4 px-8 rounded-xl text-lg md:text-xl flex items-center justify-center gap-3 w-full md:w-64 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const PatientSignupForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">ABHA ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your ABHA ID"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="tel"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your contact number"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Blood Group</label>
        <select
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
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
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
          placeholder="Enter your address"
          required
        ></textarea>
      </div>
    </>
  );

  const DoctorSignupForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">NMR ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your NMR ID"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="tel"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your contact number"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Specialization</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your specialization"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter years of experience"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Current Hospital</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter current hospital name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hospital ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your hospital ID"
          required
        />
      </div>
    </>
  );

  const HospitalSignupForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">NIN ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your NIN ID"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter hospital name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter hospital email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter password"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="tel"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter contact number"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
          placeholder="Enter hospital address"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Latitude</label>
        <input
          type="number"
          step="any"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter latitude"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Longitude</label>
        <input
          type="number"
          step="any"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter longitude"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Year of Establishment</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter year of establishment"
          min="1800"
          max={new Date().getFullYear()}
          required
        />
      </div>
    </>
  );

  const LoginForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
    </>
  );

  const AuthForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {authMode === 'signup' && selectedRole === 'patient' && <PatientSignupForm />}
      {authMode === 'signup' && selectedRole === 'doctor' && <DoctorSignupForm />}
      {authMode === 'signup' && selectedRole === 'hospital' && <HospitalSignupForm />}
      {authMode === 'login' && <LoginForm />}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
      >
        {authMode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <div className="text-center">
        <button
          type="button"
          onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {authMode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        {!selectedRole ? (
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Welcome to MediConnect
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Choose your role to proceed
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <RoleButton
                role="patient"
                icon={<UserRound size={24} />}
                label="Patient"
                color="bg-emerald-500 hover:bg-emerald-600"
              />
              <RoleButton
                role="doctor"
                icon={<Stethoscope size={24} />}
                label="Doctor"
                color="bg-blue-500 hover:bg-blue-600"
              />
              <RoleButton
                role="hospital"
                icon={<Building2 size={24} />}
                label="Hospital"
                color="bg-orange-500 hover:bg-orange-600"
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md relative">
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-0 left-0 -mt-16 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to role selection</span>
            </button>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} {authMode === 'login' ? 'Login' : 'Sign Up'}
              </h2>
              <AuthForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;