export default function array2Table(arr) {
    //default column size (unique)
    var colSize = arr.map(x => Object.keys(x)).join().split(',')
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map(x => x.toString().length)

    //column names (unique)
    var colName = arr.map(x => Object.keys(x)).join().split(',')
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map(x => x.toString())

    //biggest length value
    //gambi? pode ter um jeito melhor, mas assim é mais simples.
    arr.map(x => Object.values(x).map((v, i) => {
      colSize[i] < v.toString().length
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

    //format line into table
    return table.split("⛶").reduce((acc, line) => 
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
            .slice(0, -3) + "\n"
    , "").trim();
}