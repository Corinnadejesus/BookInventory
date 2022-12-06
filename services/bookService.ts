export const parseBook = (
  item: any,
  provider: "googleBooksSearch" | "openLibrarySearch"
) => {
  if (provider === "googleBooksSearch") {
    return {
      title: item.volumeInfo.title,
      subtitle: item.volumeInfo.subtitle,
      image: item.volumeInfo.imageLinks?.thumbnail,
      authors: item.volumeInfo.authors,
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
      categories: item.volumeInfo.categories,
      description: item.volumeInfo.description,
      rating: item.volumeInfo.averageRating,
    };
  } else {
    return {
      title: item.title,
      authors: item.author_name,
      image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
      isbn: item.isbn?.[0],
    };
  }
};
