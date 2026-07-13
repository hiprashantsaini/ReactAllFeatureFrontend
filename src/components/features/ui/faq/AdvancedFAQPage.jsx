//npm install lucide-react  //for icons

import { ChevronDown, Search } from "lucide-react";
import { useState, useMemo } from "react";

const faqs = [
  { question: "What services do you provide?", answer: "We provide professional web development, mobile app development, UI/UX design, ERP solutions, API integration, and ongoing maintenance services tailored to your business needs.", category: "General" },
  { question: "How long does it take to complete a project?", answer: "The timeline depends on the project's complexity. A simple website may take 1–2 weeks, while larger applications or ERP systems can take several weeks or months. We provide a detailed timeline after understanding your requirements.", category: "Projects" },
  { question: "Do you provide support after project delivery?", answer: "Yes. We offer post-launch support, bug fixes, performance optimization, and maintenance packages to ensure your application continues to run smoothly.", category: "Support" },
  { question: "Can you redesign my existing website?", answer: "Absolutely. We can modernize your existing website with a fresh design, improved performance, enhanced security, and a better user experience while preserving your valuable content.", category: "Projects" },
  { question: "Do you develop mobile applications?", answer: "Yes. We develop cross-platform mobile applications using modern technologies such as React Native, allowing your app to run efficiently on both Android and iOS devices.", category: "Services" },
  { question: "Will my website be mobile-friendly?", answer: "Yes. Every website we develop is fully responsive, ensuring an excellent user experience across desktops, tablets, and smartphones.", category: "Services" },
  { question: "How much does a website cost?", answer: "The cost depends on your specific requirements, including design, functionality, and integrations. Contact us for a free consultation and a customized quotation.", category: "Pricing" },
  { question: "Can I update my website myself?", answer: "Yes. We can build your website with an easy-to-use content management system or admin panel, allowing you to update text, images, and other content without technical knowledge.", category: "General" },
  { question: "Do you provide SEO services?", answer: "Yes. We follow SEO best practices during development and also offer advanced SEO services to improve your website's visibility in search engine results.", category: "Services" },
  { question: "How can I get started?", answer: "Simply contact us with your project requirements. We'll discuss your goals, suggest the best solution, provide a project estimate, and begin development after approval.", category: "General" },
];

const categories = ["All", ...new Set(faqs.map((f) => f.category))];

const Highlight = ({ text, query }) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-blue-100 text-blue-800 rounded px-0.5">{part}</mark>
    ) : part
  );
};

const FAQItem = ({ item, isOpen, onToggle, query }) => (
  <div className="border-b border-gray-100">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group"
    >
      <span className="text-[15px] font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
        <Highlight text={item.question} query={query} />
      </span>
      <ChevronDown
        size={18}
        className={`shrink-0 text-gray-400 transition-transform duration-300 ${
          isOpen ? "rotate-180 text-blue-500" : ""
        }`}
      />
    </button>

    <div className={`overflow-hidden transition-all duration-350 ease-in-out ${isOpen ? "max-h-60 pb-5" : "max-h-0"}`}>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        <Highlight text={item.answer} query={query} />
      </p>
    </div>
  </div>
);

const AdvancedFAQPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return faqs.filter((f) => {
      const matchCat = activeCategory === "All" || f.category === activeCategory;
      const matchText = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [query, activeCategory]);

  const handleToggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Frequently asked questions</h1>
        <p className="text-[15px] text-gray-500">Everything you need to know about our services.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpenIndex(null); }}
          placeholder="Search questions…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-[13px] border transition ${
              activeCategory === cat
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Result count */}
      {(query || activeCategory !== "All") && (
        <p className="text-[13px] text-gray-400 mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* FAQ list */}
      {filtered.length > 0 ? (
        <div>
          {filtered.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              query={query}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          No questions match your search.
        </div>
      )}
    </div>
  );
};

export default AdvancedFAQPage;