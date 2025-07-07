import React, { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

export default function ShopifyThemeDetector(props) {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    // Use API endpoint from props
    const API_ENDPOINT = props.apiEndpoint || "https://free-shopify-theme-detector-wxjm.vercel.app/api/detect"

    const isValidUrl = (string) => {
        try {
            // Add https:// if no protocol is provided
            const urlToTest = string.startsWith('http') ? string : `https://${string}`;
            const url = new URL(urlToTest);
            
            // Check if it has a valid domain structure
            return url.hostname.includes('.') && url.hostname.length > 3;
        } catch (_) {
            return false;
        }
    }

    const handleDetect = async () => {
        setError(null)
        setResult(null)

        if (!url.trim()) {
            setError("Please enter a Shopify store URL")
            return
        }

        if (!isValidUrl(url)) {
            setError("Please enter a valid URL (e.g., example.com or https://example.com)")
            return
        }

        setLoading(true)

        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: url.trim() }),
            })

            const data = await response.json()

            if (data.success) {
                setResult(data.data)
            } else {
                setError(
                    data.error?.message || "Detection failed, please try again"
                )
            }
        } catch (err) {
            console.error("Detection error:", err)
            setError(
                "Network error, please check your connection and try again"
            )
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !loading) {
            handleDetect()
        }
    }

    return (
        <div className="detector-container">
            <style jsx>{`
                .detector-container {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 24px 20px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    text-align: center;
                }
                
                .input-container {
                    display: flex;
                    gap: 0;
                    max-width: 600px;
                    margin: 0 auto 24px;
                }
                
                .input-field {
                    flex: 1;
                    padding: 16px 20px;
                    font-size: 16px;
                    border: 2px solid #E5E5E5;
                    border-radius: 12px 0 0 12px;
                    border-right: none;
                    outline: none;
                    background-color: #FFFFFF;
                    color: #333333;
                    transition: border-color 0.2s;
                }
                
                .input-field:focus {
                    border-color: #465467;
                }
                
                .detect-button {
                    padding: 16px 32px;
                    font-size: 18px;
                    font-weight: 600;
                    background-color: #1D1E20;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 0 12px 12px 0;
                    cursor: pointer;
                    transition: all 0.2s;
                    min-width: 120px;
                }
                
                .detect-button:hover {
                    background-color: #333333;
                }
                
                .detect-button:disabled {
                    background-color: #666666;
                    cursor: not-allowed;
                }
                
                .error-message {
                    background-color: #FEE;
                    border: 1px solid #FCC;
                    border-radius: 8px;
                    padding: 12px 20px;
                    color: #C00;
                    font-size: 14px;
                    max-width: 600px;
                    margin: 0 auto 24px;
                }
                
                .results-container {
                    background-color: #F8F8F8;
                    border-radius: 12px;
                    padding: 16px 24px;
                    max-width: 600px;
                    margin: 0 auto;
                    text-align: left;
                    border: 1px solid #E5E5E5;
                }
              
                .results-title {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: #1D1E20;
                }
                
                .theme-section {
                    margin-bottom: 24px;
                }
                
                .theme-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                
                .theme-status {
                    font-size: 20px;
                }
                
                .theme-name {
                    background-color: #1D1E20;
                    color: #FFFFFF;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 16px;
                    font-weight: 600;
                }
                
                .confidence-bar {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                }
                
                .confidence-label {
                    font-size: 16px;
                    color: #666666;
                    min-width: 80px;
                }
                
                .confidence-progress {
                    flex: 1;
                    height: 8px;
                    background-color: #E5E5E5;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .confidence-fill {
                    height: 100%;
                    background-color: #1D1E20;
                    border-radius: 4px;
                    transition: width 0.3s ease;
                }
                
                .confidence-value {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1D1E20;
                    min-width: 40px;
                }
                
                .no-shopify {
                    color: #666666;
                    font-size: 16px;
                    margin-bottom: 24px;
                }
                
                .info-section {
                    border-top: 1px solid #E5E5E5;
                    padding-top: 20px;
                }
                
                .info-text {
                    font-size: 14px;
                    color: #666666;
                    margin-bottom: 8px;
                }
                
                .customization-badge {
                    display: inline-block;
                    background-color: #F59E0B;
                    color: #FFFFFF;
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 600;
                    margin-top: 8px;
                }
                
                @media (max-width: 1000px) {
                    .input-container {
                        flex-direction: column;
                        gap: 12px;
                    }
                    
                    .input-field {
                        border-radius: 12px;
                        border-right: 2px solid #E5E5E5;
                    }
                    
                    .detect-button {
                        border-radius: 12px;
                    }
                    
                    .theme-info {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }
                    
                    .confidence-bar {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }
                    
                    .confidence-label {
                        min-width: auto;
                    }
                    
                    .confidence-progress {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="input-container">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Paste a Shopify store URL here..."
                    className="input-field"
                    disabled={loading}
                />
                <button
                    onClick={handleDetect}
                    disabled={loading}
                    className="detect-button"
                >
                    {loading ? "Detecting..." : "Detect"}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {result && (
                <div className="results-container">
                    <h2 className="results-title">Detection Results</h2>

                    {result.isShopify ? (
                        <div className="theme-section">
                            <div className="theme-info">
                                <span className="theme-status">✅</span>
                                <span>Shopify Store using</span>
                                <span className="theme-name">
                                    {result.theme || 'Unknown Theme'}
                                </span>
                            </div>
                            
                            <div className="confidence-bar">
                                <span className="confidence-label">Confidence:</span>
                                <div className="confidence-progress">
                                    <div 
                                        className="confidence-fill"
                                        style={{ width: `${result.confidence || 0}%` }}
                                    ></div>
                                </div>
                                <span className="confidence-value">{result.confidence || 0}%</span>
                            </div>
                            
                            {result.hasCustomizations && (
                                <div className="customization-badge">
                                    Custom modifications detected
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="theme-info">
                            <span className="theme-status">❌</span>
                            <p className="no-shopify">
                                Not a Shopify store - This website uses a different ecommerce platform.
                            </p>
                        </div>
                    )}

                    <div className="info-section">
                        {result.timestamp && (
                            <p className="info-text">
                                <strong>Detected at:</strong>{" "}
                                {new Date(result.timestamp).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// Framer property controls
addPropertyControls(ShopifyThemeDetector, {
    apiEndpoint: {
        title: "API Endpoint", 
        type: ControlType.String,
        defaultValue: "https://free-shopify-theme-detector-wxjm.vercel.app/api/detect",
    },
})
