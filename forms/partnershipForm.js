import { supabase } from "../supabaseClient.js";
import * as UI from "../js/ui.js";

export default function initPartnershipForm() {
  const form = document.getElementById("partnership-form");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = form.querySelector("input[name='company']").value.trim();
    const contact_person = form.querySelector("input[name='contact_person']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const proposal_type = form.querySelector("select[name='proposal_type']").value;
    const message = form.querySelector("textarea[name='message']").value.trim();

    if(!company || !contact_person || !email || !proposal_type || !message){
      UI.showToast("All fields are required.", "warning");
      return;
    }

    try {
      const { error } = await supabase.from("partnership_proposals").insert([{ company, contact_person, email, proposal_type, message }]);
      if(error) throw error;

      // Optional: trigger email notification to partnership admin
      await supabase.functions.invoke("sendEmail", {
        body: { type: "partnership", company, contact_person, email, proposal_type, message }
      });

      UI.showToast("Proposal submitted successfully!", "success");
      form.reset();
    } catch(err) {
      console.error("Partnership Form Error:", err.message);
      UI.showToast("Failed to submit proposal. Please try again.", "danger");
    }
  });
}
