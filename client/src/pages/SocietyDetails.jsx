import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import "./SocietyDetails.css";
import useRSVP from "../hooks/useRSVP";
import EventCard from "../components/EventCard";
import RSVPForm from "./RSVPForm"; // ✅ import RSVP form
import Footer from "../components/Footer"; // ✅ import footer

// Generate consistent color per user ID
const getAvatarColor = (id) => {
  const colors = [
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #ff758c, #ff7eb3)",
    "linear-gradient(135deg, #43cea2, #185a9d)",
    "linear-gradient(135deg, #f7971e, #ffd200)",
    "linear-gradient(135deg, #00c6ff, #0072ff)",
  ];
  const index = id.charCodeAt(0) % colors.length;
  return colors[index];
};

const SocietyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [society, setSociety] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [joinSocietyformData, setjoinSocietyformData] = useState({ name: "", email: "", reason: "" });

  // ✅ Use the RSVP hook (same as ExploreEvents)
  const {
    selectedEvent,
    setSelectedEvent,
    formData,
    setFormData,
    handleRSVPClick,
    handleFormSubmit,
  } = useRSVP();

  useEffect(() => {
    const fetchSociety = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/society/${id}`);
        setSociety(res.data);
      } catch (err) {
        console.error("Error fetching society:", err);
        toast.error("Could not load society details.");
      }
    };
    fetchSociety();
  }, [id]);

  if (!society) return <div className="loading">Loading...</div>;

  const hasJoined = society?.members?.some((m) => m._id === user?._id);

  const handleFormChange = (e) => {
    setjoinSocietyformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/society/${id}/${hasJoined ? "leave" : "join"}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.username,
            email: user.email,
            reason: joinSocietyformData.reason,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) return toast.error(data.message || "Action failed");

      toast.success(hasJoined ? "Left society." : "Join request sent!");

      setSociety((prev) => ({
        ...prev,
        members: hasJoined
          ? prev.members.filter((m) => m._id !== user._id)
          : [...prev.members, { _id: user._id }],
      }));

      setShowApplyForm(false);
      setjoinSocietyformData({ name: "", email: "", reason: "" });
    } catch (err) {
      toast.error("Server error. Try later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="society-page">
        {/* Hero Cover Section */}
        <div className="society-hero">
          <div className="hero-cover">
            {society.coverImage ? (
              <img src={society.coverImage} alt="cover" className="cover-image" />
            ) : (
              <div className="cover-gradient"></div>
            )}
            <div className="hero-overlay"></div>
          </div>

          <div className="hero-content-wrapper">
            <div className="hero-content">
              <div className="society-logo-wrapper">
                <img src={society.logo} alt="logo" className="society-logo" />
              </div>
              
              <div className="society-info">
                <div className="society-meta">
                  <span className="society-type-badge">{society.type}</span>
                  <span className="members-count">
                    <FaUsers /> {society.members?.length || 0} members
                  </span>
                </div>
                <h1 className="society-title">{society.name}</h1>
                <p className="society-tagline">{society.description?.substring(0, 120)}...</p>
                
                <div className="hero-actions">
                  <button
                    className="join-btn primary"
                    onClick={() => {
                      if (!user) {
                        toast.info("Please login to join.");
                        return navigate("/login");
                      }
                      setjoinSocietyformData({
                        name: user.username,
                        email: user.email,
                        reason: "",
                      });
                      setShowApplyForm(true);
                    }}
                  >
                    {society.pendingRequests?.some((r) => r.userId === user?._id)
                      ? "Request Pending"
                      : hasJoined
                        ? "Leave Society"
                        : "Join Society"}
                  </button>

                  {(society.contactEmail || society.phone || society.socialLinks?.instagram || society.socialLinks?.linkedin) && (
                    <div className="social-links-compact">
                      {society.contactEmail && (
                        <a href={`mailto:${society.contactEmail}`} className="social-icon" title="Email">
                          <FaEnvelope />
                        </a>
                      )}
                      {society.phone && (
                        <a href={`tel:${society.phone}`} className="social-icon" title="Phone">
                          <FaPhone />
                        </a>
                      )}
                      {society.socialLinks?.instagram && (
                        <a href={society.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                          <FaInstagram />
                        </a>
                      )}
                      {society.socialLinks?.linkedin && (
                        <a href={society.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="society-main-content">
          {/* About Section */}
          <section className="content-section about-section">
            <h2 className="section-title">About</h2>
            <p className="about-text">{society.description}</p>
          </section>

          {/* Members Section */}
          <section className="content-section members-section">
            <h2 className="section-title">
              <FaUsers /> Our Members
            </h2>
            {society.members?.length ? (
              <div className="members-grid">
                {society.members.map((m) => (
                  <div key={m._id} className="member-card">
                    {m.profilePic ? (
                      <img
                        src={m.profilePic}
                        alt={m.username}
                        className="member-avatar"
                      />
                    ) : (
                      <div
                        className="member-avatar-placeholder"
                        style={{ background: getAvatarColor(m._id) }}
                      >
                        {m.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <p className="member-name">{m.username}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No members yet. Be the first to join!</p>
            )}
          </section>

          {/* Events Section */}
          <section className="content-section events-section">
            <h2 className="section-title">Upcoming Events</h2>
            {society.events?.length ? (
              <div className="events-grid">
                {society.events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    isRsvped={event.participants?.some((p) => p.email === user?.email)}
                    onRSVPClick={handleRSVPClick}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-state">No events scheduled yet. Stay tuned!</p>
            )}
          </section>
        </div>

        {/* RSVP Form Modal */}
        {selectedEvent && (
          <RSVPForm
            event={selectedEvent}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            onCancel={() => setSelectedEvent(null)}
          />
        )}

        <Footer />
      </div>

      {/* Apply Modal */}
      {showApplyForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{hasJoined ? `Leave ${society.name}` : `Apply to ${society.name}`}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={joinSocietyformData.name}
                onChange={handleFormChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={joinSocietyformData.email}
                onChange={handleFormChange}
                placeholder="Your Email"
                required
              />
              <textarea
                name="reason"
                value={joinSocietyformData.reason}
                onChange={handleFormChange}
                placeholder={`Why do you want to ${hasJoined ? "leave" : "join"}?`}
                required={!hasJoined}
              />
              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowApplyForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SocietyDetails;
