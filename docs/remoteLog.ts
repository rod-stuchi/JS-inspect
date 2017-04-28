function remoteLog(obj: any, title: string = "", sql: boolean = false) : boolean {
    let lClient: WebServiceClient = new WebServiceClient();
    lClient.requestHeaders.setHttpHeader("Content-Type", "application/json");
    lClient.timeout = 60;
    lClient.baseUrl = 'http://172.20.253.71:8080';
    let socket_id = "SnwLhITf5tCTs3mbAAAK";
    
    let post_item = {};

    if (obj instanceof Resultset) {
        let table = (function (resultSet :Resultset) : Array<any> {
                var table = [];
                if (resultSet.hasRows()) {
                    do {
                        let obj = {};
                        for (let j = 0, len = resultSet.getColumnCount(); j < len; j++) {
                            var cname = resultSet.getColumnName(j);
                            obj[cname] = resultSet.getString(cname);
                        }
                        table.push(obj);
                    } while (resultSet.moveToNext())
                }
            resultSet.moveToFirst();
            return table;
        })(obj);

        if (table.length > 0) {
            post_item = {socket_id: socket_id 
                        ,title    : title 
                        ,obj      : table
                        };
        }
    } else {
        post_item = {socket_id: socket_id
                    ,title    : title
                    ,obj      : obj
                    }
        
        if (sql) {
            post_item = Object.assign({}, post_item, {lang: "sql"});
        }
    }

    try {
        lClient.post('/log', JSON.stringify(post_item));
    } catch (error) {}
    
    return true
}