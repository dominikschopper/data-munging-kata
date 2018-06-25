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

}

module.exports = ReadFile;
