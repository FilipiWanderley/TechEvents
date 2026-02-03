import { Event } from '../../hooks/useFetchEvents';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{new Date(event.date).toLocaleDateString()}</span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{event.location}</span>
      </div>
    </div>
  );
}
