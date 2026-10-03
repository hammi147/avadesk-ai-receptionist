const business = {
  name: "Northstar Home Services",

  hours: "Monday–Sunday, 8:00 AM–10:00 PM",

  services: [
    "HVAC / AC repair",
    "Plumbing",
    "Electrical",
    "General maintenance"
  ],

  serviceArea: "Dubai and nearby areas",

  phone: "+971 50 000 0000",

  whatsapp: "971500000000",

  location: "Dubai, UAE",

  payment: "cash, card, and online payment",

  warranty: "selected repair services include a service warranty",

  emergency: "24/7 emergency support is available for urgent HVAC, plumbing, and electrical issues"
};
let customerName = "";


// ================= CHAT ELEMENTS =================

const chat = document.getElementById("chat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const quickReplies = document.getElementById("quickReplies");


// ================= ADD MESSAGE =================

function addMessage(text, type = "bot") {

  const wrap = document.createElement("div");

  wrap.className = `message ${type}`;


  const label = document.createElement("span");

  label.className = "bubble-label";

  label.textContent =
    type === "bot" ? "Ava" : "You";


  const bubble = document.createElement("div");

  bubble.className = "bubble";

  bubble.textContent = text;


  const time = document.createElement("div");

  time.className = "message-time";

  time.textContent =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });


  wrap.appendChild(label);

  wrap.appendChild(bubble);

  wrap.appendChild(time);

  chat.appendChild(wrap);


  chat.scrollTop = chat.scrollHeight;
}

// ================= BUSINESS RESPONSE ENGINE =================

function getReply(input) {

  const q = input.toLowerCase().trim();


  // ================= GREETING =================

  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("good morning") ||
    q.includes("good evening")
  ) {
    return `Hi! I'm Ava, the virtual receptionist for ${business.name}. I can help with services, pricing, appointments, emergency support, and more.`;
  }
// ================= CUSTOMER NAME =================

