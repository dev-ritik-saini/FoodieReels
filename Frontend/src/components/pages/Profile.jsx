import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Simple mock data for the grid; replace with real videos later
const sampleVideos = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }));

const initialsFrom = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

const Profile = () => {
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]); // partner's foods
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Partner-only endpoint
        const res = await axios.get("http://localhost:3000/api/partners/me", {
          withCredentials: true,
        });
        if (!mounted) return;
        setRole("partner");
        setUser(res.data?.partner || null);
        setItems(res.data?.foods || []);
      } catch (err) {
        if (!mounted) return;
        setError(
          err?.response?.data?.message ||
            "Only food partners can access this page."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="page-container">
        <div className="form-box">Loading profile…</div>
      </div>
    );
  if (error)
    return (
      <div className="page-container">
        <div className="form-box">{error}</div>
      </div>
    );

  const displayName = user?.businessName || user?.name || "Partner";
  const address = user?.address || user?.email;

  return (
    <div className="profile-wrap">
      <section className="profile-card">
        <div className="profile-top">
          <div className="avatar">{initialsFrom(displayName)}</div>
          <div className="badge-col">
            <div className="badge">{displayName}</div>
            <div className="badge outline">{address}</div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="label">total meals</div>
            <div className="value">43</div>
          </div>
          <div className="stat">
            <div className="label">customer serve</div>
            <div className="value">15K</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="video-grid">
        {items.map((f) => (
          <div
            key={f._id}
            className="video-tile"
            style={{ position: "relative" }}
            title={f.name}
          >
            <video
              className="tile-video"
              src={f.video}
              muted
              loop
              playsInline
            />
            <button
              style={{ position: "absolute", top: 8, right: 8 }}
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:3000/api/food/${f._id}`,
                    { withCredentials: true }
                  );
                  setItems((prev) => prev.filter((x) => x._id !== f._id));
                } catch (err) {
                  alert(err?.response?.data?.message || "Delete failed");
                }
              }}
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
        {!items.length && (
          <div className="form-footer" style={{ gridColumn: "1 / -1" }}>
            No videos yet. Use Add Food to upload your first video.
          </div>
        )}
      </section>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Link className="reel-btn" to="/create-food">
          Add Food
        </Link>
      </div>
    </div>
  );
};

export default Profile;
