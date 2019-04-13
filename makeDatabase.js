const sqlite3 = require('sqlite3').verbose();
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    format: "plain",
    suffix: "\n",
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    random: Math.random,
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
});

const timeConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const [year, date, month, hour, min, time] = [a.getFullYear(), a.getDate(), a.getMonth(), a.getHours(), a.getMinutes()];
    const converTime = (time) => new String(time).length === 1 ? new String(0) + new String(time) : time;
    const dateString = `${year}-${converTime(month)}-${converTime(date)} ${converTime(hour)}:${converTime(min)}`;
    return dateString;
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const db = new sqlite3.Database('db.db', err => {
    err != undefined ? console.log(err) : console.log(`ok, you're connected`);
});

const DEBUG = true;

db.serialize(() => {
    if (DEBUG) {
        db.run(`CREATE TABLE IF NOT EXISTS ribbon(
        id INTEGER PRIMARY KEY NOT NULL,
        publishDate INTEGER NOT NULL,
        publishDateString TEXT NOT NULL,
        ownerId INTEGER NOT NULL,
        ownerLogin TEXT NOT NULL,
        bulletinSubject TEXT NOT NULL,
        bulletinText TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS ribbon_images(
        id INTEGER PRIMARY KEY NOT NULL,
        ribbon_id INTEGER,
        path TEXT,
        FOREIGN KEY (ribbon_id) REFERENCES ribbon(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS workers(
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        position INTEGER NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS moderation(
        id INTEGER PRIMARY KEY NOT NULL,
        ribbon_id INTEGER,
        workers_id INEGER,
        status TEXT,
        message TEXT,
        FOREIGN KEY (ribbon_id) REFERENCES ribbon(id)
        FOREIGN KEY (workers_id) REFERENCES workers(id)
        )`);
    }

    let isRibbonFull = false;
    if (DEBUG) {
        const ribbon = db.prepare('INSERT INTO ribbon (publishDate,publishDateString,ownerId,ownerLogin,bulletinSubject,bulletinText) VALUES (?, ?, ?, ?, ?, ?)');
        const ribbonOwners = ['Michel', 'Andrew', 'Roman', 'Vladimir', 'Alex', 'Oleg'];
        const bulletinSubjectArray = ['Продам машину', 'Продам квартиру', 'Продам собаку', 'Продам андрея', 'Продам коробку', 'продам чего нибудь', 'Продам телефон', 'Продам айфион', 'Продам ноут', 'Куплю андрея', 'Куплю зарядоку от ноутбука asus vivobook'];
        for (let i = 0; i < 30; i++) {
            const insertData = new Array();
            const publishDate = Math.round((new Date() / 1000) - getRandomInt(0, 100000));
            const publishDateString = timeConverter(publishDate);
            const ownerId = getRandomInt(0, 6) + 1;
            const ownerLogin = ribbonOwners[ownerId - 1];
            const bulletinSubject = bulletinSubjectArray[`${getRandomInt(0, bulletinSubjectArray.length)}`];
            const bulletinText = lorem.generateParagraphs(getRandomInt(1, 10));
            insertData.push(publishDate, publishDateString, ownerId, ownerLogin, bulletinSubject, bulletinText);
            ribbon.run(insertData);
        }
        isRibbonFull = true;
        ribbon.finalize();
    }

    if (DEBUG && isRibbonFull) {
        const ribbonImages = db.prepare('INSERT INTO ribbon_images (ribbon_id, path) VALUES (?, ?)');
        db.each('SELECT count(id) AS cnt FROM ribbon', (err, row) => {
            for (let i = 0; i < row.cnt; i++) {
                for (let j = 0; j < getRandomInt(1, 4); j++) {
                    const ribbonImagesArray = new Array();
                    const ribbon_id = i + 1;
                    const path = `/media/${getRandomInt(0, 14) + 1}.jpg`;
                    ribbonImagesArray.push(ribbon_id, path);
                    console.log(ribbonImagesArray);
                    ribbonImages.run(ribbonImagesArray, (res, err) => console.log(res, err));
                }
            }
            ribbonImages.finalize((err) => console.log(err));
        });
    }
    if (DEBUG) {
        const setWorkers = db.prepare('INSERT INTO workers (name,position) VALUES (?, ?)');
        setWorkers.run(['Roman Pavlovich', 0]);
        setWorkers.run(['Svetlana', 1]);
        setWorkers.finalize();
    }
});

db.close();
