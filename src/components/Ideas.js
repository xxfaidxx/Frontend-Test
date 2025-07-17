import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import IdeaList from "./IdeaList";
import axios from "axios";

const Ideas = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("-published_at");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [links, setLinks] = useState({});

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        setIdeas(response.data.data);
        setMeta(response.data.meta);
        setLinks(response.data.links);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [page, size, sort]);

  const paginationRange = () => {
    if (!meta) return [];
    let start = Math.max(1, meta.current_page - 2);
    let end = Math.min(meta.last_page, meta.current_page + 2);

    if (meta.last_page > 5) {
      if (meta.current_page <= 3) {
        end = 5;
      } else if (meta.current_page + 2 >= meta.last_page) {
        start = meta.last_page - 4;
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (error)
    return <p className="text-center py-10 text-red-600">Error: {error}</p>;

  return (
    <div>
      <Banner
        imageUrl="https://plus.unsplash.com/premium_photo-1673514503545-1ca1193e4094?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Ideas"
        subtitle="We have great ideas"
      />

      <main className="px-20 py-10">
        <div className="flex justify-between items-center mb-10">
          <span>
            Showing {meta?.from} - {meta?.to} of {meta?.total}
          </span>
          <div className="flex space-x-4">
            <div className="mr-5">
              <label className="mr-2">Show per page:</label>
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(1);
                }}
                className="border rounded-full px-10 py-1 pl-3 text-left"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div>
              <label className="mr-2">Sort by:</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="border rounded-full px-10 py-1 pl-3 text-left"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <IdeaList ideas={ideas} />
        )}

        <div className="mt-10 flex justify-center space-x-2">
          <button
            onClick={() => setPage(1)}
            disabled={!links.prev}
            className={`px-1 py-1 text-md ${
              !links.prev ? "text-gray-500" : "text-black"
            }`}
          >
            &laquo;
          </button>
          <button
            onClick={() => setPage(page - 1)}
            disabled={!links.prev}
            className={`px-1 py-1 text-md ${
              !links.prev ? "text-gray-500" : "text-black"
            }`}
          >
            &lsaquo;
          </button>
          {paginationRange().map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-2 py-1 rounded text-xs ${
                page === p
                  ? "bg-[rgb(255,102,0)] text-white"
                  : "bg-transparent text-black"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={!links.next}
            className={`px-1 py-1 text-md ${
              !links.next ? "text-gray-700" : "text-black"
            }`}
          >
            &rsaquo;
          </button>
          <button
            onClick={() => setPage(meta?.last_page)}
            disabled={!links.next}
            className={`px-1 py-1 text-md ${
              !links.next ? "text-gray-700" : "text-black"
            }`}
          >
            &raquo;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Ideas;
