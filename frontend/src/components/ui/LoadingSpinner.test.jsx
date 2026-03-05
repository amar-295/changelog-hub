import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders without a label', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders a label when provided', () => {
    render(<LoadingSpinner label="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies fullPage class when fullPage is true', () => {
    const { container } = render(<LoadingSpinner fullPage />);
    expect(container.firstChild).toHaveClass('min-h-screen');
  });

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="my-custom" />);
    expect(container.firstChild).toHaveClass('my-custom');
  });
});
