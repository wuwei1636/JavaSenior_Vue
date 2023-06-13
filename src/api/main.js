import request from '../utils/request'

export const getAllBook = data => {
    return request.post({
        url: '/getAllBook',
        
    })
}

export const getBooks = data => {
    return request.post({
        url: '/getBooks',
        data: data,
        isForm: 'FORM'
    })
}

export const addBook = data => {
    return request.post({
        url: '/addBook',
        data: data,
        isForm: 'FORM'
    })
}


export const deleteBook = data => {
    return request.post({
        url: '/deleteBook',
        data: data,
        isForm: 'FORM'
    })
}

export const changeBook = data => {
    return request.post({
        url: '/changeBook',
        data: data,
        isForm: 'FORM'
    })
}

export const getFields = data => {
    return request.post({
        url: '/getFields',
    })
}

export const getMethods = data => {
    return request.post({
        url: '/getMethods',
    })
}