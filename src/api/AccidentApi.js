import request from "@/utils/request";

// 获取状态处理数据
export function accidentHome(state, index, limit) {
    return request({
        url: '/accident/home',
        method: 'get',
        params: {
            state,
            index,
            limit
        }
    })
}

// 获取趋势数据
export function accidentTrend() {
    return request({
        url: '/accident/trend',
        method: 'get'
    })
}

// 获取状态数据
export function accidentState() {
    return request({
        url: '/accident/state',
        method: 'get'
    })
}

// 获取ax
export function accidentAx(accidentId) {
    return request({
        url: '/accident/ax',
        method: 'get',
        params: {
            accidentId
        }
    })
}

// 获取ax
export function accidentAy(accidentId) {
    return request({
        url: '/accident/ay',
        method: 'get',
        params: {
            accidentId
        }
    })
}

// 获取ax
export function accidentInfo(index, limit) {
    return request({
        url: '/accident/getPage',
        method: 'get',
        params: {
            index,
            limit
        }
    })
}

// 获取事故车辆信息
export function getAccidentVehicle(accidentId) {
    return request({
        url: '/accident/getAccidentVehicle',
        method: 'get',
        params: {
            accidentId
        }
    })
}

// 获取事故详细信息
export function getAccidentDetails(accidentId) {
    return request({
        url: '/accident/getAccidentDetails',
        method: 'get',
        params: {
            accidentId
        }
    })
}

// 获取事故地址信息
export function getAccidentAddress(accidentId) {
    return request({
        url: '/accident/getAccidentAddress',
        method: 'get',
        params: {
            accidentId
        }
    })
}

// 更新事故状态
export function updateAccidentState(state, accidentId) {
    return request({
        url: '/accident/updateState',
        method: 'get',
        params: {
            state,
            accidentId
        }
    })
}