if (
  q.includes("remember my name") ||
  q.includes("what is my name") ||
  q.includes("do you know my name")
) {

  if (customerName) {

    return `Yes! Your name is ${customerName}.`;

  }

  return "I don't know your name yet. You can tell me by saying, 'My name is Hammad.'";
}

  // ================= PRICE / COST =================
  // Put this BEFORE AC/HVAC checks.

  if (
    q.includes("price") ||
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("how much") ||
    q.includes("rate") ||
    q.includes("quote")
  ) {

    if (
      q.includes("quote") ||
      q.includes("estimate")
    ) {

      document
        .getElementById("contact")
        .scrollIntoView({
          behavior: "smooth"
        });

      return "Absolutely. Please use the request form below with your service details. Our team can review the request and prepare a quote.";
    }

    return "Pricing depends on the service and the job. Send us your service request and our team can prepare a suitable quote.";
  }


  // ================= EMERGENCY =================

  if (
    q.includes("emergency") ||
    q.includes("urgent") ||
    q.includes("24/7") ||
    q.includes("24 hour")
  ) {

    return `${business.emergency}. If the issue is urgent, submit a callback request below so the team can follow up.`;
  }


  // ================= PAYMENT =================

  if (
    q.includes("payment") ||
    q.includes("pay") ||
    q.includes("card") ||
    q.includes("cash")
  ) {

    return `We accept ${business.payment}.`;
  }


  // ================= WARRANTY =================

  if (
    q.includes("warranty") ||
    q.includes("guarantee")
  ) {

    return `Yes. ${business.warranty}. Ask the team about warranty coverage for your specific service.`;
  }


  // ================= APPOINTMENT =================

  if (
    q.includes("appointment") ||
    q.includes("book") ||
    q.includes("booking") ||
    q.includes("schedule") ||
    q.includes("visit")
  ) {

    document
      .getElementById("contact")
      .scrollIntoView({
        behavior: "smooth"
      });

    return "Sure! Use the callback form below to choose your preferred date and time. A team member will confirm the appointment.";
  }


  // ================= HUMAN SUPPORT =================

  if (
    q.includes("human") ||
    q.includes("person") ||
    q.includes("agent") ||
    q.includes("real person")
  ) {

    document
      .getElementById("contact")
      .scrollIntoView({
        behavior: "smooth"
      });

    return "Of course. Please fill in the callback form below and our team will contact you shortly.";
  }


  // ================= LOCATION / SERVICE AREA =================

  if (
    q.includes("location") ||
    q.includes("where are you") ||
    q.includes("where do you") ||
    q.includes("area") ||
    q.includes("areas") ||
    q.includes("serve")
  ) {

    return `We are based in ${business.location} and currently serve ${business.serviceArea}.`;
  }


  // ================= CONTACT =================

  if (
    q.includes("phone") ||
    q.includes("contact") ||
    q.includes("call")
  ) {

    return "You can request a callback using the form below or contact us through WhatsApp.";
  }


  // ================= HVAC / AC =================

  if (
    q.includes("ac") ||
    q.includes("air conditioner") ||
    q.includes("hvac") ||
    q.includes("cooling")
  ) {

    return "Our HVAC team handles AC repairs, cooling problems, maintenance, and general HVAC service. You can request a callback below.";
  }


  // ================= PLUMBING =================

  if (
    q.includes("plumb") ||
    q.includes("pipe") ||
    q.includes("leak") ||
    q.includes("water")
  ) {

    return "Our plumbing team can help with leaks, pipes, fixtures, drainage, and general plumbing issues.";
  }


  // ================= ELECTRICAL =================

  if (
    q.includes("electric") ||
    q.includes("wiring") ||
    q.includes("power") ||
    q.includes("socket") ||
    q.includes("light")
  ) {

    return "Our electrical team handles wiring, power issues, lights, switches, sockets, and general electrical repairs.";
  }


  // ================= BUSINESS HOURS =================

  if (
    q.includes("hour") ||
    q.includes("hours") ||
    q.includes("open") ||
    q.includes("close") ||
    q.includes("available")
  ) {

    return `Our standard service hours are ${business.hours}. ${business.emergency}.`;
  }


  // ================= SERVICES =================

  if (
    q.includes("service") ||
    q.includes("services") ||
    q.includes("offer") ||
    q.includes("provide") ||
    q.includes("what do you do")
  ) {

    return `We provide ${business.services.join(", ")}. Which service do you need help with?`;
  }


  // ================= THANK YOU =================

  if (
    q.includes("thank") ||
    q.includes("thanks")
  ) {

    return "You're welcome! I'm here whenever you need help.";
  }


  // ================= DEFAULT =================

  return "I can help with services, pricing, opening hours, appointments, emergency support, payment, warranty, and contact requests. What would you like to know?";

}

// ================= USER MESSAGE =================
function handleUserMessage(text) {

  if (!text.trim()) {
    return;
  }


  const userText = text.trim();

  addMessage(userText, "user");

  quickReplies.style.display = "none";


  // ================= REMEMBER CUSTOMER NAME =================

  const nameMatch = userText.match(
    /(?:my name is|i am|i'm|this is)\s+([a-zA-Z][a-zA-Z\s]{1,30})/i
  );


  if (nameMatch) {

    customerName = nameMatch[1]
      .trim()
      .replace(/\s+/g, " ");

  }


  // ================= TYPING INDICATOR =================

  const typing = document.createElement("div");

  typing.className = "message bot";

  typing.innerHTML = `
    <span class="bubble-label">Ava</span>

    <div class="bubble typing-bubble">

      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>

    </div>
  `;


  chat.appendChild(typing);

  chat.scrollTop = chat.scrollHeight;


  setTimeout(() => {

    typing.remove();


    let reply = getReply(userText);


    // Personalize response
    if (
      customerName &&
      (
        userText.toLowerCase().includes("hello") ||
        userText.toLowerCase().includes("hi") ||
        userText.toLowerCase().includes("hey")
      )
    ) {

      reply = `Hi ${customerName}! I'm Ava, your virtual receptionist. How can I help you today?`;

    }


    // Name introduction response
    if (nameMatch) {

      reply = `Nice to meet you, ${customerName}! I can help with services, pricing, appointments, or any other questions you have.`;

    }


    addMessage(reply, "bot");

  }, 650);

}


// ================= CHAT FORM =================

chatForm.addEventListener(
  "submit",
  function (e) {

    e.preventDefault();


    handleUserMessage(
      chatInput.value
    );


    chatInput.value = "";

    chatInput.focus();

  }
);


// ================= QUICK REPLIES =================

quickReplies.addEventListener(
  "click",
  function (e) {

    if (!e.target.matches("button")) {
      return;
    }


    const message =
      e.target.dataset.message;


    handleUserMessage(message);

  }
);


// ================= MOBILE MENU =================

const menuBtn =
  document.getElementById("menuBtn");

const mobileNav =
  document.getElementById("mobileNav");


if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    function () {

      const open =
        mobileNav.classList.toggle("open");


      menuBtn.setAttribute(
        "aria-expanded",
        String(open)
      );


      menuBtn.textContent =
        open ? "×" : "☰";

    }
  );

}


