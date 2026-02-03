import React from 'react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const date = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-indigo-600 flex items-center justify-center">
        {/* Placeholder for banner if not available */}
        {event.bannerUrl ? (
          <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-4xl font-bold opacity-50">TE</span>
        )}
      </div>
      <div className="p-6">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{event.location}</div>
        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{event.title}</h2>
        <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
        <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-600 text-sm">{date}</span>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors">
              Inscrever-se
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
