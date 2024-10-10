import { message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adress: "",
    rememberMe: false, // Burayı ekledim çünkü "rememberMe" checkbox var
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const response2 = await fetch(`${apiUrl}/api/users`);
        formData.adress = "?";
        if (response2.ok) {
          const data2 = await response2.json();
          const control = data2.some((item) => item._id === data.id);

          if (control) {
            // Data.id'yi localStorage'a kaydediyoruz
            localStorage.setItem("user", data.id); // "userId" anahtarını kullanarak kaydediyoruz

            message.success("Giriş başarılı.");

            if (data.role === "admin") {
              window.location.href = "/admin";
            } else {
              navigate("/");
            }
          } else {
            message.error("Kullanıcı bulunamadı.");
          }
        } else {
          message.error("Kullanıcı verilerini alırken hata oluştu.");
        }
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
      message.error("Bir hata oluştu.");
    }
  };

  return (
    <section className="account-page">
      <div className="account-container">
        <div className="account-wrapper">
          <section className="login-page">
            <div className="container">
              <div className="login-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <div>
                    <label>
                      <span>
                        Email address <span className="required">*</span>
                      </span>
                      <input
                        type="email"
                        name="email"
                        onChange={handleInputChange}
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
                        name="password"
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <label className="remember-me">
                    <span>Beni Hatırla</span>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="register-link">
        <label>
          Don’t have an account yet?{" "}
          <span>
            <Link to={"/auth/register"}>CREATE NOW!</Link>
          </span>
        </label>
      </div>
    </section>
  );
};

export default Login;
