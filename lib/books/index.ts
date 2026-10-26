import { berdox } from "./berdox";
import type { Book, BookWork } from "./types";

export * from "./types";

export const bookWorks: BookWork[] = [berdox];

export const books: Book[] = bookWorks.flatMap((work) => work.books);