document
  .querySelectorAll(".mobile-nav a")
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        mobileNav.classList.remove(
          "open"
        );


        if (menuBtn) {

          menuBtn.textContent = "☰";

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  });


// ================= CALLBACK BUTTON =================

const openLeadBtn =
  document.getElementById("openLeadBtn");

const leadName =
  document.getElementById("leadName");


if (openLeadBtn) {

  openLeadBtn.addEventListener(
    "click",
    function () {

      document
        .getElementById("contact")
        .scrollIntoView({
          behavior: "smooth"
        });


      setTimeout(
        function () {

          if (leadName) {
            leadName.focus();
          }

        },
        600
      );

    }
  );

}


// ================= LEAD FORM =================

const leadForm =
  document.getElementById("leadForm");

const formResult =
  document.getElementById("formResult");


if (leadForm) {

  leadForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();


      const name =
        document
          .getElementById("leadName")
          .value
          .trim();


      const contact =
        document
          .getElementById("leadContact")
          .value
          .trim();


      const service =
        document
          .getElementById("leadService")
          .value;


      const date =
        document
          .getElementById("leadDate")
          .value;


      const time =
        document
          .getElementById("leadTime")
          .value;


      const notes =
        document
          .getElementById("leadNotes")
          .value
          .trim();


      // ================= VALIDATION =================

      if (!name || !contact) {

        formResult.textContent =
          "Please enter your name and contact details.";

        return;
      }


      // ================= CREATE LEAD =================

      const newLead = {

        id: Date.now(),

        name: name,

        contact: contact,

        service: service,

        date: date,

        time: time,

        notes: notes,

        status: "New",

        createdAt:
          new Date().toISOString()

      };


      // ================= GET EXISTING LEADS =================

      let leads = [];


      const savedLeads =
        localStorage.getItem("avadeskLeads");


      if (savedLeads) {

        try {

          leads =
            JSON.parse(savedLeads);

        } catch (error) {

          leads = [];

        }

      }


      // ================= SAVE LEAD =================

      leads.push(newLead);


      localStorage.setItem(
        "avadeskLeads",
        JSON.stringify(leads)
      );


      // ================= WHATSAPP MESSAGE =================

      const whatsappMessage =
`Hello Northstar Home Services 👋

New customer request:

Name: ${name}
Contact: ${contact}
Service: ${service}
Preferred Date: ${date || "Not specified"}
Preferred Time: ${time}
Notes: ${notes || "No additional notes"}

Submitted through the AvaDesk AI Receptionist demo.`;


      const whatsappURL =
        `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
          whatsappMessage
        )}`;


      // ================= SUCCESS MESSAGE =================

      formResult.textContent =
        `Thanks, ${name}. Your request has been saved and WhatsApp will open shortly.`;


      // ================= OPEN WHATSAPP =================

      window.open(
        whatsappURL,
        "_blank"
      );


      // ================= RESET FORM =================

      leadForm.reset();

    }
  );

}


// ================= DATE =================

const leadDate =
  document.getElementById("leadDate");


if (leadDate) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  leadDate.min = today;

}
// ================= FAQ ACCORDION =================

const faqItems =
  document.querySelectorAll(".faq-item");


faqItems.forEach(function (item) {

  const question =
    item.querySelector(".faq-question");


  question.addEventListener(
    "click",
    function () {

      const isActive =
        item.classList.contains("active");


      // Close all FAQ items
      faqItems.forEach(function (otherItem) {

        otherItem.classList.remove("active");

      });


      // Open selected item
      if (!isActive) {

        item.classList.add("active");

      }

    }
  );

});