import React, { useState } from "react";
import "./Applications.css";
import Filter from "../shared/Filter";
import { useApp } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";

const STATUSES = ["All", "Applied", "Interview", "Offered", "Rejection"];

const EMPTY_FORM = {
  company_name: "",
  title: "",
  url: null,
  status: "applied",
  notes: "",
};

function Applications() {
  const { user, setApplications, applications, token } = useApp();
  const [currentFilter, setCurrentFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(EMPTY_FORM);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("applications/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company_name: formData.company_name,
          title: formData.title,
          url: formData.url ? formData.url : null,
          status: formData.status.toLowerCase(),
          notes: formData.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to create.");

      setApplications((prev) => [...prev, data]);
      console.log(data);

      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredData = applications.filter(
    (app) =>
      currentFilter === "All" ||
      app.status?.toLowerCase() === currentFilter.toLowerCase(),
  );

  return (
    <div className="applications-container">
      <div className="heading-container">
        <h1>Application</h1>
        <button onClick={() => setShowModal(true)}>+ New Application</button>
      </div>

      <div className="application-summary">
        <div className="filters">
          {["All", "Applied", "Interview", "Offered", "Rejected"].map((f) => (
            <Filter
              key={f}
              context={f}
              isActive={currentFilter.toLowerCase() === f.toLowerCase()}
              onClick={() => setCurrentFilter(f)}
            />
          ))}
        </div>

        <table className="applications-tbl">
          <thead>
            <th>Company/Roles</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Actions</th>
          </thead>

          <tbody style={{ textAlign: "center" }}>
            {filteredData.map((app) => (
              <tr key={app.application_id}>
                <td>
                  <strong>
                    {app.company_name} / {app.title}
                  </strong>
                </td>

                <td>{app.created_at}</td>
                <td>
                  <span className={`status ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>

                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <button>
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>New Application</h2>
            <form onSubmit={handleSubmit}>
              <label>Company</label>
              <input
                name="company_name"
                value={formData.company}
                onChange={handleChange}
                required
              />
              <br></br>

              <label>Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <br></br>

              <label>Url</label>
              <input name="url" value={formData.url} onChange={handleChange} />
              <br></br>

              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offered</option>
                <option>Rejected</option>
              </select>
              <br></br>

              <label>Notes</label>
              <textarea name="notes" id="notes"></textarea>
              <br></br>

              <label>Date Applied</label>
              <input
                type="date"
                name="date_applied"
                value={formData.date_applied}
                onChange={handleChange}
                required
              />
              <br></br>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="modal-actions">
                <button type="button" onClick={() => closeModal()}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;
