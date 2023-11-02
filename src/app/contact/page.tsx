import { Metadata, NextPage } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

const ContactPage: NextPage = () => {
  return (
    <main className="font-modern min-h-screen">
      <Navbar />
      <div className="relative h-[70vh] flex items-top justify-center bg-white dark:bg-gray-800 sm:items-center sm:pt-0 m-0">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 mr-2 bg-red-100 dark:bg-gray-600 sm:rounded-lg">
                <h1 className="text-4xl sm:text-5xl text-black dark:text-white font-extrabold tracking-tight font-fancy">
                  Get in touch
                </h1>
                <p className="text-normal text-lg sm:text-2xl font-medium text-black dark:text-white mt-2">
                  Fill in the form to start a conversation
                </p>

                <div className="flex items-center mt-4 text-black dark:text-white">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black dark:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    (469) 626-8505
                  </div>
                </div>

                <div className="flex items-center mt-2 text-black dark:text-white">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black dark:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    contact.classicalslive@gmail.com
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContactPage;
