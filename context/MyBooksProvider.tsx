import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MyBooksContextType = {
  onToggleSaved: (book: Book) => void;
  isBookSaved: (book: Book) => boolean;
  savedBooks: Book[];
};

export const MyBooksContext = createContext<MyBooksContextType>({
  onToggleSaved: () => {},
  isBookSaved: () => false,
  savedBooks: [],
});

type Props = {
  children: ReactNode;
};
const MyBooksProvider = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData(); //load data when application is open
  }, []);

  useEffect(() => {
    if (loaded) {
      persistData(); //load data when application is open
    }
  }, [savedBooks]); //persist data every time it changes

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

  const persistData = async () => {
    //write data from local storage
    await AsyncStorage.setItem("booksData", JSON.stringify(savedBooks));
  };

  const loadData = async () => {
    //read data from local storage
    const dataString = await AsyncStorage.getItem("booksData");
    if (dataString) {
      const items = JSON.parse(dataString);
      setSavedBooks(items);
    }
    setLoaded(true);
  };

  return (
    <MyBooksContext.Provider value={{ onToggleSaved, isBookSaved, savedBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
