import { supabase } from "../supabaseClient.js";
import * as UI from "../js/ui.js";

export default function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.querySelector("input[name='email']").value.trim();
    if(!email){
      UI.showToast("Please enter a valid email.", "warning");
      return;
    }

    try {
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);
      if(error) throw error;

      // Optional: trigger eBook delivery email
      await supabase.functions.invoke("sendEmail", {
        body: { type: "newsletter", email }
      });

      UI.showToast("Subscribed successfully! Free eBook sent.", "success");
      form.reset();
    } catch(err) {
      console.error("Newsletter Form Error:", err.message);
      UI.showToast("Subscription failed. Try again.", "danger");
    }
  });
}
