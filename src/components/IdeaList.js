import { useEffect, useState } from "react";
import IdeaList from "../components/IdeaList";
import axios from "axios";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const API_BASE_URL = import.meta.env.PROD
          ? "https://suitmedia-backend.suitdev.com/api"
          : "/api";

        const res = await axios.get(
          `${API_BASE_URL}/ideas?page[number]=1&page[size]=10&append[]=medium_image&sort=-published_at`
        );
        setIdeas(res.data.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <IdeaList ideas={ideas} />
    </div>
  );
};

export default Ideas;
