import * as util from 'util'
import { HttpKit } from '@tnwx2/kits'
import { AccessToken, AccessTokenApi, ApiConfig } from '@tnwx2/accesstoken'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 长链接转成短链接
 */
export class ShortUrlApi {
  private static apiUrl: string = 'https://api.weixin.qq.com/cgi-bin/shorturl?access_token=%s'

  /**
   * 长链接转成短链接
   * @param json
   * @param accessToken
   */
  public static async getShorturl(apiConfig: ApiConfig, json: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.apiUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, json)
  }

  /**
   * 长链接转成短链接
   * @param longUrl
   * @param accessToken
   */
  public static async longToShort(apiConfig: ApiConfig, longUrl: string, accessToken?: AccessToken) {
    return this.getShorturl(
      apiConfig,
      JSON.stringify({
        action: 'long2short',
        long_url: longUrl
      }),
      accessToken
    )
  }
}
