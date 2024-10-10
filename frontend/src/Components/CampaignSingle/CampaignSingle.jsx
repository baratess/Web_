import "./CampaignSingle.css";

const CampaignSingle = () => {
  return (
    <section className="campaign-single">
      <div className="container">
        <div className="campaign-wrapper">
          <h2>Yeni Sezon Satışlarında</h2>
          <strong>%20 İndirim Fırsatı</strong>
          <span></span>
          <a href="#" className="btn btn-lg">
            Hemen Sipariş Ver
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CampaignSingle;
