import { useState } from "react";
import {
  NextUIProvider,
  Modal,
  Text,
  Button,
  Card,
  styled,
  Link,
} from "@nextui-org/react";
import { Map } from "./components/Map";
import { ProgramList } from "./components/ProgramList";

import styles from "./App.module.css";

import data from "./data/data";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleAbout, setIsVisibleAbout] = useState(false);
  const [isVisibleError, setVisibleError] = useState(false);
  const [element, setElement] = useState(data.scene);
  const [listTitle, setListTitle] = useState("");

  const today = new Date();

  const getClickID = (event) => {
    const elementID = event.target.getAttribute("id");

    if (elementID === null) return;

    if (elementID.substr(0, 6) === "toilet") return;

    setElement(data[elementID]);

    const titles = [];
    data[elementID].map((lec) =>
      titles.includes(lec.section) ? "" : titles.push(lec.section)
    );

    titles.length === 1
      ? setListTitle(titles[0])
      : (today.getDate = 6 ? setListTitle(titles[0]) : setListTitle(titles[1]));

    setIsVisible(true);
  };

  const myListHandleClick = () => {
    const myLections = JSON.parse(localStorage.getItem("myLections"));

    const sortLection = myLections.sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

    console.log(sortLection);

    if (sortLection === null) {
      return setVisibleError(true);
    } else if (myLections.length === 0) {
      return setVisibleError(true);
    } else {
      setListTitle("Планирую посетить");
      setElement(sortLection);

      setIsVisible(true);
    }
  };

  const aboutHandelPress = () => {
    window.open("https://t.me/lumek", "_blank");
  };

  const getNowLections = () => {
    const now = [];

    for (let i = 0; i < Object.keys(data).length; i++) {
      data[Object.keys(data)[i]].map(
        (lec) =>
          lec.finish.getTime() > today &&
          lec.start.getTime() < today &&
          now.push(
            <Text
              className={styled.text}
            >{`${lec.section}: ${lec.title}`}</Text>
          )
      );
    }
    return now;
  };

  return (
    <NextUIProvider>
      <div className={styles.app}>
        <Map onClick={getClickID} />
        <Button
          color="gradient"
          className={styles.aboutButton}
          auto
          onPress={() => setIsVisibleAbout(true)}
        >
          О карте
        </Button>
        <Button
          color="primary"
          className={styles.myListButton}
          auto
          onPress={myListHandleClick}
        >
          Планирую посетить
        </Button>
        <Card className={styles.marquee}>
          <Card.Header>
            <Text size={12} b>
              Сейчас идет
            </Text>
          </Card.Header>
          <Card.Body className={styles.container}>
            <div className={styles.bMarq}>
              <div className={styles.bMarqText}>
                <div className={styles.bMarqC}>{getNowLections()}</div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Modal
          fullScreen
          closeButton
          aria-labelledby={element}
          open={isVisible}
          onClose={() => setIsVisible(false)}
        >
          <Modal.Header>
            <Text h3 id="modal-title" size={18}>
              {listTitle}
            </Text>
          </Modal.Header>
          <Modal.Body className={styles.modal}>
            <ProgramList
              element={element}
              updateState={setElement}
              listTitle={listTitle}
            />
          </Modal.Body>
        </Modal>
        <Modal
          closeButton
          aria-labelledby="aboutMe"
          open={isVisibleAbout}
          onClose={() => setIsVisibleAbout(false)}
        >
          <Text h3 id="about-title" size={18}>
            Связаться с разработчиком
          </Text>
          <Modal.Body>
            <Text>
              Привет! Меня зовут Михаил, я придумал и разработал эту карту
              за пару дней до феста, чтобы облегчить вашу навигацию и вы могли
              спланировать посещение лекций.
            </Text>
            <Text>
              К сожалению идея пришла слишком поздно. Поэтому я не успел
              реализовать все задуманное 😅
            </Text>
            <Text>
              Если вам понравилась моя разработка и вы хотите предложить
              сотрудничество — пишите в телеграм
            </Text>
            <Button onPress={aboutHandelPress} color="primary">
              Написать
            </Button>
          </Modal.Body>
        </Modal>
        <Modal
          closeButton
          aria-labelledby="user-list"
          open={isVisibleError}
          onClose={() => setVisibleError(false)}
        >
          <Modal.Header>
            <Text h3 id="about-title" size={18}>
              Вы еще не выбрали лекции, куда хотите зайти
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              Чтобы добавить выбрать секции, выберите площадку и добавьте
              интересующие лекции
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button auto onPress={() => setVisibleError(false)}>
              Понял
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </NextUIProvider>
  );
}

export default App;
