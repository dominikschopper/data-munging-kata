module.exports = (weatherPromise, outputCb) => {
    const DAY = 1;
    const MAX_TEMP = 2;
    const MIN_TEMP = 3;

    const wdata = {
        max: null,
        min: null,
        spread: Number.MAX_SAFE_INTEGER,
        day: null
    };

    weatherPromise
        .getLinesAndColums()
        .then((lines) => {
            lines.forEach((cols) => {
                if (cols.length < 1) {
                    return;
                }
                const spread = cols[MAX_TEMP] - cols[MIN_TEMP];
                if (spread < wdata.spread) {
                    wdata.max = parseFloat(cols[MAX_TEMP]);
                    wdata.min = parseFloat(cols[MIN_TEMP]);
                    wdata.day = cols[DAY];
                    wdata.spread = spread;
                }
                // console.log('cols', cols);
            });
            return new Promise((res) => {
                res(wdata);
            });
        })
        .then(outputCb)
        .catch((err) => {
            console.warn('ERROR!', err);
        });
};