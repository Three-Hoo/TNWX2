import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx2/accesstoken'
import { HttpKit } from '@tnwx2/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信摇一摇
 */
export class ShakeAroundApi {
  private static registerUrl: string = 'https://api.weixin.qq.com/shakearound/account/register?access_token=%s'

  /**
   * 申请开通功能
   * @param name 联系人姓名，不超过20汉字或40个英文字母
   * @param phoneNumber 联系人电话
   * @param email 联系人邮箱
   * @param industryId 平台定义的行业代号
   * @param qualificationCertUrls 相关资质文件的图片url，图片需先上传至微信侧服务器，用“素材管理-上传图片素材”接口上传图片，返回的图片URL再配置在此处； 当不需要资质文件时，数组内可以不填写url
   * @param applyReason 申请理由，不超过250汉字或500个英文字母
   * @param accessToken
   */
  public static async register(
    name: string,
    phoneNumber: string,
    email: string,
    industryId: string,
    qualificationCertUrls: string[],
    applyReason?: string,
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.registerUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        name: name,
        phone_number: phoneNumber,
        email: email,
        industry_id: industryId,
        qualification_cert_urls: qualificationCertUrls,
        apply_reason: applyReason || ''
      })
    )
  }

  private static auditStatusUrl: string = 'https://api.weixin.qq.com/shakearound/account/auditstatus?access_token=%s'
  /**
   * 查询审核状态
   * @param accessToken
   */
  public static async auditStatus(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.auditStatusUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static addMaterialUrl: string = 'https://api.weixin.qq.com/shakearound/material/add?access_token=%s'
  /**
   * 上传图片素材
   * @param type Icon：摇一摇页面展示的icon图；License：申请开通摇一摇周边功能时需上传的资质文件；若不传type，则默认type=icon
   * @param filePath 文件路径 图片格式限定为：jpg,jpeg,png,gif。
   * @param accessToken
   */
  public static async addMaterial(type = MaterialType.icon, filePath: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addMaterialUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.upload(
      url,
      filePath,
      JSON.stringify({
        type: type
      })
    )
  }
}

export enum MaterialType {
  icon = 'Icon',
  license = 'License'
}
