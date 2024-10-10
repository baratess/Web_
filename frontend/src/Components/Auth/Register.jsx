import { useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.username.length < 5 || formData.username.length > 15) {
      return message.error(
        "Kullanıcı adı en az 5, en fazla 15 karakter olmalıdır."
      );
    }

    if (formData.password.length < 10) {
      return message.error("Şifre en az 10 karakter olmalıdır.");
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (response.ok) {
        navigate("/auth/login");
        message.success("Hesabınız oluşturuldu. Giriş yapabilirsiniz.");
      } else if (response.status === 400) {
        message.error("Kullanıcı adı veya e-mail zaten kullanılıyor.");
      } else if (response.status === 409) {
        message.error("Bu e-mail zaten kullanılıyor.");
      } else {
        message.error("Kayıt işlemi sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      message.error("Kayıt yapılırken bir hata oluştu.");
    }
  };

  return (
    <section className="account-page">
      <div className="container">
        <div className="account-wrapper">
          <div className="account-column">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div>
                <label>
                  <span>
                    Username <span className="required">*</span>
                  </span>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="username"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>
                    Email address <span className="required">*</span>
                  </span>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    name="email"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>
                    Password <span className="required">*</span>
                  </span>
                  <input
                    type="password"
                    onChange={handleInputChange}
                    name="password"
                    required
                  />
                </label>
              </div>
              <div className="privacy-policy-text remember">
                <p>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <a href="#">privacy policy.</a>
                </p>
                <button className="btn btn-sm">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="register-link">
        <label>
          Do you have an account?
          {""}
          <Link to={"/auth/login"}> LOG IN NOW!</Link>
        </label>
      </div>
    </section>
  );
};

export default Register;

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_BASE_URL;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${apiUrl}/api/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // const { password, ...rest } = data;

//         localStorage.setItem("user", JSON.stringify(data));
//         navigate("/");
//       } else {
//         message.error("Bu e-mail zaten kullanılıyor.");
//       }
//     } catch (error) {
//       console.log("Giriş hatası:", error);
//       message.error("Kayıt yapılırken bir hata oluştu.");
//     }
//   };

//   return (
//     <div className="account-column">
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>
//             <span>
//               Username <span className="required">*</span>
//             </span>
//             <input
//               type="text"
//               onChange={handleInputChange}
//               name="username"
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             <span>
//               Email address <span className="required">*</span>
//             </span>
//             <input
//               type="email"
//               onChange={handleInputChange}
//               name="email"
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             <span>
//               Password <span className="required">*</span>
//             </span>
//             <input
//               type="password"
//               onChange={handleInputChange}
//               name="password"
//               required
//             />
//           </label>
//         </div>
//         <div className="privacy-policy-text remember">
//           <p>
//             Your personal data will be used to support your experience
//             throughout this website, to manage access to your account, and for
//             other purposes described in our <a href="#">privacy policy.</a>
//           </p>
//           <button className="btn btn-sm">Register</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;
