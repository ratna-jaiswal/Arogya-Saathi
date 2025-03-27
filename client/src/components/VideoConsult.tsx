import { useState, useEffect, useRef } from 'react';
import { connect, Room, LocalVideoTrack, RemoteVideoTrack } from 'twilio-video';

interface VideoConsultProps {
  role: 'patient' | 'doctor'; // Pass role to differentiate identity
}

const VideoConsult: React.FC<VideoConsultProps> = ({ role }) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const joinVideoCall = async () => {
    try {
      const response = await fetch(`http://localhost:5000/token?identity=${role}&room=consultation-room`);
      const { token } = await response.json();
      const videoRoom = await connect(token, { name: 'consultation-room', audio: true, video: { width: 640 } });
      setRoom(videoRoom);
      setIsConnected(true);

      const localTrack = Array.from(videoRoom.localParticipant.videoTracks.values())[0]?.track as LocalVideoTrack | undefined;
      if (localVideoRef.current && localTrack) localTrack.attach(localVideoRef.current);

      videoRoom.participants.forEach(participant => {
        const trackPublication = Array.from(participant.videoTracks.values())[0];
        if (trackPublication?.track && remoteVideoRef.current) {
          (trackPublication.track as RemoteVideoTrack).attach(remoteVideoRef.current);
        }
      });

      videoRoom.on('participantConnected', participant => {
        participant.on('trackSubscribed', (track) => {
          if (remoteVideoRef.current && track.kind === 'video') {
            (track as RemoteVideoTrack).attach(remoteVideoRef.current);
          }
        });
      });

      videoRoom.on('participantDisconnected', () => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      });
    } catch (error) {
      console.error('Error joining video call:', error);
    }
  };

  const leaveVideoCall = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setIsConnected(false);
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      if (room) room.disconnect();
    };
  }, [room]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Video Consultation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Next Consultation</h3>
          <p>{role === 'patient' ? 'Doctor: Dr. Sarah Smith' : 'Patient: John Smith'}</p>
          <p>Time: 2:30 PM</p>
          {!isConnected ? (
            <button onClick={joinVideoCall} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Join Call
            </button>
          ) : (
            <button onClick={leaveVideoCall} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Leave Call
            </button>
          )}
        </div>
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Video Feed</h3>
          <div className="space-y-4">
            <video ref={localVideoRef} autoPlay muted className="w-full h-40 rounded-lg bg-black" />
            <video ref={remoteVideoRef} autoPlay className="w-full h-40 rounded-lg bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsult;