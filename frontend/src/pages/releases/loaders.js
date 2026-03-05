/**
 * Route loaders extracted to their own file so they can be eagerly imported
 * in main.jsx WITHOUT pulling in the heavy React components from the lazy chunks.
 *
 * Pattern: loaders do pure data-fetching only; components stay in lazy chunks.
 */
import { releaseService } from '@/services/releaseService';

/**
 * Loader for /dashboard/releases
 * Fetches the first page of releases before the route renders.
 */
export const releasesLoader = async ({ request }) => {
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || '';
  const search = url.searchParams.get('search') || '';

  try {
    const params = { page: 1, limit: 10 };
    if (status) params.status = status;
    if (search) params.search = search;
    const response = await releaseService.getAllReleases(params);
    return response.data;
  } catch {
    return { releases: [], pagination: null };
  }
};

/**
 * Loader for /releases/:id/edit
 * Fetches the release to edit before the route renders.
 */
export const editReleaseLoader = async ({ params }) => {
  if (!params.id) return null;
  try {
    const response = await releaseService.getReleaseById(params.id);
    return response.data;
  } catch {
    throw new Response('Not Found', { status: 404 });
  }
};
