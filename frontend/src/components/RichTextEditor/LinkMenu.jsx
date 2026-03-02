import React from "react";
import PropTypes from "prop-types";
import {
    Link as LinkIcon,
    Check,
    Trash2,
    X,
} from "lucide-react";

const IC = 15;
const IS = 1.8;

function LinkMenu({ isOpen, url, onUrlChange, onSubmit, onRemove, onClose }) {
    if (!isOpen) return null;

    return (
        <div
            className="absolute inset-0 z-10 flex items-center px-3 gap-2"
            style={{
                backgroundColor: "var(--color-bg-elevated)",
                borderTopLeftRadius: "11px",
                borderTopRightRadius: "11px",
            }}
        >
            <LinkIcon size={IC} strokeWidth={IS} className="text-text-muted shrink-0" />
            <form onSubmit={onSubmit} className="flex-1 flex items-center gap-2">
                <input
                    value={url}
                    onChange={(e) => onUrlChange(e.target.value)}
                    className="flex-1 bg-transparent text-text-primary text-[13px] px-2 py-1 outline-none font-medium placeholder:text-text-muted/50"
                    placeholder="Paste or type URL (https://...)"
                />
                <button
                    type="submit"
                    className="p-1.5 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                    title="Save Link"
                >
                    <Check size={IC} strokeWidth={IS} />
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    title="Remove Link"
                >
                    <Trash2 size={IC} strokeWidth={IS} />
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                    title="Cancel"
                >
                    <X size={IC} strokeWidth={IS} />
                </button>
            </form>
        </div>
    );
}

LinkMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    onUrlChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LinkMenu;
