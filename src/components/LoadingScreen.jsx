import React from "react";
import "./LoadingScreen.css";
import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <motion.div
            className="loading-screen"
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="loading-logo-wrapper">
                <div className="loading-logo">MR</div>
            </div>

            <div className="loading-bar-container">
                <div className="loading-bar-fill"></div>
            </div>
        </motion.div>
    );
}
