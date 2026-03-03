import React, { useReducer, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

  // Sync URL ?status param → reducer
  useEffect(() => {
    const urlStatus = searchParams.get('status') || '';
    dispatch({ type: 'SET_STATUS_FILTER', payload: urlStatus });
  }, [searchParams]);

  // Fetch releases whenever filter/page/date/refreshKey changes
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const params = { page, limit: 10 };
        if (statusFilter) params.status = statusFilter;
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
  }, [page, statusFilter, dateFilter, refreshKey]);

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
          <ReleasesTable releases={releases} loading={loading} error={error} />
        ) : (
          <ReleasesGrid releases={releases} loading={loading} error={error} />
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
