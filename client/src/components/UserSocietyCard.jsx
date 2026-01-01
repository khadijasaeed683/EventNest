import { useNavigate } from 'react-router-dom';
import './UserSocietyCard.css';

const SocietyCard = ({ society, user }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/society/${id}`);
  };

  const handleRequestActivation = (societyId) => {
    // Example: Send activation request to backend
    console.log(`Requesting activation for society: ${societyId}`);
    // You can implement the actual API call here if needed
    alert('Activation request sent!');
  };


  return (
    <div className="user-society-card">
      {society.deactivated && (
        <span className="badge deactivated-badge">Deactivated</span>
      )}
      
      <div className="top-section">
        <h1 className="society-name">{society.name}</h1>
      </div>

      <div className="bottom-section">
        <div className="row">
          <div className="item">
            <span className="big-text">{society.members?.length || 0}</span>
            <span className="regular-text">Members</span>
          </div>
          <div className="item">
            <span className="big-text">{society.events?.length || 0}</span>
            <span className="regular-text">Events</span>
          </div>
          <div className="item">
            <span className="big-text">{society.createdBy === user._id ? '👑' : '👤'}</span>
            <span className="regular-text">
              {society.createdBy === user._id ? 'Admin' : 'Member'}
            </span>
          </div>
        </div>
        
        {society.deactivated && (
          <button className="activation-btn" onClick={() => handleRequestActivation(society._id)}>
            Request Activation
          </button>
        )}
        
        <button className="details-btn" onClick={() => handleViewDetails(society._id)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default SocietyCard;
