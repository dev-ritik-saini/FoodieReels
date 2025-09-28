import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Store = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/partners/${id}`,
          {
            withCredentials: true,
          }
        );
        if (mounted) setData(res.data);
      } catch (err) {
        if (mounted)
          setError(err?.response?.data?.message || "Failed to load store");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div className="page-container">
        <div className="form-box">Loading store…</div>
      </div>
    );
  if (error)
    return (
      <div className="page-container">
        <div className="form-box">{error}</div>
      </div>
    );
  if (!data) return null;

  const { partner, foods = [], isOwner } = data;
  const [items, setItems] = useState(foods);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/food/${id}`, {
        withCredentials: true,
      });
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="profile-wrap">
      <section className="profile-card">
        <div className="profile-top">
          <div className="avatar">
            {(partner.businessName || partner.name || "P")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="badge-col">
            <div className="badge">{partner.businessName || partner.name}</div>
            <div className="badge outline">{partner.address}</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="video-grid">
        {items.map((f) => (
          <div
            key={f._id}
            className="video-tile"
            title={f.name}
            style={{ position: "relative" }}
          >
            <span>video</span>
            {isOwner && (
              <button
                style={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => handleDelete(f._id)}
                title="Delete"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </section>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Link className="reel-btn" to={`/store/${partner._id}`}>
          Refresh
        </Link>
        {isOwner && (
          <Link className="reel-btn" to="/create-food">
            Add Food
          </Link>
        )}
      </div>
    </div>
  );
};

export default Store;
