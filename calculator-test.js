it('should calculate the monthly rate correctly', function () {
  expect(intRate(5)).toBeCloseTo(.0041666, 6);
  expect(intRate(100)).toBeCloseTo(.0833333, 6);
});

it("should calculate the number of payments correctly", function() {
  expect(totalPmts(30)).toEqual(360);
  expect(totalPmts(100)).toEqual(1200);
});

it("should calculate (unrounded) payment correctly", function() {
  expect(payment(0, 1, 1)).toEqual(0);
  expect(payment(100000, 12, .01)).toBeCloseTo(8884.87886783416, 8)
});

it("should return a result with 2 decimal places", function() {
  expect(getRoundedStr(0.009)).toBe('0.01');
  expect(getRoundedStr(1234)).toBe('1234.00')
});