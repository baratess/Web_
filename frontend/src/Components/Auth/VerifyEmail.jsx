import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/auth/verify?token=${token}`
        );
        if (response.ok) {
          message.success(
            "E-posta başarıyla doğrulandı. Giriş yapabilirsiniz."
          );
          navigate("/auth/login");
        } else {
          message.error("Doğrulama başarısız oldu veya token geçersiz.");
        }
      } catch (error) {
        console.log("Verification error:", error);
        message.error("Doğrulama sırasında bir hata oluştu.");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, navigate, apiUrl]);

  return <div>Doğrulama yapılıyor, lütfen bekleyin...</div>;
};

export default VerifyEmail;
