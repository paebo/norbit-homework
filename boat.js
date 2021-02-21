const io = require("socket.io-client");
const socket = io("http://localhost:5001");
const csv = require("csvtojson");
const lineByLineReader = require("line-by-line");

let recordingSection = 1;

socket.on("connect", () => {
  lr = new lineByLineReader(`data/line${recordingSection}.csv`);

  lr.on("error", (err) => {
    console.log(`Error message on reading file: ${err}`);
  });

  lr.on("line", (line) => {
    lr.pause();

    csv({
      noheader: true,
      output: "json",
    })
      .fromString(line)
      .then((csvRow) => {
        row = csvRow[0];
        if (row.field1 !== "lat") {
          socket.emit("new record", {
            lat: row.field1,
            lon: row.field2,
            heading: row.field3,
          });
        }
      });

    setTimeout(() => {
      lr.resume();
    }, 1000);
  });

  lr.on("end", () => {
    console.log("All lines were read, file is closed now");
    process.exit();
  });
});
