import { NextParsedUrlQuery } from "next/dist/server/request-meta";

export const urlQueryToRecord = (query: NextParsedUrlQuery) =>
  Object.keys(query).reduce<Record<string, string[]>>((pV, filterName) => {
    const filterValue = Array.isArray(query[filterName])
      ? (query[filterName]?.[0] as string)
      : (query[filterName] as string);
    return filterValue ? { ...pV, [filterName]: filterValue.split(",") } : pV;
  }, {});

export const recordToURLQuery = (record: Record<string, string[]>) =>
  Object.keys(record).reduce((pV, cV, index) => {
    return `${pV}${index === 0 ? "?" : "&"}${cV}=${record[cV].join(",")}`;
  }, "");

export const urlQueryToGraphQLFilters = (query: NextParsedUrlQuery) => {
  const filtersOnURLQuery = urlQueryToRecord(query);
  const filters = Object.keys(filtersOnURLQuery).map(
    (filterName) => `${filterName}:${filtersOnURLQuery[filterName].join(",")}`,
  );
  return filters;
};
