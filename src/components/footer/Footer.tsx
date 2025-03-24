import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];
  const socialLinks = [
    {
      name: "Facebook",
      path: "/facebook",
      icon: <FaFacebook size={24} style={{ color: "#4267B2" }} />,
    },
    {
      name: "Twitter",
      path: "/twitter",
      icon: <FaTwitter size={24} style={{ color: "#1DA1F2" }} />,
    },
    {
      name: "Instagram",
      path: "/instagram",
      icon: <FaInstagram size={24} style={{ color: "#d62976" }} />,
    },
    {
      name: "LinkedIn",
      path: "/linkedin",
      icon: <FaLinkedin size={24} style={{ color: "#0077B5" }} />,
    },
  ];
  const contactDetails = [
    { type: "Email", value: "ragepo4149@example.com" },
    { type: "Phone", value: "903-234-4082" },
    { type: "Address", value: "Glad Street" },
  ];
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 absolute bottom-0 w-full">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm container max-w-screen-lg px-8 gap-x-4">
        <div className=" text-center">
          <h5 className="font-bold mb-3">About Us</h5>
          <p className="text-gray-600">
            We are committed to providing the best services and products.
            Contact us to learn more about us.
          </p>
        </div>

        <div className="text-center">
          <h5 className="font-bold mb-3">Useful Links</h5>
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="hover:text-gray-900">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <h5 className="font-bold mb-3">Contact Us</h5>
          <ul className="space-y-2">
            {contactDetails.map((item, index) => (
              <li key={index}>
                {item.type}: {item.value}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-3 text-center">Follow Us</h5>
          <div className="flex space-x-3 rtl:space-x-reverse justify-center">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-gray-600 hover:text-gray-900"
                aria-label={link.name}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6">
        © {new Date().getFullYear()} Your Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
