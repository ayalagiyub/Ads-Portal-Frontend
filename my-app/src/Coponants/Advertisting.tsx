import React, { useState, useRef } from 'react';
import axios, { all } from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { addtocart } from '../features/CartSlice';
import { title } from 'process';
import { Button as MUIButton, Card, Typography, Container } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useFetchAllAdverts } from "../hooks/useFetchAllAdverts";


type Advertisting = {
  id: number,
  title: string,
  description: string,
  image_url: string,
  creator_user_id: number,
  created_at: Date
};

type reviews = {
  id: number,
  ad_id: number,
  user_id: number,
  rating: number,
  comment: string,
  created_at: Date
};

type AdvertDetail = {

}

const Advertistings = () => {
  //   const [orders, setOrders] = useState<Order[]>([]);
  const [adverts, setAdverts] = useState<Advertisting[]>([]);
  const [review, setReviews] = useState<reviews[]>([]);

  const idUserConnecr: number = useSelector((state: any) => state.UserSlice.idUser)





  //גיפיטי
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);




  //שליפה לפי חיפוש
  const fetchAdverts = async () => {
    try {
      setLoading(true);
      // אם החיפוש הוא מספר תקין, נחפש לפי ID
      const searchIsNumber = /^\d+$/.test(search.trim());

      const params: any = {
        _page: page,
        _limit: 3,
      };

      if (searchIsNumber) {
        params.id = search.trim();  // חיפוש לפי ID מדויק
      } else if (search.trim() !== "") {
        params.title_like = search.trim();  // חיפוש לפי שם חלקי
      }

      const res = await axios.get("http://localhost:3001/advertisings", {
        params,
      });

      if (page === 1) {
        setAdverts(res.data);
      } else {
        setAdverts((prev) => [...prev, ...res.data]);
      }

      if (res.data.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("שגיאה בשליפת פרסומות:", error);
    }finally{
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchAdverts();
  }, [page, search, category, minPrice, maxPrice]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef.current, hasMore]);



  //   const [IdOrder, SetIdOrder] = useState<any>();
  //   const [agentId, SetagentId] = useState<any>();
  //   const [status, Setstatus] = useState<any>();
  // const [showSupplierOrder, setShowSupplierOrder] = useState(false);
  // const [user, setUser] = useState<any>("user");
  const cart = useSelector((mystore: any) => mystore.CartSlice.cart)
  const emailConnect = useSelector((mystate: any) => mystate.UserSlice.email)
  const dispatch = useDispatch();

  const location = useLocation();


  useEffect(() => {
    fetchAllOrders(); // קריאה לפונקציה בעת טעינת הקומפוננטה
  }, [location.key]);


// const { data: allAdverts, loading: allLoading, error: allError } = useFetchAllAdverts();//hook


