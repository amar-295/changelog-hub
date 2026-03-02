import React from "react";
import PropTypes from "prop-types";
import { AlertTriangle, RefreshCw } from "lucide-react";

// ── Error Fallback UI ─────────────────────────────────────────────────────────
function ErrorFallback() {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{ backgroundColor: "var(--color-bg-page, #0f0f0f)" }}
        >
            <div
                className="w-full max-w-md rounded-2xl border p-8 flex flex-col items-center gap-5 text-center"
                style={{
                    backgroundColor: "var(--color-bg-card, #161616)",
                    borderColor: "var(--color-border, rgba(255,255,255,0.08))",
                }}
            >
                {/* Icon */}
                <div
                    className="p-4 rounded-full"
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                >
                    <AlertTriangle
                        size={32}
                        strokeWidth={1.5}
                        className="text-red-400"
                    />
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <h1
                        className="text-xl font-black tracking-tight"
                        style={{ color: "var(--color-text-primary, #ededed)" }}
                    >
                        Something went wrong
                    </h1>
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-text-secondary, #888)" }}
                    >
                        An unexpected error occurred. The error has been logged. You can try
                        reloading the page to recover.
                    </p>
                </div>

                {/* Reload button */}
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: "var(--color-primary, #6366f1)" }}
                >
                    <RefreshCw size={15} strokeWidth={2} />
                    Reload page
                </button>
            </div>
        </div>
    );
}

// ── Error Boundary Class ──────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("[ErrorBoundary] Caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback />;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
