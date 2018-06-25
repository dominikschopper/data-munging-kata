const fs = require("fs");
const os = require("os");

class ReadFile {
    constructor(filename) {
        this.filename = filename;
        this.data = null;
    }

    open() {
        return new Promise((res, rej) => {
            fs.readFile(this.filename, (err, data) => {
                if (err) {
                    rej(err);
                    return;
                }
                this.data = data;
                res(data);
            });
        });
    }

    getLines(separator) {
        const sep = separator || os.EOL;
        return new Promise((res, rej) => {
            this.
                open()
                .then((data) => {
                    res(data.toString().split(sep));
                })
                .catch((err) => {
                    rej(err);
                });
        });
    }

    getLinesAndColums(colSep, lineSep) {
        const cs = colSep || new RegExp("\\s+");
        return new Promise((res, rej) => {
            this.
                getLines(lineSep)
                .then((lines) => {
                    lines.forEach((line, i) => {
                        lines[i] = line.split(cs);
                    });
                    res(lines);
                })
                .catch((err) => {
                    rej(err);
                });
        });
    }
}

module.exports = ReadFile;
