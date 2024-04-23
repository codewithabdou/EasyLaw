"use server";

import { buildSearchQuery } from "@helpers/buildSupremeCourtSearch";

async function getSupremeCourtSearchResults(
  search_query: string | undefined,
  decision_number: string | undefined,
  date_range: { from: string | undefined; to: string | undefined },
  decision_subject: string | undefined,
  search_field: string | undefined,
  page: number
) {
  const query = buildSearchQuery(
    search_query,
    decision_number,
    date_range,
    decision_subject,
    search_field,
    page
  );
  try {
    console.log(query);
    const res = await fetch(query, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["supreme-court-search"],
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 750));
    return res.json();
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default getSupremeCourtSearchResults;
