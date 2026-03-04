import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { subscriberService } from '../../services/subscriberService';
import Input from '../../components/ui/Input';

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await subscriberService.getAllSubscribers({
        page,
        limit: 10,
        status: 'active',
      });
      setSubscribers(response.data?.subscribers || []);
      setPagination(response.data?.pagination || null);
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this subscriber?'))
      return;
    try {
      await subscriberService.deleteSubscriber(id);
      toast.success('Subscriber removed successfully');
      fetchSubscribers();
    } catch (error) {
      toast.error('Failed to remove subscriber');
    }
  };

  // Basic client-side filtering since backend doesn't have a search param yet
  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Subscribers
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Manage people who receive updates from your changelog.
          </p>
        </div>
        <div className="w-full md:w-[300px]">
          <Input
            icon={Search}
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="overflow-x-auto min-h-[400px] flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="animate-pulse flex flex-col items-center gap-3">
                <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Loading subscribers...
                </span>
              </div>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
              <div
                className="p-4 rounded-full"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: 'var(--color-primary)',
                }}
              >
                <Mail size={32} strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p
                  className="font-bold text-lg"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  No subscribers found
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {searchQuery
                    ? 'Try adjusting your search query.'
                    : 'Share your public changelog to get your first subscriber.'}
                </p>
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
                  <th
                    className="px-6 py-4 text-[13px] font-semibold"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Email Address
                  </th>
                  <th
                    className="px-6 py-4 text-[13px] font-semibold"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Subscribed On
                  </th>
                  <th
                    className="px-6 py-4 text-[13px] font-semibold text-right"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber._id}
                    className="border-b last:border-0 transition-colors hover:brightness-110"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: 'rgba(129, 140, 248, 0.15)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          <span className="font-bold text-sm uppercase">
                            {subscriber.email.charAt(0)}
                          </span>
                        </div>
                        <span
                          className="font-medium"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {subscriber.email}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {new Date(subscriber.subscribedAt).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Remove Subscriber"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        {pagination && pagination.totalPages > 1 && (
          <div
            className="p-4 border-t flex items-center justify-between"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border)',
            }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Showing page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-md border disabled:opacity-30 transition-colors hover:bg-white/5"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-md border disabled:opacity-30 transition-colors hover:bg-white/5"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subscribers;
