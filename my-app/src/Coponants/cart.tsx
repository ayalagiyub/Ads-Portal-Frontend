// עיצוב חדש עם Bootstrap ואלמנטים מודרניים

import { useSelector } from "react-redux";
// import type { Advertisting } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";
type Advertisting = {
  id: number,
  title: string,
  description: string,
  image_url: string,
  creator_user_id: number,
  created_at: Date
};

const Cart = () => {
  const cart = useSelector((state: any) => state.CartSlice.cart) as Advertisting[];

  return (
    <div className="container mt-5">
      {cart.length > 0 ? (
        <div>
          <h3 className="text-center mb-4">🛒 יש מוצרים בעגלה</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {cart.map((item) => (
              <div key={item.id} className="col">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={item.image_url}
                    className="card-img-top object-fit-cover"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary fw-bold">{item.title}</h5>
                    <p className="card-text text-muted">{item.description}</p>
                    <div className="mt-auto">
                      <small className="text-secondary">
                        מאת משתמש {item.creator_user_id}
                      </small>
                      <br />
                      <small className="text-secondary">
                        נוצר בתאריך: {new Date(item.created_at).toLocaleDateString("he-IL")}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          🛒 עוד לא קנית כלום... לך למלא את הסל!
        </div>
      )}
    </div>
  );
};

export default Cart;






































// import { stat } from "fs";
// import { useSelector, useDispatch } from "react-redux";
// type Advertisting = {
//   id: number,
//   title: string,
//   description: string,
//   image_url: string,
//   creator_user_id: number,
//   created_at: Date
// };



// const Cart=()=>{
//     const cart=useSelector((state:any)=>state.CartSlice.cart) as Advertisting[]
// return <div>
//    {/* {cart.length>0&&
//    <div>יש דברים בעגלה</div>
//    } */}
//    {cart.length > 0 && (
//   <div>
//     <h3>יש דברים בעגלה:</h3>
//     {cart.map(item => (
//       <div key={item.id} className="cart-item">
//         <h4>{item.title}</h4>
//         <p>{item.description}</p>
//         <img src={item.image_url} alt={item.title} width={150} />
//         <p>יוצר: {item.creator_user_id}</p>
//         <p>נוצר בתאריך: {new Date(item.created_at).toLocaleDateString("he-IL")}</p>
//       </div>
//     ))}
//   </div>
// )}
//   {cart.length==0&&
//  <div>
//   <p>עוד לא קנית כלום לך מלא סל</p>
//  </div>
//  }
// </div>
// }
// export default Cart;

















  // return (
  //   <div className="p-4 space-y-6">
  //     <div className="flex gap-4">
  //       <form
  //         onSubmit={(e) => {
  //           e.preventDefault();
  //           setPage(1);
  //           setHasMore(true);
  //         }}
  //       >
  //         <input
  //           type="text"
  //           placeholder="חפש לפי ID או שם"
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //         />
  //         <button type="submit">חפש</button>
  //       </form>


  //       {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={fetchAllOrders}>
  //         כל ההזמנות
  //       </button> */}
  //     </div>
  //     {userConect == "admin" && (
  //       <form onSubmit={(e) => {
  //         e.preventDefault();
  //         const form = e.target as HTMLFormElement;

  //         const id = parseInt((form.elements.namedItem("id") as HTMLInputElement).value);
  //         const creator_user_id = parseInt((form.elements.namedItem("creator_user_id") as HTMLInputElement).value);
  //         // const id = (form.elements.namedItem("id") as HTMLInputElement).value;
  //         const title = (form.elements.namedItem("title") as HTMLInputElement).value;
  //         const description = (form.elements.namedItem("description") as HTMLInputElement).value;
  //         const image_url = (form.elements.namedItem("image_url") as HTMLInputElement).value;
  //         // const creator_user_id = (form.elements.namedItem("creator_user_id") as HTMLInputElement).value;
  //         addAdvert(id, title, description, image_url, creator_user_id);
  //         form.reset(); // מנקה את השדות אחרי ההוספה
  //       }}>
  //         <input
  //           name="id"
  //           type="number"
  //           placeholder="ID"
  //           required
  //         />
  //         <input
  //           name="title"
  //           type="text"
  //           placeholder="כותרת"
  //           required
  //         />
  //         <input
  //           name="description"
  //           type="text"
  //           placeholder="תיאור"
  //           required
  //         />
  //         <input
  //           name="image_url"
  //           type="text"
  //           placeholder="קישור לתמונה"
  //           required
  //         />
  //         <input
  //           name="creator_user_id"
  //           type="number"
  //           placeholder="קישור ID USER"
  //           required
  //         />
  //         <button type="submit">הוסף מוצר</button>
  //       </form>
  //     )}
  //     {adverts.length > 0 && (
  //       <div className="mt-6 space-y-4">
  //         {adverts.map(adver => (
  //           <div key={adver.id} className="border rounded p-4 bg-white shadow">
  //             <p><strong>כותרת</strong> {adver.title}</p>
  //             <p><strong>תיאור</strong> {adver.description}</p>
  //             <p><img src={adver.image_url} alt="תמונה של המוצר" width="500" onClick={() => { (detailAdver(adver.id)) }} /></p>
  //             <p><strong>ID יוצר</strong> {adver.creator_user_id}</p>
  //             <p><strong>תאריך יצירה</strong> {new Date(adver.created_at).toLocaleDateString("he-IL")}</p>
  //             {
  //               (userConect == "user") &&
  //               <form onSubmit={(e) => {
  //                 e.preventDefault();
  //                 const form = e.target as HTMLFormElement;
  //                 const ratingInput = form.elements.namedItem('rating') as HTMLInputElement;
  //                 const commentInput = form.elements.namedItem('comment') as HTMLInputElement;

  //                 const rating = parseInt(ratingInput.value);
  //                 const comment = commentInput.value;
  //                 addreviews(Number(adver.id), rating, comment)
  //                 form.reset();
  //               }}>
  //                 הוסף חוות דעת
  //                 <input type="text" name='rating' placeholder="דירוג (1–5)" min="1" max="5" required />
  //                 <input type="text" name='comment' placeholder='comment' />
  //                 <button type="submit">הוסף</button>
  //               </form>
  //             }
  //             {
  //               (userConect == "admin") &&
  //               <button onClick={() => { deleteProduct(adver.id) }}>מחק את המוצר</button>
  //             }
  //             {/* {userConect === "admin" && (
  //               <form onSubmit={async (e) => {
  //                 e.preventDefault();
  //                 const form = e.target as HTMLFormElement;
  //                 const title = (form.elements.namedItem("title") as HTMLInputElement).value;
  //                 const description = (form.elements.namedItem("description") as HTMLInputElement).value;
  //                 const image_url = (form.elements.namedItem("image_url") as HTMLInputElement).value;

  //                 try {
  //                   const res = await axios.post("http://localhost:3001/advertisings", {
  //                     title,
  //                     description,
  //                     image_url,
  //                     creator_user_id: 1,
  //                     created_at: new Date().toISOString(),
  //                   });
  //                   setAdverts(prev => [res.data, ...prev]); // להוסיף את המוצר החדש לסטייט
  //                   form.reset();
  //                 } catch (error) {
  //                   alert("שגיאה בהוספת מוצר");
  //                 }
  //               }}>
  //                 <input name="title" placeholder="כותרת" required />
  //                 <input name="description" placeholder="תיאור" required />
  //                 <input name="image_url" placeholder="קישור לתמונה" required />
  //                 <button type="submit">הוסף מוצר</button>
  //               </form>
  //             )} */}
  //           </div>
  //         ))}
  //         <div ref={loaderRef}></div>
  //       </div>
  //     )}

  //     {review.length > 0 && (
  //       <div className='review-details'>
  //         {review.map(rev => (
  //           <div key={rev.id} className="border rounded p-4 bg-white shadow">
  //             <p><strong>כותרת:</strong> {rev.ad_id}</p>
  //             <p><strong>תיאור:</strong> {rev.comment}</p>
  //             <p><strong>rating:</strong>{rev.rating}</p>
  //             <p><strong>תאריך יצירה:</strong> {new Date(rev.created_at).toLocaleDateString("he-IL")}</p>
  //             {/* {cart} */}
  //             {/* <button onClick={dispatch(addtocart(fetchAdvert(rev.ad_id)))}>הוסף מוצר לסל</button> */}
  //             {/* <button onClick={async () => {
  //                 const product = await fetchAdvert(rev.ad_id);
  //                 if (product) {
  //                   dispatch(addtocart(product));
  //                 }
  //               }}>
  //                 הוסף מוצר לסל
  //               </button> */}
  //             <button onClick={async () => {
  //               const product = await fetchAdvert(rev.ad_id);
  //               if (product) {
  //                 dispatch(addtocart(product));
  //               }
  //             }}>
  //               הוסף מוצר לסל
  //             </button>

  //             {/* {const res = axios.get(`http://localhost:3001/users/${rev.ad_id}`);
  //               {(emailConnect == res.data.email) && (<button onClick={() => {
  //                 // const product = await fetchAdvert(rev.ad_id);
  //                 // if (product) {
  //                 //   dispatch(addtocart(product));
  //                 // }

  //                 deleteReview(rev.id)
  //                 // setAdverts(prev => [...prev, response.data]);
  //                 setReviews(prev => [...prev])
  //               }}>
  //                 מחק תגובה
  //               </button>
  //               )}} */}
  //             <button onClick={() => handleDelete(rev)}>
  //               מחק תגובה
  //             </button>
  //             {/* {cart} */}
  //           </div>
  //         ))}
  //       </div>
  //     )
  //     }
  //   </div>
  // );


