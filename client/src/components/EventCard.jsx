import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaBook, FaMicrophone, FaLaptopCode, FaPalette, FaMusic } from 'react-icons/fa';
import './EventCard.css';

const EventCard = ({ event, isRsvped, onRSVPClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { day, month };
  };

  // Generate consistent gradient based on event title
  const getGradientForEvent = (title = '') => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Sunset
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', // Ocean
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Pastel
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // Rose
    ];
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  // Get icon based on event title/type
  const getIconForEvent = (title = '') => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('quiz') || lowerTitle.includes('literary')) return <FaBook />;
    if (lowerTitle.includes('seminar') || lowerTitle.includes('workshop')) return <FaLaptopCode />;
    if (lowerTitle.includes('meetup') || lowerTitle.includes('meet')) return <FaUsers />;
    if (lowerTitle.includes('contest') || lowerTitle.includes('writing')) return <FaPalette />;
    if (lowerTitle.includes('music') || lowerTitle.includes('concert')) return <FaMusic />;
    if (lowerTitle.includes('speech') || lowerTitle.includes('talk')) return <FaMicrophone />;
    return <FaCalendarAlt />;
  };

  const { day, month } = formatDate(event.date);

  return (
    <div className="event-card-modern">
      <div className="event-image-container">
        {event.poster ? (
          <img src={event.poster} alt={event.title} className="event-image" />
        ) : (
          <div 
            className="event-image-placeholder"
            style={{ background: getGradientForEvent(event.title) }}
          >
            {getIconForEvent(event.title)}
          </div>
        )}
        <div className="event-date-badge">
          <span className="date-month">{month}</span>
          <span className="date-day">{day}</span>
        </div>
        {event.isPublic && <span className="public-badge">Open to All</span>}
      </div>

      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>
        
        <p className="event-society-name">
          <span className="society-icon">🏢</span>
          {event.societyId?.name || 'Unknown Society'}
        </p>

        <p className="event-description">{event.description}</p>

        <div className="event-meta">
          <div className="meta-item">
            <FaClock />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div className="meta-item">
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>
        </div>

        <button
          disabled={isRsvped}
          onClick={() => onRSVPClick(event)}
          className={`event-rsvp-btn ${isRsvped ? 'rsvped' : ''}`}
        >
          {isRsvped ? '✓ RSVP Confirmed' : 'RSVP Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;