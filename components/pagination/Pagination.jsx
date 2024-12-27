import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Pagination({ pageCount, newActivePage }) {
  const router = useRouter();
  const query = router?.query;

  useEffect(() => {
    if (parseInt(router?.query?.p) > pageCount) {
      delete router?.query?.p;
      router.push({ query: router.query });
    }
  }, []);

  let allPaginationListItems = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );

  const [paginationList, setPaginationList] = useState(
    pageCount > 7
      ? [1, 2, 3, 4, 5, 6, "...", pageCount]
      : allPaginationListItems
  );

  const changeIndex = (operation) => {
    if (operation == "+") {
      if (newActivePage != pageCount) {
        if (router.query.p) {
          router.push({
            query: { ...query, p: parseInt(parseInt(router.query.p) + 1) },
          });
        } else {
          router.push({ query: { ...query, p: 2 } });
        }
      }
    } else {
      if (newActivePage != 1) {
        if (parseInt(parseInt(router.query.p) - 1) > 1) {
          router.push({
            query: { ...query, p: parseInt(parseInt(router.query.p) - 1) },
          });
        } else {
          delete router?.query?.p;
          router.push({ query: router.query });
        }
      }
    }
  };

  const getNewList = () => {
    let newList = [];

    if (pageCount > 7) {
      if (newActivePage >= 5) {
        if (pageCount - newActivePage <= 3) {
          newList = [
            1,
            "...",
            pageCount - 4,
            pageCount - 3,
            pageCount - 2,
            pageCount - 1,
            pageCount,
          ];
        } else {
          newList = [
            1,
            "...",
            parseInt(parseInt(router.query.p) - 1),
            parseInt(router.query.p),
            parseInt(parseInt(router.query.p) + 1),
            "...",
            pageCount,
          ];
        }
      } else {
        newList = [1, 2, 3, 4, 5, "...", pageCount];
      }
    } else {
      newList = allPaginationListItems;
    }

    setPaginationList(newList);
  };

  const handleClickItem = (e, index) => {
    if (parseInt(e.target.innerHTML) > 1) {
      router.push({ query: { ...query, p: parseInt(e.target.innerHTML) } });
    } else {
      delete router?.query?.p;
      router.push({ query: router.query });
    }
  };

  useEffect(() => {
    getNewList();
  }, [newActivePage, pageCount]);

  return (
    <div
      className={styles.listItemsContainer}
      style={{ display: pageCount < 2 ? "none" : "block" }}
    >
      <div className={styles.listItemsContainer_box}>
        <div
          className={newActivePage == 1 ? styles.disabled : null}
          onClick={() => changeIndex("-")}
        >
          {"<"}
        </div>
        <ul>
          {paginationList.map((item, index) => {
            return (
              <li
                key={"paginationItem" + index}
                onClick={(e) => {
                  e.target.innerHTML !== "..." &&
                    newActivePage != item &&
                    handleClickItem(e, index);
                }}
                className={
                  //   activeListItemIndex == index ? "listItemActive" : null
                  newActivePage == item ? styles.listItemActive : null
                }
              >
                {item}
              </li>
            );
          })}
        </ul>
        <div
          className={newActivePage == pageCount ? styles.disabled : null}
          onClick={() => changeIndex("+")}
        >
          {">"}
        </div>
      </div>
    </div>
  );
}
