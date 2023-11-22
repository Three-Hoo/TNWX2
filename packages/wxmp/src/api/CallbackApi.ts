import * as util from 'util'
import { AccessToken, AccessTokenApi, ApiConfig } from '@tnwx2/accesstoken'
import { HttpKit } from '@tnwx2/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信服务器
 */
export class CallbackApi {
  private static apiUrl: string = 'https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=%s'
  /**
   * 获取微信服务器IP地址
   * @param accessToken
   */
  public static async getCallbackIp(apiConfig: ApiConfig, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.apiUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static checkUrl: string = 'https://api.weixin.qq.com/cgi-bin/callback/check?access_token=%s'
  /**
   * 网络检测
   * @param action    执行的检测动作，允许的值：dns（做域名解析）、ping（做ping检测）、all（dns和ping都做）
   * @param operator  指定平台从某个运营商进行检测，允许的值：CHINANET（电信出口）、UNICOM（联通出口）、CAP（腾讯自建出口）、DEFAULT（根据ip来选择运营商）
   * @param accessToken
   */
  public static async check(apiConfig: ApiConfig, action: CheckAction = CheckAction.ALL, operator: CheckOperator = CheckOperator.DEFAULT, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.checkUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        action: action,
        check_operator: operator
      })
    )
  }
}

export enum CheckAction {
  DNS = 'dns',
  PING = 'ping',
  ALL = 'all'
}

export enum CheckOperator {
  CHINANET = 'CHINANET',
  UNICOM = 'UNICOM',
  CAP = 'CAP',
  DEFAULT = 'DEFAULT'
}
