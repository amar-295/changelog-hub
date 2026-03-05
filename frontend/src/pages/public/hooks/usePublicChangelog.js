import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { publicService } from '../../../services/publicService';

/**
 * Custom hook encapsulating all data fetching and state for the public changelog page.
 *
 * @param {string} subdomain - Workspace subdomain from URL params.
 * @returns {{
 *   workspace: object|null,
 *   releases: Array,
 *   filteredReleases: Array,
 *   loading: boolean,
 *   filter: string,
 *   setFilter: Function,
 *   searchQuery: string,
 *   setSearchQuery: Function,
 *   email: string,
 *   setEmail: Function,
 *   subscribeModal: boolean,
 *   setSubscribeModal: Function,
 *   isSubscribing: boolean,
 *   handleSubscribe: Function,
 * }}
 */
export function usePublicChangelog(subdomain) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // ── Fetch releases ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const fetchReleases = async () => {
      try {
        const result = await publicService.getReleases(subdomain);
        if (cancelled) return;
        if (result.success) {
          setData(result.data);
        } else {
          toast.error(result.message || 'Failed to load changelog');
        }
      } catch (error) {
        if (cancelled) return;
        const msg =
          error.message || 'Network error: Could not reach the server';
        // Expected 404 state; UI handles this gracefully by showing the empty state
        if (msg === 'Workspace not found') {
          return;
        }

        toast.error(msg);
        console.error('Fetch error:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (subdomain) fetchReleases();

    return () => {
      cancelled = true;
    };
  }, [subdomain]);

  // ── Subscribe handler ─────────────────────────────────────────────
  const handleSubscribe = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || isSubscribing) return;

      try {
        setIsSubscribing(true);
        const result = await publicService.subscribe(subdomain, email);

        if (result.success) {
          toast.success(
            result.message || "Subscribed! You'll hear from us soon."
          );
          setEmail('');
          setSubscribeModal(false);
        } else {
          toast.error(result.message || 'Failed to subscribe');
        }
      } catch (error) {
        toast.error(error.message || 'Network error. Please try again.');
      } finally {
        setIsSubscribing(false);
      }
    },
    [email, isSubscribing, subdomain]
  );

  // ── Filtering ─────────────────────────────────────────────────────
  const workspace = data?.workspace ?? null;
  const releases = data?.releases ?? [];

  const filteredReleases = releases.filter((release) => {
    const matchesFilter = filter === 'all' || release.category === filter;
    const matchesSearch =
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    workspace,
    releases,
    filteredReleases,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    email,
    setEmail,
    subscribeModal,
    setSubscribeModal,
    isSubscribing,
    handleSubscribe,
  };
}
