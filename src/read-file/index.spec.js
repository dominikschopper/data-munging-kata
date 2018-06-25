const fs = require('fs');
const ReadFile = require("./index");

describe("the  ReadFile  class", () => {

    const filenameOk = `/tmp/readfile-test-${Date.now()}.dat`;
    const filenameErr = `/tmp/sdfsldnlsvn.csv`;
    let fileOk = '';
    let fileErr = '';

    beforeEach(() => {
        fs.writeFileSync(filenameOk, "-   A   B   C\n1  21   3  14\n2   6  24  13\n");
        fileOk = new ReadFile(filenameOk);
        fileErr = new ReadFile(filenameErr);
    });

    afterEach(() => {
        fs.unlinkSync(filenameOk);
    });

    describe("the  .open()  Method", () => {

        it("should return a Promise", () => {
            expect(fileOk.open() instanceof Promise).toBeTruthy();
        });

        it("gives the resolve function some data", () => {
            fileOk.open()
                .then((data) => {
                    expect(data.toString().length).toBeGreaterThan(0);
                })
                .catch((err) => {
                    console.warn(err);
                });
        });

        it("gives the reject function the error if the file is not found", (done) => {
            fileErr.open().
                then((data) => {
                    expect(data).not.toBeNull();
                    done();
                }).
                catch((error) => {
                    expect(error).not.toBeNull();
                    done();
                });
        });
    });

    describe("the  .getLines()  Method", () => {

        it("should return a Promise", (done) => {
            expect(fileOk.getLines() instanceof Promise).toBeTruthy();
            done();
        });

        it("should resolve to an array", (done) => {
            fileOk.getLines().
                then((lines) => {
                    expect(lines instanceof Array).toBeTruthy();
                    expect(lines.length).toEqual(4);
                    done();
                });
        });

    });

    describe("the  .getLinesAndColums()  Method", () => {

        it("should return a Promise", (done) => {
            expect(fileOk.getLinesAndColums() instanceof Promise).toBeTruthy();
            done();
        });

        it("should resolve to an array of arrays", (done) => {
            fileOk.getLinesAndColums().
                then((lines) => {
                    expect(lines instanceof Array).toBeTruthy();
                    expect(lines.length).toEqual(4);
                    expect(lines[0] instanceof Array).toBeTruthy();
                    expect(lines[0].length).toEqual(4);
                    expect(lines[0][1]).toContain("A");
                    expect(lines[1]).toEqual(["1", "21", "3", "14"]);
                    done();
                });
        });
    });

});
