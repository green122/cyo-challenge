import { convertMillisecondsToDate } from "./date";

describe("Convert milliseconds to date", () => {
  it("should convert correctly", () => {
    const result = convertMillisecondsToDate(1554284950000);
    expect(result).toBe("3.4.2019");
  });

  it("should return placeholder if date is incorrect #1", () => {
    const result = convertMillisecondsToDate("1554284950000,");
    expect(result).toBe("--.--.--");
  });

  it("should return placeholder if date is incorrect #2", () => {
    const result = convertMillisecondsToDate("22-14-18");
    expect(result).toBe("--.--.--");
  });
});
