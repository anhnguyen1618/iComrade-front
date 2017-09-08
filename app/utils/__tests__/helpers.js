import { convert_to_sqrMeter, truncate, buildQueryParams } from "../helpers.js";

test('Convert from squareFoot to squareMeter', () => {
  expect(convert_to_sqrMeter(50)).toBe(4);
});

test('Truncate correctly', () => {
  expect(truncate("Hello world", 3)).toBe('Hel...');
})


test('build query params correctly', () => {

  const data = {
    "price": { min: 100, max: 400 },
    "area": { min: 100, max: 400 },
    "bedrooms": 1,
    "bathrooms": 1,
    "parking": "yes",
    "location": "sdfsdf"
  }

  const resultData = {
    "minPrice": 100,
    "maxPrice": 400,
    "minArea": 100,
    "maxArea": 400,
    "bedrooms": 1,
    "bathrooms": 1,
    "parking": "yes",
    "location": "sdfsdf"
  }

  expect(buildQueryParams(data)).toEqual(resultData);
})
