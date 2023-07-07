import { Text } from "@nextui-org/react";
import { Lection } from "./Lection/";

import styles from "./ProgramList.module.css";

export const ProgramList = ({ element, updateState, listTitle }) => {
  const titles = [];

  element.map((lec) =>
    titles.includes(lec.section) ? "" : titles.push(lec.section)
  );

  const now = new Date();

  const finished = [
    <Text h3 key="finished">
      Закончились
    </Text>,
  ];
  const going = [
    <Text h3 key="going">
      Сейчас
    </Text>,
  ];
  const next = [
    <Text h3 key="next">
      Дальше
    </Text>,
  ];
  const onSaturday = [
    <Text h3 key="onSaturday">
      {"Суббота"}
    </Text>,
  ];
  const onSunday = [
    <Text h3 key="onSunday">
      {listTitle === "Планирую посетить"
        ? "Воскресенье"
        : titles.length > 1
        ? `Воскресенье, ${titles[1]}`
        : "Воскресенье"}
    </Text>,
  ];

  const filterLection = (lection) => {
    const getTime = (date) => {
      if (typeof date === "string") {
        return new Date(date).getTime();
      } else {
        return date.getTime();
      }
    };

    const getDay = (date) => {
      if (typeof date === "string") {
        return new Date(date).getDay();
      } else {
        return date.getDay();
      }
    };

    if (getTime(lection.finish) < now) {
      return finished.push(
        <Lection
          listTitle={listTitle}
          lection={lection}
          key={lection.title}
          updateState={updateState}
        />
      );
    }

    if (getTime(lection.start) < now) {
      return going.push(
        <Lection
          listTitle={listTitle}
          lection={lection}
          key={lection.title}
          updateState={updateState}
        />
      );
    }

    switch (getDay(lection.start)) {
      case now.getDay():
        next.push(
          <Lection
            listTitle={listTitle}
            lection={lection}
            key={lection.title}
            updateState={updateState}
          />
        );
        break;

      case 6:
        onSaturday.push(
          <Lection
            listTitle={listTitle}
            lection={lection}
            key={lection.title}
            updateState={updateState}
          />
        );
        break;

      case 0:
        onSunday.push(
          <Lection
            listTitle={listTitle}
            lection={lection}
            key={lection.title}
            updateState={updateState}
          />
        );
        break;

      default:
        break;
    }
  };

  element.map((lection) => filterLection(lection));

  return (
    <div className={styles.programList}>
      {finished.length > 1 && finished}
      {going.length > 1 && going}
      {next.length > 1 && next}
      {onSaturday.length > 1 && onSaturday}
      {onSunday.length > 1 && onSunday}
    </div>
  );
};
