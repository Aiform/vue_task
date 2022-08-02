/*
对外暴露本地存储
*/

// 对外暴露一个token
export const setToken = (token)=>{
	localStorage.setItem('TOKEN',token)
}
// 对外暴露管理员名称信息
export const adminName = (data)=>{
	localStorage.setItem('ADMINNAME',data)
}
// 对外暴露管理员头像
export const userPic = (data)=>{
	localStorage.setItem('USERPIC',data)
}
// 对外暴漏管理员手机号
export const Phone = (data)=>{
	localStorage.setItem('PHONE',data)
}
// 对外暴漏管理员邮箱
export const Email = (data)=>{
	localStorage.setItem('EMAIL',data)
}
// 对外暴漏管理员姓名
export const Name = (data)=>{
	localStorage.setItem('NAME',data)
}
//对外暴漏管理员角色
export const Role = (data)=>{
	localStorage.setItem('ROLE',data)
}
// 对外暴漏管理员地址
export const Address = (data)=>{
	localStorage.setItem('ADDRESS',data)
}
// 对外暴漏管理员性别
export const Sex = (data)=>{
	localStorage.setItem('SEX',data)
}
// 对外暴漏管理员备注
export const Remarks = (data)=>{
	localStorage.setItem('REMARKS',data)
}
// 对外暴露管理员id
export const Id = (data)=>{
	localStorage.setItem('ID',data)
}
