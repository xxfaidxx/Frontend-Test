import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Pagination from "./Pagination";

const IdeasList = () => {
  const [ideas, setIdeas] = useState([]);
  const [page, setPage] = useState(
    () => Number(localStorage.getItem("page")) || 1
  );
  const [size, setSize] = useState(
    () => Number(localStorage.getItem("size")) || 10
  );
  const [sort, setSort] = useState(
    () => localStorage.getItem("sort") || "-published_at"
  );
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/ideas?page[number]=${page}&page[size]=${size}&append[]=medium_image&sort=${sort}`
      );
      setIdeas(res.data.data);
      setTotal(res.data.meta.total);
      setError("");
    } catch (err) {
      console.error("Failed to fetch ideas:", err);
      setError("Failed to load ideas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [page, size, sort]);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("size", size);
    localStorage.setItem("sort", sort);
  }, [page, size, sort]);

  const start = (page - 1) * size + 1;
  const end = Math.min(start + size - 1, total);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-sm text-gray-600">
          Showing {start} - {end} of {total}
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <label className="mr-2 text-sm">Show per page:</label>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mr-2 text-sm">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      {loading ? (
        <div className="text-center text-gray-500">Loading ideas...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Card
              key={idea.id}
              title={idea.title}
              imageUrl={
                idea.medium_image?.[0]?.url?.startsWith("http")
                  ? idea.medium_image[0].url
                  : null
              }
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} total={total} size={size} />
    </div>
  );
};

export default IdeasList;
