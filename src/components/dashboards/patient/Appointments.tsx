import { format } from 'date-fns';

const appointments = [
  { id: 1, doctor: "Dr. Sarah Smith", date: new Date(2024, 2, 25, 14, 30), status: "Scheduled" },
  { id: 2, doctor: "Dr. John Doe", date: new Date(2024, 2, 20, 10, 0), status: "Completed" }
];

const Appointments = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
      <ul className="space-y-3">
        {appointments.map(apt => (
          <li key={apt.id} className="border p-3 rounded-lg">
            <p className="font-medium">{apt.doctor}</p>
            <p className="text-sm text-gray-600">{format(apt.date, 'PP')} at {format(apt.date, 'p')}</p>
            <span className={`px-2 py-1 rounded-full text-sm ${apt.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {apt.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Appointments;
