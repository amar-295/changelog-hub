import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';
import { Mail } from 'lucide-react';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState title="No results" description="Try a different search." />
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try a different search.')).toBeInTheDocument();
  });

  it('renders with an icon', () => {
    const { container } = render(<EmptyState icon={Mail} title="Empty" />);
    // lucide-react renders an SVG
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders an action element when provided', () => {
    render(
      <EmptyState title="Nothing here" action={<button>Create one</button>} />
    );
    expect(
      screen.getByRole('button', { name: 'Create one' })
    ).toBeInTheDocument();
  });

  it('does not render description if not provided', () => {
    render(<EmptyState title="Empty" />);
    expect(
      screen.queryByText('Try a different search.')
    ).not.toBeInTheDocument();
  });
});
