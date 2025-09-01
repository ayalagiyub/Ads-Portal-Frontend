import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { data, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeUser, changeEmail, changeIdUser } from "../features/UserSlice";
import axios, { all } from 'axios';

const Register = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState<string>("");

  // const userConect = useSelector((mystore: any) => mystore.UserSlice.user)
  const dispatch = useDispatch();
  const idUser = useSelector((state: any) => state.UserSlice.idUser)
  const emailUser = useSelector((state: any) => state.UserSlice.emailUser)

  const addUserToJson = (id: number, email: string) => {
    const newUser = {
      id: id,
      email: email,
      created_at: new Date().toISOString()
    };
    axios.post('http://localhost:3001/users', newUser)
      .then(response => {
        console.log('newAdvert added:', response.data);
      })
      .catch(error => {
        console.error(`שגיאה בהוספת משתמש ${id}:`, error);
      });
  }
  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
      password: Yup.string()
        .required("שדה חובה")
        .min(8, "לפחות 8 תווים")
        .matches(/[A-Z]/, "חייב להכיל לפחות אות גדולה")
        .matches(/[a-z]/, "חייב להכיל לפחות אות קטנה")
        .matches(/[0-9]/, "חייב להכיל לפחות ספרה")
        .matches(/[@$!%*?&]/, "חייב להכיל לפחות תו מיוחד"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "הסיסמאות אינן תואמות")
        .required("אישור סיסמה חובה"),
    }),
    onSubmit: async (values) => {
      setRegisterError("");
      try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        setRegisterSuccess(true);
      } catch (error: any) {
        setRegisterError(error.message);
      }
    },
  });
  useEffect(() => {
    if (registerSuccess) {
      if (formik.values.email == "chaya5887@gmail.com") {
        console.log(formik.values.email)
        dispatch(changeUser("admin"))
        dispatch(changeEmail(formik.values.email))
        addUserToJson(idUser, emailUser)
        dispatch(changeIdUser(idUser + 1))
        // dispatch(changeIdUser())
      }
      else {
        console.log(formik.values.email)
        dispatch(changeUser("user"))
        dispatch(changeEmail(formik.values.email))
        dispatch(changeIdUser(idUser + 1))
        addUserToJson(idUser, formik.values.email)
      }
    }
  }, [registerSuccess])

  if (registerSuccess)
    return (
      <div>
        <h2>הרשמה הצליחה!</h2>
        {/* <p>{userConect}</p> */}
        <p>
          <Link to="/login">לחץ כאן כדי להתחבר</Link>
        </p>
      </div>
    );
  return (
    <div>
      <h2>הרשמה</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div>
          <input
            type="email"
            name="email"
            placeholder="אימייל"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="סיסמה"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="אישור סיסמה"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
          )}
        </div>
        {registerError && <div style={{ color: "red" }}>{registerError}</div>}
        <button type="submit">הרשם</button>
      </form>
    </div>
  );
};

export default Register;
