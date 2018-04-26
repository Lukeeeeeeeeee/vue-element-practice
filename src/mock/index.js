import Mock from 'mockjs'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.MloginByUsername)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.MgetUserInfo)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)

export default Mock

