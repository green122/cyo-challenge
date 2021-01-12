import { useCallback, useEffect, useReducer } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { clearCache, getCachedData, storeCachedData } from "./caching";

export type RequestBody = any;

const initialState = {
  data: null,
  isLoading: false,
  isCancelled: false,
};

interface IFetchState<T> {
  data: T | null;
  isLoading: boolean;
  isCancelled: boolean;
  error?: AxiosError;
}

interface IResult<T> {
  state: IFetchState<T>;
  // TODO: make args autoinferrable from the request action to more type safety
  start: (...args: any[]) => Promise<T | null>;
  cancel: () => void;
}

export type Response<T> = AxiosResponse<T>;

export type RequestAction<T = unknown> = (...args: any[]) => Promise<T>;

type Action<T> =
  | {
      type: "request";
    }
  | {
      type: "success";
      payload: T;
    }
  | {
      type: "failure";
      payload: AxiosError;
    }
  | {
      type: "cancel";
    };

const dataFetchReducer = <T>() => (
  state: IFetchState<T>,
  action: Action<T>
): IFetchState<T> => {
  switch (action.type) {
    case "request":
      return { ...initialState, isLoading: true };
    case "success":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: undefined,
      };
    case "failure":
      return { ...state, isLoading: false, error: action.payload };
    case "cancel":
      return { ...state, isCancelled: true };
    default:
      return action; // exhaustive
  }
};

interface FetchingOptions {
  invalidateCache?: boolean;
}

function useBaseFetching<T = unknown>(
  action: RequestAction<T>,
  options?: FetchingOptions
): IResult<T> {
  const [state, dispatch] = useReducer(dataFetchReducer<T>(), initialState);

  const fetchData = useCallback(
    async (promise: Promise<T>) => {
      dispatch({ type: "request" });
      try {
        const result = (await promise) as T;
        if (!state.isCancelled) {
          dispatch({ type: "success", payload: result });
        }
        return result;
      } catch (error) {
        if (!state.isCancelled) {
          dispatch({ type: "failure", payload: error });
        }
        return null;
      }
    },
    [state.isCancelled]
  );

  const start = useCallback(
    (...args) => {
      if (options?.invalidateCache) {
        clearCache();
      }
      const promise = action(...args);
      return fetchData(promise);
    },
    // eslint-disable-next-line
    [fetchData]
  );
  const cancel = useCallback(() => dispatch({ type: "cancel" }), []);

  return { state, start, cancel };
}

export function useFetching<T>(
  key: string | (string | number)[],
  action: RequestAction<T>,
  deps: unknown[] = []
) {
  const data: T = getCachedData(key);
  const { state, start, cancel } = useBaseFetching<T>(action);

  useEffect(() => {
    if (data) {
      return;
    }
    start(...deps).then((result) => {
      if (!data && result) {
        storeCachedData(key, result);
      }
    });
    return cancel;
    // eslint-disable-next-line
  }, [start, cancel, ...deps]);
  return data ? { ...state, data } : state;
}
// TODO: add possibility to cache data only for get requests
export function useLazyFetching<T>(action: RequestAction<T>): IResult<T> {
  // TODO: make invalidation optional
  return useBaseFetching<T>(action, { invalidateCache: true });
}
