import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import SpyForm from "../components/SpyForm";

export default function NewSpy() {
  const navigate = useNavigate();

  async function handleCreateSpy(formData) {
    const { data, error } = await supabase.from("spies").insert([formData]);

    if (error) {
      alert("Error creating spy: " + error.message);
    } else {
      alert("Spy created successfully!");
      navigate("/"); // Go back to homepage after creating
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Spy</h1>
      <SpyForm onSubmit={handleCreateSpy} />
    </div>
  );
}
