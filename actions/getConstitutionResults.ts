"use server";

import { buildSearchConstitutionQuery } from "@helpers/buildSearchConstitutionLink";

async function getConstitutionResults(
  search_query: string | undefined,
  section_number: string | undefined,
  section_name: string | undefined,
  chapter_number: string | undefined,
  chapter_name: string | undefined,
  article_number: string | undefined,
  page: number
) {
  const query = buildSearchConstitutionQuery(
    search_query,
    section_number,
    section_name,
    chapter_number,
    chapter_name,
    article_number,
    page
  );
  try {
    const res = await fetch(query, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["constitution-search"],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }

  return [];
}

export default getConstitutionResults;
