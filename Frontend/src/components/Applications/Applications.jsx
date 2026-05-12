import React, { useEffect, useState } from "react";
import "./Applications.css";
import Filter from "../shared/Filter";
import { useApp } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

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
  const [editMode, setEditMode] = useState(false);

  const removeApplication = async (app_id) => {
    try {
      const res = await fetch(`applications/${app_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to Delete.");

      setApplications(
        applications.filter((app) => app.application_id !== app_id),
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const editApplication = (app_id) => {
    let res = applications.find((app) => app.application_id === app_id);

    setShowModal(true);
    setFormData(res);
    setEditMode(true);
  };

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEditMode(false);
    setError("");

    try {
      const res = await fetch(`applications/${formData.application_id}`, {
        method: "PATCH",
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

      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === data.application_id ? data : app,
        ),
      );

      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEditMode(false);
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
      {showModal ? (
        <div className="new-form-container">
          {editMode ? <h2>Edit Application</h2> : <h2>New Application</h2>}
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={editMode ? handleEditSubmit : handleSubmit}>
                <label>Company</label>
                <input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                />

                <label>Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <label>Url</label>
                <input
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />

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

                <label>Notes</label>
                <textarea
                  name="notes"
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>

                <label>Date Applied</label>
                <input
                  type="date"
                  name="date_applied"
                  value={formData.date_applied}
                  onChange={handleChange}
                  required
                />

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
        </div>
      ) : (
        <div className="main-container">
          <div className="heading-container">
            <h1>Application</h1>
            <button onClick={() => setShowModal(true)}>
              + New Application
            </button>
          </div>

          <div className="application-summary">
            <div className="filters">
              {["All", "Applied", "Interview", "Offered", "Rejected"].map(
                (f) => (
                  <Filter
                    key={f}
                    context={f}
                    isActive={currentFilter.toLowerCase() === f.toLowerCase()}
                    onClick={() => setCurrentFilter(f)}
                  />
                ),
              )}
            </div>

            <div className="table-scroll-wrapper">
              <table className="applications-tbl">
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "35%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Company/Roles</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody style={{ textAlign: "center" }}>
                  {filteredData.map((app, index) => (
                    <tr key={app.application_id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>
                          {app.company_name} / {app.title}
                        </strong>
                      </td>

                      <td>{app.created_at}</td>
                      <td>
                        <span className={`status ${app.status}`}>
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
                        <button
                          onClick={() => editApplication(app.application_id)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "#00d4aa" }}
                          />
                        </button>
                        <button
                          onClick={() => removeApplication(app.application_id)}
                        >
                          <FontAwesomeIcon
                            icon={faXmark}
                            style={{ color: "red" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;
