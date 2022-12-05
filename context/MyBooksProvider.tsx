import { createContext, useContext, ReactNode, useState } from "react";

export const MyBooksContext = createContext({});

type Props = {
  children: ReactNode;
};
const MyBooksProvider = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  const areBooksTheSame = (a: Book, b: Book) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  const isBookSaved = (book: Book) => {
    return savedBooks.some((savedBook) => areBooksTheSame(savedBook, book));
  };
  const onToggleSaved = (book: Book) => {
    if (isBookSaved(book)) {
      //remove from saved books
      setSavedBooks((books) =>
        books.filter((savedBook) => !areBooksTheSame(savedBook, book))
      );
    } else {
      //add to saved books
      setSavedBooks((books) => [book, ...books]);
    }
  };

  return (
    <MyBooksContext.Provider value={{ onToggleSaved, isBookSaved, savedBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
