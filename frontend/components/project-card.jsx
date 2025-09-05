import React from "react";

export default function ProjectCard({ project }) {
  const formatDate = (month, year) => {
    if (!month || !year) return "";
    return `${month} ${year}`;
  };

  const startDate = formatDate(project.startMonth, project.startYear);
  const endDate = formatDate(project.endMonth, project.endYear);
  const timeline = startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate;

  return (
    <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "10px", marginBottom: "15px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>{project.title}</h3>
            {timeline && <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{timeline}</p>}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#e0f0ff",
                  color: "#0056b3",
                  textDecoration: "none",
                }}
              >
                Demo
              </a>
            )}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "4px 8px",
                  fontSize: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#d0e0ff",
                  color: "#003d99",
                  textDecoration: "none",
                }}
              >
                Repo
              </a>
            )}
          </div>
        </div>

        {project.description && (
          <p style={{ fontSize: "14px", lineHeight: "20px", color: "#333", margin: 0 }}>
            {project.description}
          </p>
        )}

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  padding: "4px 10px",
                  fontSize: "12px",
                  borderRadius: "12px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}