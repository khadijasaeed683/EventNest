import "./SocietyCard.css";
import { FaUsers, FaArrowRight, FaTheaterMasks, FaLaptopCode, FaMusic, FaPalette, FaFootballBall, FaBook, FaMicroscope, FaHandsHelping } from "react-icons/fa";

const SocietyCard = ({ logo, name, membersCount, category = "Other", onClick, description }) => {
  
  // Generate consistent gradient based on category
  const getGradientForCategory = (cat) => {
    const gradients = {
      'Technology': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Arts': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Music': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Sports': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'Literary': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'Science': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'Drama': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'Community': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'Other': 'linear-gradient(135deg, #3e1a47 0%, #5d2a6a 100%)',
    };
    return gradients[cat] || gradients['Other'];
  };

  // Get icon based on category
  const getIconForCategory = (cat) => {
    const icons = {
      'Technology': <FaLaptopCode />,
      'Arts': <FaPalette />,
      'Music': <FaMusic />,
      'Sports': <FaFootballBall />,
      'Literary': <FaBook />,
      'Science': <FaMicroscope />,
      'Drama': <FaTheaterMasks />,
      'Community': <FaHandsHelping />,
      'Other': <FaUsers />,
    };
    return icons[cat] || icons['Other'];
  };

  return (
    <div className="society-card-modern" onClick={onClick}>
      <div className="society-card-header">
        <div className="society-logo-wrapper">
          {logo && logo !== "/assets/default-logo.png" ? (
            <img
              src={logo}
              alt={name}
              className="society-logo-img"
            />
          ) : (
            <div 
              className="society-logo-placeholder"
              style={{ background: getGradientForCategory(category) }}
            >
              {getIconForCategory(category)}
            </div>
          )}
        </div>
        <span className="society-category-badge">{category}</span>
      </div>

      <div className="society-card-body">
        <h3 className="society-card-name">{name}</h3>
        
        {description && (
          <p className="society-card-description">
            {description.substring(0, 90)}...
          </p>
        )}

        <div className="society-card-footer">
          <div className="society-members-info">
            <FaUsers />
            <span>{membersCount || 0} members</span>
          </div>
          <div className="society-view-more">
            View Details <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyCard;
