import service from '@/utils/request'

export function fetchList(query) {
    return service({
        url: '/transaction/list',
        method: 'get',
        params: query
    })
}