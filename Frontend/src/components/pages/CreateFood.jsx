import React, { useState } from "react";
import axios from "axios";

const CreateFood = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const form = new FormData();
    form.append("name", e.target.name.value);
    form.append("description", e.target.description.value);
    if (e.target.video.files[0]) {
      form.append("video", e.target.video.files[0]);
    }

    try {
      await axios.post("http://localhost:3000/api/food", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Food uploaded successfully");
      e.target.reset();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to upload. Ensure you are logged in as a partner."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <fieldset>
          <legend>Add Food</legend>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="full">
              <input name="name" placeholder="Food name" required />
            </label>
            <label className="full">
              <textarea name="description" placeholder="Description" rows={3} />
            </label>
            <label className="full">
              <input type="file" name="video" accept="video/*" required />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {error && <p className="form-footer">{error}</p>}
          {success && <p className="form-footer">{success}</p>}
        </fieldset>
      </div>
    </div>
  );
};

export default CreateFood;
