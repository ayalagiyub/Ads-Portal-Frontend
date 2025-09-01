import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useSelector } from "react-redux";

const Details = () => {
  const email = useSelector((state: any) => state.UserSlice.email);
  const id = useSelector((state: any) => state.UserSlice.idUser);

  return (
    <div className="container mt-4">
      <div className="card p-3 shadow-sm">
        <h5 className="mb-2">Your Email</h5>
        <p>{email}</p>
      </div>
      <div className="card p-3 shadow-sm mt-3">
        <h5 className="mb-2">Your Id</h5>
        <p>{id}</p>
      </div>
    </div>
  );
};

export default Details;
