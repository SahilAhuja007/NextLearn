import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
const Footer = () => {
  const subjects = FooterLink2[0];
  const languages = FooterLink2[1];
  const careerbuilding = FooterLink2[2];
  return (
    <footer className="bg-richblack-700 text-richblack-300 py-10 w-screen">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-10 px-4">
        {/* Company Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-white">StudyNotion</h1>
          <div className="flex flex-col gap-2">
            <p>Company</p>
            <p>About</p>
            <p>Careers</p>
            <p>Affiliates</p>
          </div>
          <div className="flex gap-3 mt-2">
            <FaFacebook size={20} />
            <FaGoogle size={20} />
            <FaTwitter size={20} />
            <FaYoutube size={20} />
          </div>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold">Resources</h2>
          <p>Articles</p>
          <p>Blog</p>
          <p>Chart Sheet</p>
          <p>Code challenges</p>
          <p>Docs</p>
          <p>Projects</p>
          <p>Videos</p>
          <p>Workspaces</p>

          <h2 className="text-white font-semibold mt-4">Support</h2>
          <p>Help Center</p>
        </div>

        {/* Plans and Community */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold">Plans</h2>
          <p>Paid memberships</p>
          <p>For students</p>
          <p>Business solutions</p>

          <h2 className="text-white font-semibold mt-4">Community</h2>
          <p>Forums</p>
          <p>Chapters</p>
          <p>Events</p>
        </div>

        {/* Subjects */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold">{subjects.title}</h2>
          {subjects.links.map((subject) => (
            <Link to={subject.link}>{subject.title}</Link>
          ))}
        </div>

        {/* Languages */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold">Languages</h2>
          {languages.links.map((language) => (
            <Link to={language.link}>{language.title}</Link>
          ))}
        </div>

        {/* Career Building */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-semibold">Career building</h2>
          {careerbuilding.links.map((carreer) => (
            <Link to={carreer.link}>{carreer.title}</Link>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-richblack-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm px-4">
        <div className="flex gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Terms</a>
        </div>
        <div className="flex items-center gap-1 mt-4 md:mt-0">
          <p>Made with</p>
          <span className="text-pink-500">❤</span>
          <p>CodeHelp © 2023 Studynotion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
