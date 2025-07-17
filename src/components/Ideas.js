// src/pages/Ideas.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import IdeaList from "../components/IdeaList";
import Banner from "../components/Banner";
import { useSearchParams } from "react-router-dom";

const Ideas = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialSize = parseInt(searchParams.get("size")) || 10;
  const initialSort = searchParams.get("sort") || "-published_at";

  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [sort, setSort] = useState(initialSort);
  const [ideas, setIdeas] = useState([]);
  const [meta, setMeta] = useState(null);
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/ideas?page[number]=${page}&page[size]=${size}&append[]=medium_image&sort=${sort}`
      )
      .then((res) => {
        setIdeas(res.data.data);
        setMeta(res.data.meta);
        setLinks(res.data.links);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [page, size, sort]);

  useEffect(() => {
    setSearchParams({ page, size, sort });
  }, [page, size, sort]);

  const handleSizeChange = (e) => {
    setSize(Number(e.target.value));
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta?.last_page) {
      setPage(newPage);
    }
  };

  const paginationRange = () => {
    if (!meta) return [];
    let start = Math.max(1, meta.current_page - 2);
    let end = Math.min(meta.last_page, meta.current_page + 2);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div>
      <Banner
        imageUrl="https://plus.unsplash.com/premium_photo-1673514503545-1ca1193e4094?q=80&w=1770&auto=format&fit=crop"
        title="Ideas"
        subtitle="We have great ideas"
      />
      <main className="px-6 md:px-20 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <span className="text-sm">
            Showing {meta?.from} - {meta?.to} of {meta?.total}
          </span>
          <div className="flex gap-4">
            <div>
              <label className="mr-2 text-sm">Show per page:</label>
              <select
                value={size}
                onChange={handleSizeChange}
                className="border rounded-full px-4 py-1 text-sm"
              >
                {[10, 20, 50].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mr-2 text-sm">Sort by:</label>
              <select
                value={sort}
                onChange={handleSortChange}
                className="border rounded-full px-4 py-1 text-sm"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <IdeaList ideas={ideas} />
        )}

        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={!links.prev}
            className="px-2 text-sm"
          >
            &laquo;
          </button>
          <button
            onClick={() => handlePageChange(meta?.current_page - 1)}
            disabled={!links.prev}
            className="px-2 text-sm"
          >
            &lsaquo;
          </button>
          {paginationRange().map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 rounded-full text-sm ${
                p === page
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(meta?.current_page + 1)}
            disabled={!links.next}
            className="px-2 text-sm"
          >
            &rsaquo;
          </button>
          <button
            onClick={() => handlePageChange(meta?.last_page)}
            disabled={!links.next}
            className="px-2 text-sm"
          >
            &raquo;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Ideas;
