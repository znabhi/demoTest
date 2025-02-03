document.addEventListener("DOMContentLoaded", async () => {
  // Fetch API base URL from backend config
  // const response = await fetch("/config");
  // console.log("response from editor", response);

  // const config = await response.json();
  const API_BASE_URLs = "http://localhost:3005"; // Dynamically get backend URL

  const quill = new Quill("#editor", {
    theme: "snow",
    placeholder: "Write the answer...",
  });

  document
    .getElementById("faq-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const question = document.getElementById("question").value;
      const answer = quill.root.innerHTML;

      const response = await fetch(`${API_BASE_URLs}/api/v1/faqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      const result = await response.json();
      if (result.success) {
        alert("FAQ submitted successfully!");
        document.getElementById("faq-form").reset();
        quill.root.innerHTML = "";
        fetchFAQs();
      } else {
        alert("Error: " + result.message);
      }
    });

  const fetchFAQs = async () => {
    const response = await fetch(`${API_BASE_URLs}/api/v1/faqs`);

    const faqs = await response.json();
    console.log(faqs);

    const faqList = document.getElementById("faq-list");
    faqList.innerHTML = "";

    const selectedLanguage = document.getElementById("language-filter").value;

    faqs.forEach((faq) => {
      let displayQuestion = faq.question;
      let displayAnswer = faq.answer;

      if (selectedLanguage !== "all") {
        displayQuestion = faq[`question_${selectedLanguage}`] || faq.question;
        displayAnswer = faq[`answer_${selectedLanguage}`] || faq.answer;
      }

      const faqItem = document.createElement("div");
      faqItem.classList.add("faq-item");
      faqItem.innerHTML = `
        <div class="faq-content">
          <h3>${displayQuestion}</h3>
          <p>${displayAnswer}</p>
        </div>
        <button class="delete-btn" data-id="${faq.id}"></button>
      `;

      faqList.appendChild(faqItem);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const faqId = event.target.getAttribute("data-id");

        if (!faqId) {
          alert("Error: FAQ ID is missing!");
          return;
        }

        const confirmDelete = confirm(
          "Are you sure you want to delete this FAQ?"
        );
        if (!confirmDelete) return;

        const response = await fetch(`${API_BASE_URLs}/api/v1/faqs/${faqId}`, {
          method: "DELETE",
        });

        const result = await response.json();
        if (result.success) {
          alert("FAQ deleted successfully!");
          fetchFAQs();
        } else {
          alert("Error: " + result.message);
        }
      });
    });
  };

  document
    .getElementById("language-filter")
    .addEventListener("change", fetchFAQs);

  fetchFAQs();
});
