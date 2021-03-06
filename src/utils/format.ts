// import { join } from "path"

export function parseTime(time: Date, cFormat?: any): string {
    debugger
    if (arguments.length === 0) {

        return "";
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date: Date = time;
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time: Date, option?: string) {
    const d = time
    const now = Date.now()

    const diff = (now - Number(d)) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

export function isExternal(path: string): boolean {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function joinPath(prePath: string, followPath: string): string {
    if (!followPath) {
        return prePath;
    }
    if (prePath.slice(-1) !== '/' && followPath.slice(0, 1) !== '/') {
        return prePath + '/' + followPath;
    }
    if (prePath.slice(-1) === '/' && followPath.slice(0, 1) === '/') {
        return prePath + followPath.slice(1);
    }
    return prePath + followPath;
}