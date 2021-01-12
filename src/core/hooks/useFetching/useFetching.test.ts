import { renderHook, act } from "@testing-library/react-hooks";
import { clearCache } from "./caching";
import { useFetching } from "./useFetching";
describe("useFetching hook", () => {
  afterEach(clearCache);
  it("should return isLoading flag set to true, then data from promise", async () => {
    const fakeResponse = {
      data: "someData;",
    };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetching("key", () => Promise.resolve(fakeResponse))
    );

    expect(result.current).toEqual({
      isLoading: true,
      isCancelled: false,
      data: null,
    });

    await waitForNextUpdate();
    expect(result.current).toEqual(
      expect.objectContaining({ isLoading: false, data: fakeResponse })
    );
  });

  it("should return isLoading flat set to true, then error from promise", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetching("key", () => Promise.reject(new Error("some error")))
    );

    expect(result.current).toEqual(
      expect.objectContaining({ isLoading: true, data: null })
    );

    await waitForNextUpdate();
    expect(result.current).toEqual(
      expect.objectContaining({
        isLoading: false,
        data: null,
        error: Error("some error"),
      })
    );
  });

  it("should return the same value from the cache", async () => {
    const fakeResponse = {
      data: "someData;",
    };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetching("key", () => Promise.resolve(fakeResponse))
    );
    await waitForNextUpdate();
    expect(result.current).toEqual(
      expect.objectContaining({ isLoading: false, data: fakeResponse })
    );

    const { result: secondResult } = renderHook(() =>
      useFetching("key", () => Promise.resolve(fakeResponse), ["key2"])
    );
    expect(secondResult.current).toEqual(
      expect.objectContaining({ isLoading: false, data: fakeResponse })
    );
  });

  it("should rerequest data when cache data is expired", async () => {
    let dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => 100000);

    const fakeResponse = {
      data: "someData;",
    };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetching("key", () => Promise.resolve(fakeResponse), ["key1"])
    );
    await waitForNextUpdate();
    expect(result.current).toEqual(
      expect.objectContaining({ isLoading: false, data: fakeResponse })
    );

    dateNowSpy.mockImplementation(() => 100000 + 4 * 60 * 1000);
    // rerender with another key to force hook to refetch
    const {
      result: secondResult,
      waitForNextUpdate: waitSecond,
    } = renderHook(() =>
      useFetching("key", () => Promise.resolve(fakeResponse), ["key2"])
    );

    await waitSecond();
    expect(secondResult.current).toEqual(
      expect.objectContaining({ isLoading: false, data: fakeResponse })
    );

    dateNowSpy.mockClear();
  });
});
