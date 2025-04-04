import { useContext, useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
import "../styles/notification.css";

const NotificationBell = () => {
  const { notifications } = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container">
      <button className="notification-bell" onClick={toggleDropdown}>
        🔔
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <p key={n.id}>{n.message}</p>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
