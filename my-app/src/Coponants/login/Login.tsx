import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser, changeEmail } from "../../features/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
      password: Yup.string().required("שדה חובה"),
    }),
    onSubmit: async (values) => {
      setLoginError("");
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        if (formik.values.email == "chaya5887@gmail.com") {
          console.log(formik.values.email)
          dispatch(changeUser("admin"))
          dispatch(changeEmail(formik.values.email))
        }
        else {
          console.log(formik.values.email)
          dispatch(changeUser("user"))
          dispatch(changeEmail(formik.values.email))
        }
        // כניסה הצליחה - נווט לדף הבית
        navigate("/home");
      } catch (error: any) {
        console.log("מייל")
        console.log(values.email)
        console.log("סיסמא")
        console.log(values.password)
        setLoginError("אימייל או סיסמה שגויים");
      }
    },
  });

  return (
    <div>
      <h2>התחברות</h2>
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
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
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
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
        </div>
        {loginError && <div style={{ color: "red" }}>{loginError}</div>}
        <button type="submit">התחבר</button>
      </form>
      <p>
      <Link to="/register">עדיין לא רשום? לחץ כדי להירשם</Link>
      </p>
    </div>
  );
};

export default Login;
