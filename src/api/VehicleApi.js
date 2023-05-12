import request from "@/utils/request";

export function selectVehicles(index, limit) {
    return request({
        url: '/vehicle/select',
        method: 'get',
        params: {
            index,
            limit
        }
    })
}

export function addVehicle(data) {
    return request({
        url: '/vehicle/update',
        method: 'post',
        data: data
    })
}

export function deleteVehicle(id) {
    return request({
        url: '/vehicle/deleteVehicle',
        method: 'get',
        params: {
            id
        }
    })
}
