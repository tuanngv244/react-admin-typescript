import queryString from "query-string";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

export const useSearchQuery = <P extends object = any>() => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search) as Partial<P>;
  const [_, setSearchParams] = useSearchParams();

  const _onSetSearchParams = (query?: Partial<P>) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      ...query,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  return {
    searchParams: queryObject,
    _onSetSearchParams,
  };
};
