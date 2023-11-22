import * as util from 'util'
import { HttpKit } from '@tnwx2/kits'
import { AccessToken, ApiConfig, QyAccessTokenApi } from '@tnwx2/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 应用管理
 */
export class QyAgentApi {
  private static getAgentUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token=%s&agentid=%s'

  /**
   * 获取指定的应用详情
   * @param agentId 应用id
   * @param accessToken AccessToken
   */
  public static async getAgent(apiConfig: ApiConfig, agentId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.getAgentUrl, accessToken.getAccessToken, agentId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static getAgentListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/list?access_token=%s'

  /**
   * 获取access_token对应的应用列表
   * @param accessToken AccessToken
   */
  public static async getAgentList(apiConfig: ApiConfig, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.getAgentListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static setAgentUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/set?access_token=%s'

  /**
   * 设置应用
   * @param agentId 企业应用的id
   * @param name 企业应用名称，长度不超过32个utf8字符
   * @param description 企业应用详情，长度为4至120个utf8字符
   * @param redirectDomain 企业应用可信域名
   * @param isreportenter 是否上报用户进入应用事件。0：不接收；1：接收
   * @param reportLocationFlag 企业应用是否打开地理位置上报 0：不上报；1：进入会话上报
   * @param logoMediaid 企业应用头像的mediaid
   * @param homeUrl 应用主页url
   */
  public static async setAgent(
    apiConfig: ApiConfig,
    agentId: string,
    name?: string,
    description?: string,
    redirectDomain?: string,
    isreportenter = 0,
    reportLocationFlag = 0,
    logoMediaid?: string,
    homeUrl?: string
  ) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    let url = util.format(this.setAgentUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        agentid: agentId,
        name: name,
        description: description,
        logo_mediaid: logoMediaid,
        report_location_flag: reportLocationFlag,
        redirect_domain: redirectDomain,
        isreportenter: isreportenter,
        home_url: homeUrl
      })
    )
  }

  private static createUrl = 'https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token=%s&agentid=%s'

  /**
   * 创建菜单
   * @param agentId 应用id
   * @param jsonData 请求数据
   */
  public static async createMenu(apiConfig: ApiConfig, agentId: string, jsonData: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    let url = util.format(this.createUrl, accessToken.getAccessToken, agentId)
    return HttpKit.getHttpDelegate.httpPost(url, jsonData)
  }

  private static getUrl = 'https://qyapi.weixin.qq.com/cgi-bin/menu/get?access_token=%s&agentid=%s'

  /**
   * 获取菜单
   * @param agentId 应用id
   */
  public static async getMenu(apiConfig: ApiConfig, agentId: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    let url = util.format(this.getUrl, accessToken.getAccessToken, agentId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static deleteUrl = 'https://qyapi.weixin.qq.com/cgi-bin/menu/delete?access_token=%s&agentid=%s'

  /**
   * 删除菜单
   * @param agentId 应用id
   */
  public static async deleteMenu(apiConfig: ApiConfig, agentId: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    let url = util.format(this.deleteUrl, accessToken.getAccessToken, agentId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
