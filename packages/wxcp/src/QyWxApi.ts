import * as util from 'util'
import { HttpKit } from '@tnwx2/kits'
import { AccessToken, ApiConfig, QyAccessTokenApi } from '@tnwx2/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 企业微信 API 接口
 */
export class QyWxApi {
  private static updateTaskCardUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/message/update_taskcard?access_token=%s'
  /**
   * 更新任务卡片消息状态
   * @param userIds 企业的成员ID列表（消息接收者，最多支持1000个）
   * @param agentId 应用的 agentId
   * @param taskId 发送任务卡片消息时指定的 taskId
   * @param clickedKey 设置指定的按钮为选择状态，需要与发送消息时指定的btn:key一致
   * @param accessToken AccessToken
   */
  public static async updateTaskCard(apiConfig: ApiConfig, userIds: string, agentId: string, taskId: string, clickedKey: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.updateTaskCardUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        userids: userIds,
        agentid: agentId,
        task_id: taskId,
        clicked_key: clickedKey
      })
    )
  }

  private static getApiDomainIpUrl = 'https://qyapi.weixin.qq.com/cgi-bin/get_api_domain_ip?access_token=%s'

  /**
   * 获取企业微信API域名IP段
   */
  public static async getApiDomainIp(apiConfig: ApiConfig, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.getApiDomainIpUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
