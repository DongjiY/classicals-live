"use client";
import { FunctionComponent, SyntheticEvent, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm: FunctionComponent = () => {
  const form = useRef(null);

  const sendEmail = (e: SyntheticEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_xzxwkdm",
        "template_7uitvrp",
        form.current! as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      )
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form
      className="p-6 flex flex-col justify-center"
      ref={form}
      onSubmit={sendEmail}
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="hidden">
          Full Name
        </label>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Full Name"
          className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-white text-gray-800 dark:text-white font-semibold focus:outline-none"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label htmlFor="email" className="hidden">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-white dark:text-white text-gray-800 font-semibold focus:outline-none"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label htmlFor="tel" className="hidden">
          Message
        </label>
        <textarea
          name="message"
          placeholder="Your message here..."
          className="mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-white dark:text-white text-gray-800 font-semibold focus:outline-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="md:w-32 bg-red-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-red-700 transition ease-in-out duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
