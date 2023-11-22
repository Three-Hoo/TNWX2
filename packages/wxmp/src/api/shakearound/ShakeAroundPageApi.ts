import * as util from 'util'
import { AccessToken, AccessTokenApi, ApiConfig } from '@tnwx2/accesstoken'
import { HttpKit } from '@tnwx2/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信摇一摇 页面管理
 */
export class ShakeAroundPageApi {
  private static addPageUrl: string = 'https://api.weixin.qq.com/shakearound/page/add?access_token=%s'
  /**
   * 新增摇一摇出来的页面信息，包括在摇一摇页面出现的主标题、副标题、图片和点击进去的超链接。
   * 其中，图片必须为用素材管理接口上传至微信侧服务器后返回的链接。
   * @param title 在摇一摇页面展示的主标题，不超过6个汉字或12个英文字母
   * @param description 在摇一摇页面展示的副标题，不超过7个汉字或14个英文字母
   * @param pageUrl 跳转链接
   * @param comment 页面的备注信息，不超过15个汉字或30个英文字母
   * @param iconUrl 在摇一摇页面展示的图片。图片需先上传至微信侧服务器，用“素材管理-上传图片素材”接口上传图片，返回的图片URL再配置在此处
   * @param accessToken
   */
  public static async addPage(apiConfig: ApiConfig, title: string, description: string, pageUrl: string, iconUrl: number, comment?: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.addPageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        title: title,
        description: description,
        page_url: pageUrl,
        comment: comment || '',
        icon_url: iconUrl
      })
    )
  }

  private static updatePageUrl: string = 'https://api.weixin.qq.com/shakearound/page/update?access_token=%s'
  /**
   * 编辑页面信息
   * @param pageId 摇周边页面唯一ID
   * @param title 在摇一摇页面展示的主标题，不超过6个汉字或12个英文字母
   * @param description 在摇一摇页面展示的副标题，不超过7个汉字或14个英文字母
   * @param pageUrl 跳转链接
   * @param iconUrl 在摇一摇页面展示的图片。图片需先上传至微信侧服务器，用“素材管理-上传图片素材”接口上传图片，返回的图片URL再配置在此处
   * @param comment 页面的备注信息，不超过15个汉字或30个英文字母
   * @param accessToken
   */
  public static async updatePage(
    apiConfig: ApiConfig,
    pageId: number,
    title: string,
    description: string,
    pageUrl: string,
    iconUrl: number,
    comment?: string,
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.updatePageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        page_id: pageId,
        title: title,
        description: description,
        page_url: pageUrl,
        comment: comment || '',
        icon_url: iconUrl
      })
    )
  }

  private static searchPageUrl: string = 'https://api.weixin.qq.com/shakearound/page/search?access_token=%s'
  /**
   * 查询页面列表
   * @param pageIds 指定页面的id列表
   * @param accessToken
   */
  public static async searchPageByIds(apiConfig: ApiConfig, pageIds: number[], accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.searchPageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        type: 1,
        page_ids: pageIds
      })
    )
  }

  /**
   * 分页查询或者指定范围内的页面时
   * @param begin 页面列表的起始索引值
   * @param count 待查询的页面数量，不能超过50个
   * @param accessToken
   */
  public static async searchPage(apiConfig: ApiConfig, begin: number, count: number, accessToken?: AccessToken) {
    if (begin < 0) begin = 0
    if (count < 1) count = 1
    if (count > 50) count = 50

    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.searchPageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        type: 2,
        begin: begin,
        count: count
      })
    )
  }

  private static deletePageUrl = 'https://api.weixin.qq.com/shakearound/page/delete?access_token=%s'
  /**
   * 删除页面
   * @param pageId 指定页面的id
   * @param accessToken
   */
  public static async deletePage(apiConfig: ApiConfig, pageId: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken(apiConfig)
    }
    let url = util.format(this.deletePageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        page_id: pageId
      })
    )
  }
}
