// This component defines the footer of the application, which includes copyright information.
import "../../styles/footer.css";

const currentYear = new Date().getFullYear();
const copyrightText = `© ${currentYear} TaskNest. All rights reserved.`;

const Footer = () => {
  return (
    <footer className="footer">
      <p>{copyrightText}</p>
    </footer>
  );
};

export default Footer;
