function sendMail() {
  var params = {
    name: document.getElementById("name_id").value,
    phone: document.getElementById("phone_id").value,
    email: document.getElementById("email_id").value,
    interest: document.getElementById("interest_id").value,
    message: document.getElementById("message_id").value,
  };

  const serviceID = "service_jemjsjo";
  const templateID = "template_k01s8ri";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name_id").value = "";
      document.getElementById("phone_id").value = "";
      document.getElementById("email_id").value = "";
      document.getElementById("interest_id").value = "";
      document.getElementById("message_id").value = "";
      console.log(res);
      alert("Your Message Send Successfully!");
    })
    .catch((err) => console.log(err));
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    sendMail(); // Call the sendMail function
  });
