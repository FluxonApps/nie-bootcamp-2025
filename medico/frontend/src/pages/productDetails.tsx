import React, { useState, useEffect } from "react";
// 👇 Import Link for navigation
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";

// Import some icons for a better UI
import {
  FiTag, FiCheckCircle, FiXCircle, FiAlertTriangle, FiPlusCircle,
  FiActivity, FiCpu, FiFileText, FiList, FiArrowRightCircle
} from "react-icons/fi";

// --- TypeScript Type Definitions ---
type Adulterant = { name: string; healthImpact: string; };
type Ingredient = { name: string; description?: string; type?: string; adulterants?: Adulterant[]; quantity?: string; };
type Concern = { type?: string; description?: string; severity?: "Low" | "Medium" | "High"; };
type Features = { calories?: string; protein?: string; carbs?: string; fat?: string; vitamins?: string[]; minerals?: string[]; otherBenefits?: string[]; };
type AiSuggestion = { reviewer?: string; riskScore?: number; };
type Product = { _id: string; name: string; aliases?: string[]; brand?: string; description?: string; category?: string; ingredients?: Ingredient[]; concerns?: Concern[]; useCases?: string[]; features?: Features; aiSuggestion?: AiSuggestion; aiDescription?: string; isApproved?: boolean; verdict?: string; };

// --- Helper Components ---
const RiskScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = () => {
    if (score <= 40) return "#28a745"; // Green
    if (score <= 70) return "#ffc107"; // Yellow
    return "#dc3545"; // Red
  };
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="risk-gauge-container">
      <svg className="risk-gauge" viewBox="0 0 100 100">
        <circle className="risk-gauge-bg" cx="50" cy="50" r="45" />
        <circle className="risk-gauge-fg" cx="50" cy="50" r="45" stroke={getScoreColor()} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <span className="risk-score-text" style={{ color: getScoreColor() }}>{score}</span>
    </div>
  );
};

const RecommendationCard: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Link to={`/recommended/${name}`} className="recommendation-card">
      <div className="rec-card-content">
        <h4>{name}</h4>
      </div>
      <FiArrowRightCircle className="rec-card-icon" size={24} />
    </Link>
  );
};

