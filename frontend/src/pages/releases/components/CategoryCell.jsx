import React from "react";
import PropTypes from "prop-types";
import {
    Sparkles,
    ArrowUpRight,
    Bug,
    Shield,
    MoreHorizontal,
} from "lucide-react";

function CategoryCell({ category }) {
    const categories = {
        feature: { icon: Sparkles, color: "text-blue-400", label: "Feature" },
        improvement: {
            icon: ArrowUpRight,
            color: "text-violet-400",
            label: "Improvement",
        },
        bugfix: { icon: Bug, color: "text-red-400", label: "Bugfix" },
        security: { icon: Shield, color: "text-amber-400", label: "Security" },
        other: { icon: MoreHorizontal, color: "text-gray-400", label: "Other" },
    };
    const c = categories[category] || categories.other;
    const Icon = c.icon;

    return (
        <div className="flex items-center gap-2">
            <Icon size={14} strokeWidth={1.5} className={c.color} />
            <span
                className="text-xs font-bold capitalize"
                style={{ color: "var(--color-text-secondary)" }}
            >
                {c.label}
            </span>
        </div>
    );
}

CategoryCell.propTypes = {
    category: PropTypes.oneOf([
        "feature",
        "improvement",
        "bugfix",
        "security",
        "other",
    ]).isRequired,
};

export default CategoryCell;
