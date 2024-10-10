import "./Policy.css";

const Policy = () => {
  return (
    <section className="policy">
      <div className="container">
        <ul className="policy-list">
          <li className="policy-item">
            <i className="bi bi-truck"></i>
            <div className="policy-texts">
              <strong>ÜCRETSİZ KARGO</strong>
              <span>599 TL ÜZERİ KARGOLAR ÜCRETSİZ</span>
            </div>
          </li>
          <li className="policy-item">
            <i className="bi bi-headset"></i>
            <div className="policy-texts">
              <strong>DESTEK HATTI</strong>
              <span>08.00-17.00 arasında çalışıyoruz</span>
            </div>
          </li>
          <li className="policy-item">
            <i className="bi bi-arrow-clockwise"></i>
            <div className="policy-texts">
              <strong> 30 GÜN İÇİNDE İADE</strong>
              <span>30 gün içerisinde iade garantisi</span>
            </div>
          </li>
          <li className="policy-item">
            <i className="bi bi-credit-card"></i>
            <div className="policy-texts">
              <strong> ÖDEME YÖNTEMİ</strong>
              <span>Kart ile Güvenli Ödeme</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Policy;
