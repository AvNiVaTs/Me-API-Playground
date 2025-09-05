import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());

export default function ProjectForm({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    skills: [],
    demoLink: "",
    repoLink: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !form.skills.includes(skill)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Project title is required");
      return;
    }
    setSaving(true);
    setError("");

    // fake API simulation
    setTimeout(() => {
      console.log("Project saved:", form);
      setSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <h2>Add New Project</h2>
        <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: "18px" }}>✕</button>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        {/* Title */}
        <div style={{ marginBottom: "10px" }}>
          <label>Project Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Dates */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Start Month</label>
            <select
              value={form.startMonth}
              onChange={(e) => setForm({ ...form, startMonth: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="">Select month</option>
              {months.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Start Year</label>
            <select
              value={form.startYear}
              onChange={(e) => setForm({ ...form, startYear: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="">Select year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>End Month</label>
            <select
              value={form.endMonth}
              onChange={(e) => setForm({ ...form, endMonth: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="">Select month</option>
              {months.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>End Year</label>
            <select
              value={form.endYear}
              onChange={(e) => setForm({ ...form, endYear: e.target.value })}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="">Select year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Skills */}
        <div style={{ marginBottom: "10px" }}>
          <label>Skills Used</label>
          <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              style={{ flex: 1, padding: "8px" }}
              placeholder="Add a skill and press Enter"
            />
            <button type="button" onClick={addSkill}>Add</button>
          </div>
          <div style={{ marginTop: "5px" }}>
            {form.skills.map((skill) => (
              <span key={skill} style={{ marginRight: "8px", padding: "5px 10px", border: "1px solid #007bff", borderRadius: "20px" }}>
                {skill}{" "}
                <button type="button" onClick={() => removeSkill(skill)} style={{ marginLeft: "5px" }}>✕</button>
              </span>
            ))}
          </div>
        </div>

        {/* Demo Link */}
        <div style={{ marginBottom: "10px" }}>
          <label>Demo Link</label>
          <input
            type="url"
            value={form.demoLink}
            onChange={(e) => setForm({ ...form, demoLink: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Repo Link */}
        <div style={{ marginBottom: "10px" }}>
          <label>Repository Link</label>
          <input
            type="url"
            value={form.repoLink}
            onChange={(e) => setForm({ ...form, repoLink: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button type="submit" disabled={saving} style={{ flex: 1, padding: "10px", background: "#007bff", color: "white", border: "none" }}>
            {saving ? "Creating..." : "Create Project"}
          </button>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: "10px" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}