import { convertMillisecondsToDateString } from "./date";

describe("Convert milliseconds to date", () => {
  it("should convert correctly", () => {
    const result = convertMillisecondsToDateString(1554284950000);
    expect(result).toBe("03.04.2019");
  });

  it("should return placeholder if date is incorrect #1", () => {
    const result = convertMillisecondsToDateString("1554284950000,");
    expect(result).toBe("--.--.--");
  });

  it("should return placeholder if date is incorrect #2", () => {
    const result = convertMillisecondsToDateString("22-14-18");
    expect(result).toBe("--.--.--");
  });
});
