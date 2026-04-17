import React from 'react';
import './RichBackground.css';

const RichBackground = () => {
    return (
        <div className="rich-background">
            {/* Animated gradient blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
            <div className="blob blob-4"></div>

            {/* Gradient mesh overlay */}
            <div className="gradient-mesh"></div>

            {/* Subtle grid pattern */}
            <div className="grid-pattern"></div>

            {/* Radial glow effects */}
            <div className="glow glow-top"></div>
            <div className="glow glow-bottom"></div>
        </div>
    );
};

export default RichBackground;
