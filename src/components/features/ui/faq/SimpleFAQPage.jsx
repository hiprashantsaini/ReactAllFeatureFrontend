//npm install lucide-react  //for icons

import { ChevronDown } from "lucide-react";
import { useState } from "react";
const faqs = [
  {
    question: "What services do you provide?",
    answer:
      "We provide professional web development, mobile app development, UI/UX design, ERP solutions, API integration, and ongoing maintenance services tailored to your business needs.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "The timeline depends on the project's complexity. A simple website may take 1–2 weeks, while larger applications or ERP systems can take several weeks or months. We provide a detailed timeline after understanding your requirements.",
  },
  {
    question: "Do you provide support after project delivery?",
    answer:
      "Yes. We offer post-launch support, bug fixes, performance optimization, and maintenance packages to ensure your application continues to run smoothly.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We can modernize your existing website with a fresh design, improved performance, enhanced security, and a better user experience while preserving your valuable content.",
  },
  {
    question: "Do you develop mobile applications?",
    answer:
      "Yes. We develop cross-platform mobile applications using modern technologies such as React Native, allowing your app to run efficiently on both Android and iOS devices.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes. Every website we develop is fully responsive, ensuring an excellent user experience across desktops, tablets, and smartphones.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "The cost depends on your specific requirements, including design, functionality, and integrations. Contact us for a free consultation and a customized quotation.",
  },
  {
    question: "Can I update my website myself?",
    answer:
      "Yes. We can build your website with an easy-to-use content management system or admin panel, allowing you to update text, images, and other content without technical knowledge.",
  },
  {
    question: "Do you provide SEO services?",
    answer:
      "Yes. We follow SEO best practices during development and also offer advanced SEO services to improve your website's visibility in search engine results.",
  },
  {
    question: "How can I get started?",
    answer:
      "Simply contact us with your project requirements. We'll discuss your goals, suggest the best solution, provide a project estimate, and begin development after approval.",
  },
];

const FAQ = ({ item }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="border-b border-gray-200 py-2">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="flex w-full items-center justify-between text-left cursor-pointer"
      >
        <span className={`text-lg font-semibold ${show ? "text-indigo-600":""}`}>
          {item.question}
        </span>

        <ChevronDown className={`text-xl transition-transform duration-300 ${
            show ? "rotate-180 text-indigo-600" : ""
          }`}/>

      </button>

      <div
        className={`overflow-y-auto transition-all duration-500 ease-in-out ${
          show
            ? "max-h-36 mt-2"
            : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-7">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const SimpleFAQPage = () => {
  return (
    <div>
      <h1 className="w-full text-center text-2xl text-blue-700">
        Frequently Asked Questions (FAQs)
      </h1>
      <div className="flex flex-col overflow-hidden px-2">
        {faqs.map((item, index) => {
          return <FAQ key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default SimpleFAQPage;