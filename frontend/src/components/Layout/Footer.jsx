// This component defines the footer of the application, which includes copyright information.
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} TaskNest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
