import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      rightIcon,
      rightLabel,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {(label || rightLabel) && (
          <div className="flex justify-between items-center ml-1">
            {label && (
              <label
                htmlFor={inputId}
                className="text-text-primary text-[12px] font-semibold tracking-wider uppercase"
              >
                {label}
              </label>
            )}
            {rightLabel && <div className="text-[13px]">{rightLabel}</div>}
          </div>
        )}

        <div className="relative flex items-center group">
          {Icon && (
            <Icon
              className={`absolute left-3.5 w-[18px] h-[18px] pointer-events-none transition-colors ${error ? 'text-red-400' : 'text-text-muted group-focus-within:text-primary'}`}
            />
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
            w-full py-2.5 bg-bg-input border rounded-lg text-[14px] text-text-primary 
            focus:ring-1 outline-none transition-all placeholder-text-muted
            ${Icon ? 'pl-[38px]' : 'pl-3.5'} 
            ${rightIcon ? 'pr-[38px]' : 'pr-3.5'}
            ${
              error
                ? 'border-red-500 focus:ring-red-500 bg-red-500/5'
                : 'border-border focus:border-primary focus:ring-primary hover:border-border-light hover:bg-white/0.08'
            }
            ${className}
          `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <span className="text-red-500 text-[12px] ml-1 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  icon: PropTypes.elementType,
  rightIcon: PropTypes.node,
  rightLabel: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
