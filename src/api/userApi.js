import request from "@/utils/request";

export function login(account, password) {
    return request({
        url: '/auth/login',
        method: 'get',
        params: {
            account,
            password
        }
    })
}