//   useEffect(() => {
//   if (location.key && allAdverts.length > 0) {
//     setAdverts(allAdverts); // מציב את התוצאה בסטייט שלך
//   }
// }, [location.key, allAdverts]);


  const userConect = useSelector((mystore: any) => mystore.UserSlice.user)

  // שליפת כל הפרסומות
  function fetchAllOrders() {
    axios.get('http://localhost:3001/advertisings')
      .then(response => {
        setAdverts(response.data);
        console.log(adverts)
      })
      .catch(error => {
        console.error('שגיאה בשליפת כל ההזמנות:', error);
      });
  }


  async function fetchAdvert(id: number): Promise<Advertisting | null> {
    try {
      const response = await axios.get(`http://localhost:3001/advertisings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`שגיאה בתפיסת פרסומת ${id}:`, error);
      return null;
    }
  }




  //מנהל מחיקת פרסומות
  const deleteProduct = (id: number) => {
    try {
      // axios.delete(`http://localhost:3001/advertisings?ad_id=${id}`)
      axios.delete(`http://localhost:3001/advertisings/${id}`)
      setAdverts(prev => prev.filter(ad => ad.id !== id)); // מסיר מהסטייט בזמן אמת
      // fetchAllOrders()
      // const res = await axios.get(`http://localhost:3001/advertisings`);
      // setAdverts(res.data); // מביא את כל הרשימה מחדש
      console.log("sucsess")
    }
    catch (error) {
      console.error(`שגיאה במחיקת פרסומת ${id}:`, error);
    }
  }


  //פרטי מוצר
  const detailAdver = (id: number) => {
    try {
      axios.get(`http://localhost:3001/reviews?ad_id=${id}`)
        .then(response => {
          setAdverts([]);
          setReviews(response.data)
        })
      console.log(review)
    }
    catch (error) {
      console.error(`שגיאה בפרטי פרסומת ${id}:`, error);
    }
  }


  type Advertisting = {
    id: number,
    title: string,
    description: string,
    image_url: string,
    creator_user_id: number,
    created_at: Date
  };
  //הוספת פרסומת למנהל
  const addAdvert = (id: number, title: string, description: string, image_url: string, creator_user_id: number) => {
    const newAdvert = {
      id: id,
      title: title,
      description: description,
      image_url: image_url,
      creator_user_id: creator_user_id,
      created_at: new Date().toISOString()
    };

    axios.post('http://localhost:3001/advertisings', newAdvert)
      .then(response => {
        console.log('newAdvert added:', response.data);
        // רענון הרשימה
        setAdverts(prev => [...prev, response.data]);
      })
      .catch(error => {
        console.error(`שגיאה בהוספת פרסומת חדשה ${id}:`, error);
      });
  };

  const handleDelete = async (rev: any) => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${rev.user_id}`);
      if (emailConnect === res.data.email) {
        console.log(emailConnect)
        await deleteReview(rev.id);
        setReviews(prev => prev.filter(r => r.id !== rev.id)); // הסרה אמיתית מהרשימה
      }
      else {
        console.log("emailConnect" + emailConnect)
        console.log("res.data.email" + res.data.email)
        console.log("user_id: " + rev.user_id)
      }
    } catch (err) {
      console.error("שגיאה במחיקת תגובה:", err);
    }
  };


  //משתמש מחיקת חוות דעת
  const deleteReview = (id: number) => {
    try {
      // axios.delete(`http://localhost:3001/advertisings?ad_id=${id}`)
      axios.delete(`http://localhost:3001/reviews/${id}`)
      // setAdverts(prev => prev.filter(ad => ad.id !== id)); // מסיר מהסטייט בזמן אמת
      // fetchAllOrders()
      // const res = await axios.get(`http://localhost:3001/advertisings`);
      // setAdverts(res.data); // מביא את כל הרשימה מחדש
      setReviews(prev => [...prev]);
      console.log("sucsess")
    }
    catch (error) {
      console.error(`שגיאה במחיקת חוות דעת ${id}:`, error);
    }
  }






  //הוספת תגובה למשתמש
  const addreviews = (id: number, rating: number, comment: string) => {
    const newReview = {
      ad_id: id,
      user_id: Number(idUserConnecr),
      rating: rating,
      comment: comment,
      created_at: new Date().toISOString()
    };

    axios.post('http://localhost:3001/reviews', newReview)
      .then(response => {
        console.log('Review added:', response.data);
        // // רענון הרשימה
        // setReviews(prev => [...prev, response.data]);
      })
      .catch(error => {
        console.error(`שגיאה בהוספת חוות דעת לפרסומת ${id}:`, error);
      });
  };

  // fetchAllOrders();

  return (
    <div className="container p-4 my-4">
      <div className="row mb-3">
        <form
          className="d-flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setHasMore(true);
          }}
        >
          <input
            className="form-control"
            type="text"
            placeholder="חפש לפי ID או שם"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            חפש
          </button>
        </form>
      </div>

      {userConect === "admin" && (
        <form
          className="mb-4 p-3 border rounded shadow animate__animated animate__fadeIn"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;

            const id = parseInt((form.elements.namedItem("id") as HTMLInputElement).value);
            const creator_user_id = parseInt((form.elements.namedItem("creator_user_id") as HTMLInputElement).value);
            const title = (form.elements.namedItem("title") as HTMLInputElement).value;
            const description = (form.elements.namedItem("description") as HTMLInputElement).value;
            const image_url = (form.elements.namedItem("image_url") as HTMLInputElement).value;

            addAdvert(id, title, description, image_url, creator_user_id);
            form.reset();
          }}
        >
          <input name="id" type="number" placeholder="ID" className="form-control mb-2" required />
          <input name="title" type="text" placeholder="כותרת" className="form-control mb-2" required />
          <input name="description" type="text" placeholder="תיאור" className="form-control mb-2" required />
          <input name="image_url" type="text" placeholder="קישור לתמונה" className="form-control mb-2" required />
          <input name="creator_user_id" type="number" placeholder="קישור ID USER" className="form-control mb-2" required />
          <button type="submit" className="btn btn-success">
            הוסף מוצר
          </button>
        </form>
      )}

      {adverts.length > 0 && (
        <div className="row g-4">
          {adverts.map((adver) => (
            <div
              key={adver.id}
              className="col-12 col-md-6 col-lg-4 animate__animated animate__fadeInUp"
            >
              <div className="card shadow-sm h-100">
                <img
                  src={adver.image_url}
                  alt="תמונה של המוצר"
                  className="card-img-top"
                  style={{ cursor: "pointer" }}
                  onClick={() => detailAdver(adver.id)}
                />
                <div className="card-body">
                  <h5 className="card-title">{adver.title}</h5>
                  <p className="card-text">{adver.description}</p>
                  <p><strong>ID יוצר:</strong> {adver.creator_user_id}</p>
                  <p><strong>תאריך יצירה:</strong> {new Date(adver.created_at).toLocaleDateString("he-IL")}</p>

                  {userConect === "user" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const ratingInput = form.elements.namedItem("rating") as HTMLInputElement;
                        const commentInput = form.elements.namedItem("comment") as HTMLInputElement;
                        const rating = parseInt(ratingInput.value);
                        const comment = commentInput.value;
                        addreviews(adver.id, rating, comment);
                        form.reset();
                      }}
                      className="mt-3"
                    >
                      <h6>הוסף חוות דעת</h6>
                      <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        placeholder="דירוג (1–5)"
                        className="form-control mb-2"
                        required
                      />
                      <input
                        type="text"
                        name="comment"
                        placeholder="תגובה"
                        className="form-control mb-2"
                      />
                      <button type="submit" className="btn btn-primary">
                        הוסף
                      </button>
                    </form>
                  )}

                  {userConect === "admin" && (
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => deleteProduct(adver.id)}
                    >
                      מחק את המוצר
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {review.length > 0 && (
        <div className="mt-5">
          {review.map((rev) => (
            <div
              key={rev.id}
              className="border rounded p-3 mb-3 shadow animate__animated animate__fadeIn"
            >
              <p><strong>כותרת:</strong> {rev.ad_id}</p>
              <p><strong>תיאור:</strong> {rev.comment}</p>
              <p><strong>דירוג:</strong> {rev.rating}</p>
              <p><strong>תאריך יצירה:</strong> {new Date(rev.created_at).toLocaleDateString("he-IL")}</p>

              <button
                className="btn btn-outline-primary me-2"
                onClick={async () => {
                  const product = await fetchAdvert(rev.ad_id);
                  if (product) {
                    dispatch(addtocart(product));
                  }
                }}
              >
                הוסף מוצר לסל
              </button>

              <button className="btn btn-outline-danger" onClick={() => handleDelete(rev)}>
                מחק תגובה
              </button>
            </div>
          ))}
        </div>
      )}

      <div ref={loaderRef} />
    </div>
  );
};

export default Advertistings;














//   // סימון הזמנה כבוצעה
//   const markOrderAsComplete = async (orderId: number) => {
//     try {
//       await axios.post(`https://localhost:7212/Market/UpdateToComplete?Id=${orderId}`);
//       alert(`ההזמנה ${orderId} סומנה כהושלמה.`);
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order.orderId === orderId ? { ...order, status: 'הושלמה!' } : order
//         )
//       );
//       setExistingOrders(prevOrders =>
//         prevOrders.map(order =>
//           order.orderId === orderId ? { ...order, status: 'הושלמה!' } : order
//         )
//       );
//     } catch (error) {
//       console.error(`שגיאה בעדכון ההזמנה ${orderId}:`, error);
//     }
//   };

//   // פתיחת הזמנת מוצרים מספק
//   const handleAdditionalAction = () => {
//     setShowSupplierOrder(true);
//   };
