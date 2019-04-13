const sqlite3 = require('sqlite-sync');

const getRibbonLimited = () => {
    const db = sqlite3.connect('db.db');
    const prepeareRibbonLimit = sqlite3.run('SELECT * FROM ribbon WHERE id NOT IN (SELECT ribbon_id FROM moderation) LIMIT 10 ');
    const ribbonAPILimit = Object.keys(prepeareRibbonLimit).map(el => {
        const curr = prepeareRibbonLimit[el];
        curr['bulletInImages'] = sqlite3.run(`SELECT path FROM ribbon_images WHERE ribbon_id = ${curr.id}`);
        curr['bulletInImages'] = curr.bulletInImages.map(img => img['path']);
        for (let index in curr) {
            if (curr.hasOwnProperty(index)) {
                if (index === 'publishDateString') {
                    const [date, time] = curr[index].split(' ');
                    const dateInDateFormat = new Date(date);
                    const today = new Date();
                    const diffTime = Math.abs(today.getTime() - dateInDateFormat.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const msg = `${time}, ${diffDays} дней назад`;
                    curr[index] = msg;
                }
                if(index === 'bulletinText') {
                    curr[index] = curr[index].split(/[\r\n]+/);
                }
                curr[index] = Array.isArray(curr[index]) ? curr[index] : curr[index];
            }
        }
        return curr;
    });
    db.close();
    return ribbonAPILimit;
}

const insertValuesInModerationTable = (arr) => {
    const db = sqlite3.connect('db.db');
    const data = arr.map(el => {
        return Object.keys(el).reduce((acc,key,idx) => [...acc, el[key]], []);
    });
    data.forEach(el => {
        sqlite3.run('INSERT INTO moderation (ribbon_id, workers_id, status, message) VALUES(?,?,?,?)', el);
    });
    db.close();
};

module.exports = {
    'ribbonAPIlimited': getRibbonLimited,
    'insertToModeration': insertValuesInModerationTable
}