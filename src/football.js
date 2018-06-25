module.exports = (footballPromise, outputCb) => {

    const TEAM = 2;
    const FOR = 7;
    const AGAINST = 9;

    const fdata = {
        for: null,
        agains: null,
        spread: Number.MAX_SAFE_INTEGER,
        team: null
    };

    footballPromise
        .getLinesAndColums()
        .then((lines) => {
            lines.forEach((cols) => {
                if (cols.length < 1 && parseInt(cols[FOR], 10) < 1) {
                    return;
                }
                let spread = parseInt(cols[FOR], 10) - parseInt(cols[AGAINST], 10);
                if (spread < 0) {
                    spread *= -1;
                }
                if (spread < fdata.spread) {
                    fdata.for = parseInt(cols[FOR], 10);
                    fdata.against = parseInt(cols[AGAINST], 10);
                    fdata.team = cols[TEAM];
                    fdata.spread = spread;
                }
            });
            return new Promise((res) => {
                res(fdata);
            });
        })
        .then(outputCb)
        .catch((err) => {
            console.warn('ERROR!', err);
        });
};