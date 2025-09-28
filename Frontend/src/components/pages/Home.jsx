import React, { useEffect, useState } from "react";
import ReelsFeed from "../reels/ReelsFeed";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        const feed = (res.data?.foodItems || []).map((f) => ({
          id: f._id,
          src: f.video,
          description: f.description || f.name || "",
          storeUrl: `/store/${
            typeof f.foodPartner === "object"
              ? f.foodPartner?._id
              : f.foodPartner
          }`,
        }));
        if (mounted) setItems(feed);
      } catch (err) {
        if (mounted)
          setError(
            err?.response?.data?.message ||
              "Failed to load feed. Please login first to view videos."
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
        <div className="form-box">Loading feed…</div>
      </div>
    );
  if (error)
    return (
      <div className="page-container">
        <div className="form-box">{error}</div>
      </div>
    );
  if (!items.length)
    return (
      <div className="page-container">
        <div className="form-box">No videos yet.</div>
      </div>
    );

  return <ReelsFeed items={items} />;
};

export default Home;
