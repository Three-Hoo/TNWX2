/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取api_ticket
 */

import * as util from 'util'
import { QyApiConfigKit, AccessToken, QyAccessTokenApi, ApiConfig } from '@tnwx2/accesstoken'
import { ICache } from '@tnwx2/cache'
import { HttpKit } from '@tnwx2/kits'
import { JsTicket } from '../entity/JsTicket'
import { QyJsApiType } from '../Enums'

export class QyJsTicketApi {
  private static getCorpTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=%s'
  private static getAgentTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=%s&type=agent_config'
  /**
   * 获取api_ticket
   * @param type
   */
  public static async getTicket(apiConfig: ApiConfig, type: QyJsApiType) {
    let appId = apiConfig.getAppId
    let corpId = apiConfig.getCorpId
    let key = appId
      .concat(':')
      .concat(corpId)
      .concat(':')
      .concat(type)
    // 从缓存中获取
    let cache: ICache = QyApiConfigKit.getCache
    let jsTicketJson: string = await cache.get(key)
    if (jsTicketJson) {
      const jsTicketInstance = new JsTicket(jsTicketJson)
      if (QyApiConfigKit.isDevMode()) {
        console.debug('缓存中获取api_ticket...')
      }
      if (jsTicketInstance.isAvailable()) {
        return jsTicketInstance
      }
    }
    // 通过接口获取
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    let url: string
    if (type === QyJsApiType.CORP) {
      url = util.format(this.getCorpTicketUrl, accessToken.getAccessToken)
    } else {
      url = util.format(this.getAgentTicketUrl, accessToken.getAccessToken)
    }
    let data = await HttpKit.getHttpDelegate.httpGet(url)
    if (data) {
      data = JSON.stringify(data)
      let jsTicket: JsTicket = new JsTicket(data)
      let cache: ICache = QyApiConfigKit.getCache
      cache.set(key, jsTicket.getCacheJson)
      if (QyApiConfigKit.isDevMode()) {
        console.debug('通过接口获取api_ticket...')
      }
      return jsTicket
    }
  }
}
