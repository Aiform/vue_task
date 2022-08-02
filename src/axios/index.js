import instance from './instance'
import mockaxios from './mockAxios.js'

// 隔离人员未解除信息分页搜索接口
export const postallpersonnel = (data)=>instance({url:"/allpersonnel",data,method:"post"})
// 隔离人员已解除信息分页接口
export const postrelievedata = (data)=>instance({url:"/relievedata",data,method:"post"})
export const poststranger = (data)=>instance({url:"/stranger",data,method:"post"})
// 疫情速报
export const postepidemicdataranking = (data)=>instance({url:'/epidemicdataranking',data,method:'post'})