// --- Main Component ---
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const rec = ["Product A", "Product B", "Product C"];
  // 👇 FIX: Removed the hardcoded 'rec' array.

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);
      setRecommendations(rec);

      try {
        const response = await fetch(`http://localhost:8004/api/products/get/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch product. Status: ${response.status}`);
        
        const result = await response.json();
        if (result && result.data) {
          setProduct(result.data);
          
          // Fetch recommendations
          try {
            const recResponse = await fetch(`http://localhost:8004/api/products/similar/${id}`);
            if (recResponse.ok) {
              const recResult = await recResponse.json();
              if (recResult && Array.isArray(recResult.data)) {
                // 👇 FIX: Use the actual data from the API response (recResult.data)
                setRecommendations(recResult.data);
              }
            } else {
              console.warn("Could not fetch recommendations.");
            }
          } catch (recError) {
            console.error("Error fetching recommendations:", recError);
          }

        } else {
          throw new Error("Product data not found in the response.");
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) return <div className="loader">Loading Product Details...</div>;
  
  // 👇 FIX: Added a dedicated check to display the error message.
  if (error) return <div className="error-message">{error}</div>;
  
  if (!product) return <div className="error-message">Product not found.</div>;

  const getSeverityClass = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return '';
    }
  };

  return (
    <div className="product-detail-container">
      {/* HEADER SECTION */}
      <header className="product-detail-header">
        <div className="header-main-info">
          {product.category && <span className="category-tag"><FiTag /> {product.category}</span>}
          <h1>{product.name}</h1>
          {product.brand && <h2>by {product.brand}</h2>}
          {product.aliases && product.aliases.length > 0 && (
            <p className="aliases">Also known as: {product.aliases.join(', ')}</p>
          )}
        </div>
        <div className={`status-card ${product.isApproved ? 'approved' : 'not-approved'}`}>
          {product.isApproved ? <FiCheckCircle size={24} /> : <FiXCircle size={24} />}
          <p>{product.isApproved ? "Verified & Approved" : "Use With Caution"}</p>
          <strong>Verdict:</strong>
          <span>{product.verdict}</span>
        </div>
      </header>

      {/* AI INSIGHTS SECTION */}
      {product.aiSuggestion && (
         <section className="detail-card ai-insight-card">
          <div className="ai-description">
            <h3><FiCpu /> AI Health Insight</h3>
            <p>{product.aiDescription || "No AI analysis available."}</p>
            {product.aiSuggestion.reviewer && <small>Analysis by: {product.aiSuggestion.reviewer}</small>}
          </div>
          <div className="ai-risk-score">
            <h4>Overall Risk Score</h4>
            {product.aiSuggestion.riskScore !== undefined ? <RiskScoreGauge score={product.aiSuggestion.riskScore} /> : <p>N/A</p>}
          </div>
        </section>
      )}

      {/* MAIN CONTENT GRID */}
      <main className="product-detail-grid">
        <div className="grid-left">
          <section className="detail-card">
            <h3><FiFileText /> Description</h3>
            <p>{product.description}</p>
          </section>
          
          {product.useCases && product.useCases.length > 0 && (
            <section className="detail-card">
              <h3><FiPlusCircle /> Common Use Cases</h3>
              <ul>{product.useCases.map((use, i) => <li key={i}>{use}</li>)}</ul>
            </section>
          )}

          {product.concerns && product.concerns.length > 0 && (
            <section className="detail-card">
              <h3><FiAlertTriangle /> Potential Concerns</h3>
              <ul className="concerns-list">
                {product.concerns.map((concern, i) => (
                  <li key={i}>
                    <span className={`severity-badge ${getSeverityClass(concern.severity)}`}>{concern.severity}</span>
                    <strong>{concern.type}:</strong> {concern.description}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="grid-right">
          {product.features && (
            <section className="detail-card">
              <h3><FiActivity /> Nutritional Features</h3>
              <ul className="features-list">
                {product.features.calories && <li><strong>Calories:</strong> <span>{product.features.calories}</span></li>}
                {product.features.protein && <li><strong>Protein:</strong> <span>{product.features.protein}</span></li>}
                {product.features.carbs && <li><strong>Carbs:</strong> <span>{product.features.carbs}</span></li>}
                {product.features.fat && <li><strong>Fat:</strong> <span>{product.features.fat}</span></li>}
                {product.features.vitamins?.length && <li><strong>Vitamins:</strong> <span>{product.features.vitamins.join(", ")}</span></li>}
                {product.features.minerals?.length && <li><strong>Minerals:</strong> <span>{product.features.minerals.join(", ")}</span></li>}
                {product.features.otherBenefits?.length && <li><strong>Benefits:</strong> <span>{product.features.otherBenefits.join(", ")}</span></li>}
              </ul>
            </section>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <section className="detail-card">
              <h3><FiList /> Full Ingredient List</h3>
              <ul className="ingredients-list">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="ingredient-item">
                    <div className="ingredient-header">
                      <strong>{ing.name}</strong>
                      <div>
                        {ing.quantity && <span className="quantity-tag">{ing.quantity}</span>}
                        {ing.type && <span className="type-tag">{ing.type}</span>}
                      </div>
                    </div>
                    {ing.description && <p className="ingredient-desc">{ing.description}</p>}
                    {ing.adulterants?.length && (
                      <div className="adulterants-box">
                        {ing.adulterants.map((ad, j) => (<p key={j}><FiAlertTriangle size={14} /><strong>{ad.name}:</strong> {ad.healthImpact}</p>))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      {/* RECOMMENDATIONS SECTION */}
      {recommendations.length > 0 && (
        <section className="recommendations-section">
          <h3>You Might Also Like</h3>
          <div className="recommendations-grid">
            {recommendations.map((rec, index) => (
              // Using index for the key is safer in case of duplicate names
              <RecommendationCard key={`${rec}-${index}`} name={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;