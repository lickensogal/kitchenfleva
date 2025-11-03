import { supabase } from "../supabaseClient.js";
import * as UI from "../js/ui.js";

export default function initContactForm() {
  const form = document.getElementById("contact-form");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = form.querySelector("input[name='fullname']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const subject = form.querySelector("input[name='subject']").value.trim();
    const message = form.querySelector("textarea[name='message']").value.trim();

    if(!fullname || !email || !subject || !message){
      UI.showToast("All fields are required.", "warning");
      return;
    }

    try {
      const { error } = await supabase.from("contact_messages").insert([{ fullname, email, subject, message }]);
      if(error) throw error;

      // Optional: trigger email via Supabase function
      await supabase.functions.invoke("sendEmail", {
        body: { type: "contact", fullname, email, subject, message }
      });

      UI.showToast("Message sent successfully!", "success");
      form.reset();
    } catch(err) {
      console.error("Contact Form Error:", err.message);
      UI.showToast("Failed to send message. Please try again.", "danger");
    }
  });
}
