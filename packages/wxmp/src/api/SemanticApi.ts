import * as util from 'util'
import { AccessToken, AccessTokenApi, ApiConfig } from '@tnwx2/accesstoken'
import { HttpKit } from '@tnwx2/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 语义理解
 */
export class SemanticApi {
  private static searchUrl = 'https://api.weixin.qq.com/semantic/semproxy/search?access_token=%s'

  public static async search(apiConfig: ApiConfig, jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.searchUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }
}
