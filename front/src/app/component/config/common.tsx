export function convDateFormat(dateStr:string, format:string):string {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
    const minute = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
    const sec = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    let retStr = "";

    switch (format) {
        case "YMDhms": retStr = `${year}-${month}-${day} ${hour}:${minute}:${sec}`; break;
        case "YMD": retStr = `${year}-${month}-${day}`; break;
        case "YMD.": retStr = `${year}.${month}.${day}`; break;
        case "hm": retStr = `${hour}:${minute}`; break;
        case "hms": retStr = `${hour}:${minute}:${sec}`; break;
        default: retStr = `${year}-${month}-${day} ${hour}:${minute}:${sec}`; break;
    }

    return retStr;
}