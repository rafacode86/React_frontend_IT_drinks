import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function usePaginationParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") ?? DEFAULT_PAGE);
  const limit = Number(params.get("limit") ?? DEFAULT_LIMIT);

  const pagination = useMemo(
    () => ({
      page: Number.isNaN(page) ? DEFAULT_PAGE : Math.max(page, 1),
      limit: Number.isNaN(limit) ? DEFAULT_LIMIT : Math.max(limit, 1),
    }),
    [page, limit]
  );

  function updatePagination(next: Partial<typeof pagination>) {
    const merged = { ...pagination, ...next };
    params.set("page", String(merged.page));
    params.set("limit", String(merged.limit));
    setParams(params, { replace: true });
  }

  return { pagination, updatePagination };
}
