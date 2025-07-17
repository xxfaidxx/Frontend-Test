import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import IdeaList from "./IdeaList";
import axios from "axios";
import Banner from "../components/Banner";

const Ideas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [links, setLinks] = useState({});

  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const sort = searchParams.get("sort") || "-published_at";

  const updateParams = (newParams) => {
    setSearchParams({
      page: newParams.page ?? page,
      size: newParams.size ?? size,
      sort: newParams.sort ?? sort,
    });
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://suitmedia-backend.suitdev.com/api/ideas",
          {
            headers: {
              Accept: "application/json",
            },
            params: {
              "page[number]": page,
              "page[size]": size,
              "append[]": ["small_image", "medium_image"],
              sort: sort,
            },
          }
        );

        setIdeas(response.data.data);
        response.data.data.forEach((idea, i) => {
          console.log(`Idea ${i}:`, {
            medium_image: idea.medium_image,
            small_image: idea.small_image,
          });
        });
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
      <Banner />
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
                onChange={(e) =>
                  updateParams({ size: Number(e.target.value), page: 1 })
                }
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
                onChange={(e) =>
                  updateParams({ sort: e.target.value, page: 1 })
                }
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
            onClick={() => updateParams({ page: 1 })}
            disabled={!links.prev}
            className={`px-1 py-1 text-md ${
              !links.prev ? "text-gray-500" : "text-black"
            }`}
          >
            &laquo;
          </button>
          <button
            onClick={() => updateParams({ page: page - 1 })}
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
              onClick={() => updateParams({ page: p })}
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
            onClick={() => updateParams({ page: page + 1 })}
            disabled={!links.next}
            className={`px-1 py-1 text-md ${
              !links.next ? "text-gray-700" : "text-black"
            }`}
          >
            &rsaquo;
          </button>
          <button
            onClick={() => updateParams({ page: meta?.last_page })}
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
