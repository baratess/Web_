import "./CampaignItem.css";

const CampaignItem = () => {
  return (
    <div className="campaign-item">
      <h3 className="campaign-title">
        SINIRLI SÜRE İLE GEÇERLİ <br />
        OLMAK ÜZERE SEÇİLİ <br />
        ÜRÜNLERİMİZİN
      </h3>
      <p className="campaign-desc">TAMAMINDA %20 İNDİRİM VAR.</p>
      <a href="#" className="btn btn-primary">
        Tümünü Gör <i className="bi bi-arrow-right"></i>
      </a>
    </div>
  );
};

export default CampaignItem;
