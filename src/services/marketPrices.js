const API_URL = "https://api.dharun.dev/v1/mandi";

export const REFRESH_INTERVAL = 30 * 60 * 1000;

export async function fetchMarketPrices(
  state = "",
  commodity = ""
) {
  const params = new URLSearchParams({
    limit: "1000"
  });

  if (state) {
    params.set("state", state);
  }

  if (commodity) {
    params.set("commodity", commodity);
  }

  const response = await fetch(
    `${API_URL}?${params.toString()}`,
    {
      signal: AbortSignal.timeout(20000)
    }
  );

  if (!response.ok) {
    throw new Error(
      `Market price service unavailable (${response.status})`
    );
  }

  const result = await response.json();

  const records = [
    result,
    result.records,
    result.data,
    result.prices,
    result.results,
    result.data?.records,
    result.data?.prices
  ].find(Array.isArray);

  if (!records) {
    throw new Error("Unexpected API response format.");
  }

  return records.map((record, index) => ({
    id: index,

    crop:
      record.commodity ??
      record.Commodity ??
      record.crop ??
      "",

    state:
      record.state ??
      record.State ??
      "",

    district:
      record.district ??
      record.District ??
      "",

    market:
      record.market ??
      record.Market ??
      "",

    variety:
      record.variety ??
      record.Variety ??
      "",

    minPrice:
      record.min_price ??
      record.minPrice ??
      record.Min_Price ??
      record.min,

    maxPrice:
      record.max_price ??
      record.maxPrice ??
      record.Max_Price ??
      record.max,

    modalPrice:
      record.modal_price ??
      record.modalPrice ??
      record.Modal_Price ??
      record.modal,

    date:
      record.arrival_date ??
      record.Arrival_Date ??
      record.date ??
      ""
  }));
}

export function formatPrice(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "—";
  }

  return "₹" + price.toLocaleString("en-IN");
}