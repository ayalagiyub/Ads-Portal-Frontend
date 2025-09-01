import { useEffect, useState } from "react";
import axios from "axios";

export type Advertisting = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  creator_user_id: number;
  created_at: Date;
};

export const useFetchAllAdverts = () => {
  const [data, setData] = useState<Advertisting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3001/advertisings")
      .then(res => {
        setData(res.data);
        setError(null);
      })
      .catch(() => {
        setError("שגיאה בטעינת פרסומות");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};
