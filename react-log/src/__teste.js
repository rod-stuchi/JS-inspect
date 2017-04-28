var arr = [{
    id: 1,
    name: "aaaaaaaa \n\r asdfasdfas            dfasdf",
    adfafefefefe: "asdf"
}, {
    id: 2,
    name: "bbbbbb",
    adfafefefefe: "asdf"
}, {
    id: 334,
    namee: "ccccc",
    adfafefefefe: "asdf"
}]

//default column size (unique)
var colSize = arr.map(x => Object.keys(x).join('■')).join('■').split('■')
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map(x => x.toString().length)

//column names (unique)
var colName = arr.map(x => Object.keys(x).join('■')).join('■').split('■')
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map(x => x.toString())

// arr = arr.map(x => Object.values(x).map((v, i) => {
//     let c = colName[i];
//     x = {c:  typeof(v) === "string" ? v.replace(/\r|\n|\s+/g, " ") : v};
// }))

console.table(
arr.map(x => Object.values(x).map((v, i) => {
    let c = colName[i];
	// console.log("C", c)
    // console.log("X", x)
    x[c] = typeof(v) === "string" ? v.replace(/\r|\n|\s+/g, " ") : v;
    console.log("A", x)
    // console.log("Aa", x[c])
}))
)

//biggest length value
arr.map(x => Object.values(x).map((v, i) => {
      colSize[i] < (v ? v.toString().length : -1)
        ? colSize[i] = v.toString().length
        : colSize[i]
    }))

//one big string

//add column name
let table = colName.join("■") + "⛶";
//add divisor line title / data
table += colSize.map(c => Array(c + 1).join("-")).join("■") + "⛶";
//add data
table += arr.reduce((acc, o) => 
    acc + colName.map(c => o[c] ? o[c] : "-").join("■") + "⛶"
, "");

table = table.split("⛶").reduce((acc, line) => 
    acc += line
        .split("■")
        .map((o, i) => 
            isNaN(o)
                //align left
                ? (o + Array(colSize[i] + 1).join(" ")).slice(0, colSize[i]) + " | "
                //align right
                : (Array(colSize[i] + 1).join(" ") + o).slice(colSize[i] * -1) + " | "
        )
        .join("")
        .slice(0, -3) + "\n\r"
, "");

console.log(table);