import Container from "../../components/container/Container";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Contact() {
  const contactItems = [
    { icon: <FaLocationCrosshairs />, label: "Address", value: "Glad Street" },
    { icon: <FaPhoneAlt />, label: "Phone", value: "903-234-4082" },
    { icon: <MdEmail />, label: "Email", value: "ragepo4149@gmail.com" },
  ];

  return (
    <div className="mt-5 sm:mb-0 mb-3">
      <Container>
        <section className="text-center">
          <h1 className="text-4xl font-bold 0 my-10">Contact Us</h1>
          <p className="px-8 dark:text-white text-black mb-10">
            We would love to hear from you! Please fill out the form below or
            reach out to us through the contact information provided.
          </p>
        </section>

        <div className="grid grid-cols-12 gap-6">
          <aside className="lg:col-span-7 col-span-12 flex flex-col justify-center h-auto px-5">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-start my-5 w-full p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <span className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {item.icon}
                </span>
                <div className="flex flex-col ml-4">
                  <span className="text-gray-800 font-semibold">
                    {item.label}
                  </span>
                  <span className="text-gray-600">{item.value}</span>
                </div>
              </div>
            ))}
          </aside>
          <div className="lg:col-span-5 col-span-12 flex lg:justify-start justify-center items-center h-auto">
            <form className="w-full max-w-lg bg-gray-100 shadow-lg rounded-lg p-8">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none focus:ring focus:ring-blue-200"
                  id="username"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none focus:ring focus:ring-blue-200"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Type your message
                </label>
                <textarea
                  className="shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200 resize-none"
                  id="message"
                  placeholder="Your message"
                  rows={4}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Contact;
