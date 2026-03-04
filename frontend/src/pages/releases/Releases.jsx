import React, { useReducer, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { releaseService } from '../../services/releaseService';
import ReleasesHeader from './components/ReleasesHeader';
import ReleasesTable from './components/ReleasesTable';
import ReleasesGrid from './components/ReleasesGrid';
import ReleasesPagination from './components/ReleasesPagination';

// ── Reducer ───────────────────────────────────────────────────────────────────
const initialState = {
  releases: [],
  loading: true,
  error: null,
  page: 1,
  pagination: null,
  statusFilter: '',
  refreshKey: 0,
};

function releasesReducer(state, action) {
  switch (action.type) {
    case 'SET_RELEASES':
      return { ...state, releases: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PAGINATION':
      return { ...state, pagination: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload, page: 1 };
    case 'REFRESH':
      return { ...state, refreshKey: state.refreshKey + 1 };
    default:
      return state;
  }
}

// ── Orchestrator ──────────────────────────────────────────────────────────────
function Releases() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(releasesReducer, initialState);
  const {
    releases,
    loading,
    error,
    page,
    pagination,
    statusFilter,
    refreshKey,
  } = state;

  // UI-only state (not synced to URL)
  const [viewMode, setViewMode] = useState('table');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  const searchQuery = searchParams.get('search') || '';

  // Sync URL ?status param → reducer
  useEffect(() => {
    const urlStatus = searchParams.get('status') || '';
    dispatch({ type: 'SET_STATUS_FILTER', payload: urlStatus });
  }, [searchParams]);

  // Fetch releases whenever filter/page/date/refreshKey/searchQuery changes
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const params = { page, limit: 10 };
        if (statusFilter) params.status = statusFilter;
        if (searchQuery) params.search = searchQuery;
        if (dateFilter.from) params.from = dateFilter.from;
        if (dateFilter.to) params.to = dateFilter.to;
        const response = await releaseService.getAllReleases(params);
        dispatch({
          type: 'SET_RELEASES',
          payload: response.data?.releases || [],
        });
        dispatch({
          type: 'SET_PAGINATION',
          payload: response.data?.pagination || null,
        });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    fetchReleases();
  }, [page, statusFilter, dateFilter, refreshKey, searchQuery]);

  // Actions
  const handleEdit = (release) => {
    navigate(`/releases/${release._id}/edit`, { state: { release } });
  };

  const handlePublishToggle = async (release) => {
    try {
      if (release.status === 'published') {
        await releaseService.unpublishRelease(release._id);
        toast.success('Release unpublished');
      } else {
        await releaseService.publishRelease(release._id);
        toast.success('Release published');
      }
      dispatch({ type: 'REFRESH' });
    } catch (error) {
      toast.error(error.message || 'Failed to update release status');
    }
  };

  const handleDelete = async (release) => {
    if (window.confirm('Are you sure you want to delete this release?')) {
      try {
        await releaseService.deleteRelease(release._id);
        toast.success('Release deleted');
        dispatch({ type: 'REFRESH' });
      } catch (error) {
        toast.error(error.message || 'Failed to delete release');
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ReleasesHeader
        statusFilter={statusFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        dateFilter={dateFilter}
        onDateFilterChange={(f) => {
          setDateFilter(f);
          dispatch({ type: 'SET_PAGE', payload: 1 });
        }}
      />

      {/* Content + Pagination in one bordered card */}
      <div
        className="rounded-xl border overflow-hidden mt-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {viewMode === 'table' ? (
          <ReleasesTable
            releases={releases}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublishToggle={handlePublishToggle}
          />
        ) : (
          <ReleasesGrid
            releases={releases}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublishToggle={handlePublishToggle}
          />
        )}
        <ReleasesPagination
          pagination={pagination}
          page={page}
          onPageChange={(p) => dispatch({ type: 'SET_PAGE', payload: p })}
        />
      </div>
    </div>
  );
}

export { Releases };
export default Releases;
