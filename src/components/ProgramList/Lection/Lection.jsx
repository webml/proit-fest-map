import { Button, Text } from "@nextui-org/react";

import styles from "./Lection.module.css";
import { useState } from "react";

export const Lection = ({ lection, updateState, listTitle }) => {
  const [include, setInclude] = useState(false);

  const myLections = JSON.parse(localStorage.getItem("myLections"));

  const getIndex = (myLections, lection) => {
    const index = myLections.findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(lection)
    );
    return index;
  };

  const includeLection = (myLections, lection) => {
    if (getIndex(myLections, lection) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const updateMyLections = (lection) => {
    const myLections = JSON.parse(localStorage.getItem("myLections"));

    const updStorage = (obj) => {
      const serialLections = JSON.stringify(obj);
      return localStorage.setItem("myLections", serialLections);
    };

    if (myLections === null) {
      const lections = [];
      lections.push(lection);
      setInclude(true);
      return updStorage(lections);
    }

    if (includeLection(myLections, lection)) {
      myLections.splice(getIndex(myLections, lection), 1);
      setInclude(false);

      listTitle === "Планирую посетить" && updateState(myLections);
      return updStorage(myLections);
    }

    myLections.push(lection);
    setInclude(true);
    return updStorage(myLections);
  };

  const getHours = (date) => {
    if (typeof date === "string") {
      return new Date(date).getHours();
    } else {
      return date.getHours();
    }
  };

  const getMinutes = (date) => {
    if (typeof date === "string") {
      return new Date(date).getMinutes();
    } else {
      return date.getMinutes();
    }
  };

  return (
    <div className={styles.container}>
      <Text className={styles.time}>
        {getHours(lection.start)}:
        {getMinutes(lection.start) === 0 ? "00" : getMinutes(lection.start)}
        {" — "}
        {getHours(lection.finish)}:
        {getMinutes(lection.finish) === 0 ? "00" : getMinutes(lection.finish)}
      </Text>
      <div>
        {listTitle === "Планирую посетить" && (
          <Text className={styles.location}>{lection.section}</Text>
        )}
        <Text className={styles.title}>{lection.title}</Text>
        {lection.desc !== undefined && (
          <Text className={styles.desc}>{lection.desc}</Text>
        )}
        {lection.authors.map((author) => (
          <div className={styles.author} key={author.name}>
            {author.name !== "" && <Text>{author.name}</Text>}
            {author.position !== "" && (
              <Text className={styles.position} size="$xs">
                {author.position}
              </Text>
            )}
          </div>
        ))}
        {myLections !== null &&
        (includeLection(myLections, lection) || include) ? (
          <Button light color="error" onClick={() => updateMyLections(lection)}>
            Удалить из планов
          </Button>
        ) : (
          <Button
            light
            color="primary"
            onClick={() => updateMyLections(lection)}
          >
            Добавить в планы
          </Button>
        )}
      </div>
    </div>
  );
};
