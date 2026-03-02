import React, { useReducer, useEffect } from "react";
import { releaseService } from "../../services/releaseService";
import CreateReleaseModal from "./CreateReleaseModal";
import ReleasesHeader from "./components/ReleasesHeader";
import ReleasesTable from "./components/ReleasesTable";
import ReleasesPagination from "./components/ReleasesPagination";

// ── Reducer ───────────────────────────────────────────────────────────────────
const initialState = {
  releases: [],
  loading: true,
  error: null,
  page: 1,
  pagination: null,
  statusFilter: "",
  showCreateModal: false,
  refreshKey: 0,
};

function releasesReducer(state, action) {
  switch (action.type) {
    case "SET_RELEASES":
      return { ...state, releases: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_PAGINATION":
      return { ...state, pagination: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "OPEN_MODAL":
      return { ...state, showCreateModal: true };
    case "CLOSE_MODAL":
      return { ...state, showCreateModal: false };
    case "REFRESH":
      return { ...state, refreshKey: state.refreshKey + 1 };
    default:
      return state;
  }
}

// ── Orchestrator ──────────────────────────────────────────────────────────────
function Releases() {
  const [state, dispatch] = useReducer(releasesReducer, initialState);
  const { releases, loading, error, page, pagination, statusFilter, showCreateModal, refreshKey } = state;

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const params = { page, limit: 10 };
        if (statusFilter) params.status = statusFilter;
        const response = await releaseService.getAllReleases(params);
        dispatch({ type: "SET_RELEASES", payload: response.data?.releases || [] });
        dispatch({ type: "SET_PAGINATION", payload: response.data?.pagination || null });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchReleases();
  }, [page, statusFilter, refreshKey]);

  return (
    <>
      <CreateReleaseModal
        isOpen={showCreateModal}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        onSuccess={() => dispatch({ type: "REFRESH" })}
      />
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <ReleasesHeader
          onCreateClick={() => dispatch({ type: "OPEN_MODAL" })}
        />
        <ReleasesTable
          releases={releases}
          loading={loading}
          error={error}
        />
        <ReleasesPagination
          releases={releases}
          pagination={pagination}
          page={page}
          onPageChange={(p) => dispatch({ type: "SET_PAGE", payload: p })}
        />
      </div>
    </>
  );
}

export { Releases };
export default Releases;
