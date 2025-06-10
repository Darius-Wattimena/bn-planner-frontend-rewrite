import React from "react";
import "./Loading.scss";

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-spinner" />
            <div className="loading-text">Loading...</div>

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}