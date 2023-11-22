import * as util from 'util'
import { HttpKit } from '@tnwx2/kits'
import { AccessToken, ApiConfig, QyAccessTokenApi } from '@tnwx2/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 素材管理
 */
export class QyMediaApi {
  private static uploadUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=%s&type=%s'

  /**
   * 上传临时素材
   * @param mediaType 媒体文件类型
   * @param filePath 文件路径
   * @param accessToken AccessToken
   */
  public static async upload(apiConfig: ApiConfig, mediaType: QyMediaType, filePath: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.uploadUrl, accessToken.getAccessToken, mediaType)
    return HttpKit.getHttpDelegate.upload(url, filePath)
  }

  private static uploadImgUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/uploadimg?access_token=%s'

  /**
   * 上传图片
   * @param filePath 文件路径
   * @param accessToken AccessToken
   */
  public static async uploadImg(apiConfig: ApiConfig, filePath: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.uploadImgUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.upload(url, filePath)
  }

  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s'

  /**
   * 获取临时素材
   * @param mediaId 媒体文件id
   * @param accessToken AccessToken
   */
  public static async get(apiConfig: ApiConfig, mediaId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.getUrl, accessToken.getAccessToken, mediaId)
    return HttpKit.getHttpDelegate.httpGet(url, {
      headers: { 'Content-type': 'application/json' },
      responseType: 'arraybuffer'
    })
  }

  private static jssdkMediaUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/get/jssdk?access_token=%s&media_id=%s'

  /**
   * 获取高清语音素材
   * @param mediaId 媒体文件id
   * @param accessToken AccessToken
   */
  public static async jssdkMedia(apiConfig: ApiConfig, mediaId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.jssdkMediaUrl, accessToken.getAccessToken, mediaId)
    return HttpKit.getHttpDelegate.httpGet(url, {
      headers: { 'Content-type': 'application/json' },
      responseType: 'arraybuffer'
    })
  }
}

export enum QyMediaType {
  IMAGE = 'image',
  VOICE = 'voice',
  VIDEO = 'video',
  FILE = 'file'
}
