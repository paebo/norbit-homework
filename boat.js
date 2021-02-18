const io = require("socket.io-client");
const socket = io("ws://localhost:5000");
const csv = require("csvtojson");
const lineByLineReader = require("line-by-line");

socket.on("connect", () => {
  lr = new lineByLineReader(`data/line1.csv`);

  lr.on("error", function (err) {
    console.log(`Error message on reading file: ${err}`);
  });

  lr.on("line", function (line) {
    lr.pause();

    csv({
      noheader: true,
      output: "json",
    })
      .fromString(line)
      .then((csvRow) => {
        row = csvRow[0];
        if (row.field1 !== "lat") {
          console.log(csvRow);
          socket.emit("new record", {
            lat: row.field1,
            lon: row.field2,
            heading: row.field3,
          });
        }
      });

    setTimeout(function () {
      lr.resume();
    }, 1000);
  });

  lr.on("end", function () {
    console.log("All lines are read, file is closed now");
  });
});
