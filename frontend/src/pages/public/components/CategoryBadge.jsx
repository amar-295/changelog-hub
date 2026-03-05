import React from 'react';
import PropTypes from 'prop-types';
import { getCategoryConfig } from '../../../config/releaseConfig';

/**
 * Small badge showing the category label + icon.
 */
function CategoryBadge({ category }) {
  const categoryStyle = getCategoryConfig(category);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border tracking-wide ${categoryStyle.badge}`}
    >
      <span className="text-[10px]">{categoryStyle.icon}</span>
      {categoryStyle.label}
    </span>
  );
}

CategoryBadge.propTypes = { category: PropTypes.string.isRequired };

export default CategoryBadge;
