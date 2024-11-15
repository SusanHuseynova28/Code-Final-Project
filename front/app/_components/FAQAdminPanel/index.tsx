"use client";

import { useState, useEffect } from "react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQAdminPanel() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const fetchFAQs = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/faqs");
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    }
  };

  const addFAQ = async () => {
    if (newQuestion && newAnswer) {
      try {
        const response = await fetch("http://localhost:3001/api/faqs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
        });
        const addedFAQ = await response.json();
        setFaqs([...faqs, addedFAQ]);
        setNewQuestion("");
        setNewAnswer("");
      } catch (error) {
        console.error("Failed to add FAQ:", error);
      }
    }
  };

  const deleteFAQ = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/faqs/${id}`, {
        method: "DELETE",
      });
      setFaqs(
        faqs.map((faq) =>
          faq._id === id
            ? { ...faq, answer: "FAQ currently not available" }
            : faq
        )
      );
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center mt-16">
        FAQ Admin Panel
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New FAQ</h2>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border border-gray-300 p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="border border-gray-300 p-2 mb-2 w-full"
        />
        <button
          onClick={addFAQ}
          className=" text-white py-2 px-4 bg-customBackground"
        >
          Add FAQ
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Existing FAQs</h2>
      <ul>
        {faqs.map((faq) => (
          <li
            key={faq._id}
            className="border-b border-gray-300 py-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{faq.question}</p>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
            <button
              onClick={() => deleteFAQ(faq._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
