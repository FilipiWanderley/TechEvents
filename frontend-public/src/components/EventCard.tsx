import React from 'react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const dateObj = new Date(event.date);
  
  // Format day (e.g., "04")
  const day = dateObj.getDate().toString().padStart(2, '0');
  
  // Format month (e.g., "FEV")
  const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' })
    .toUpperCase()
    .replace('.', '');

  // Default image if bannerUrl is missing
  const imageUrl = event.bannerUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center shadow-sm min-w-[60px]">
          <span className="text-2xl font-bold text-gray-900 leading-none">{day}</span>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{month}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Location Tag */}
        <div className="flex items-center text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
          {event.description}
        </p>

        {/* Button */}
        <button className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md">
          Inscrever-se
        </button>
      </div>
    </div>
  );
};

export default EventCard;
