import * as util from 'util'
import * as urlencode from 'urlencode'
import { ApiConfig, ApiConfigKit } from '@tnwx2/accesstoken'
import { HttpKit } from '@tnwx2/kits'
import { ScopeEnum, Lang } from '@tnwx2/commons'

export class SnsAccessTokenApi {
  private static authorizeUrl: string = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s'
  private static accessTokenUrl: string = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code'
  private static refreshTokenUrl: string = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%s&grant_type=refresh_token&refresh_token=%s'
  private static userInfoUrl: string = 'https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=%s'
  private static checkTokenUrl: string = 'https://api.weixin.qq.com/sns/auth?access_token=%s&openid=%s'

  /**
   *  获取授权链接
   *  @param redirectUri 回调地址
   *  @param scope
   *  @param state
   */
  public static getAuthorizeUrl(apiConfig: ApiConfig, redirectUri: string, scope: ScopeEnum, state?: string): string {
    let url = util.format(this.authorizeUrl, apiConfig.getAppId, urlencode(redirectUri), scope)
    if (state) {
      url = url + '&state=' + state
    }
    return url + '#wechat_redirect'
  }
  /**
   *  通过code换取网页授权access_token
   *  @param code
   */
  public static async getSnsAccessToken(apiConfig: ApiConfig, code: string) {
    let url = util.format(this.accessTokenUrl, apiConfig.getAppId, apiConfig.getAppScrect, code)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
  /**
   *  刷新access_token
   *  @param refreshToken
   */
  public static async refreshAccessToken(apiConfig: ApiConfig, refreshToken: string) {
    let url = util.format(this.refreshTokenUrl, apiConfig.getAppId, refreshToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
  /**
   *  检验授权凭证（access_token）是否有效
   *  @param accessToken 通过code换取的access_token
   *  @param openId
   */
  public static async checkAccessToken(accessToken: string, openId: string) {
    let url = util.format(this.checkTokenUrl, accessToken, openId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
  /**
   *  拉取用户信息(需scope为 snsapi_userinfo)
   *  @param accessToken
   *  @param openId
   *  @param lang
   */
  public static async getUserInfo(accessToken: string, openId: string, lang: Lang) {
    let url = util.format(this.userInfoUrl, accessToken, openId, lang)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
