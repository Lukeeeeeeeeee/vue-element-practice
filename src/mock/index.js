import Mock from 'mockjs'
import loginAPI from './login'
import transactionAPI from './transaction'
import articleAPI from './article'

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.MloginByUsername)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.MgetUserInfo)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 文章相关
Mock.mock(/\article\/list/, 'get', articleAPI.getList)
Mock.mock(/\article\/create/, 'post', articleAPI.createArticle)

export default Mock

