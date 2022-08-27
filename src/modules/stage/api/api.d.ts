import {UserDTO} from './base';
/**
 * API对象
 */
export declare class MemberApi {
  private httpClient;
  constructor(httpClient: HttpClient);
  /**
   * 根据ID查询用户详情
   */
  memberInfoGET(
    payload: {
      id: string;
    },
    options?: Partial<RequestConfig>
  ): Promise<UserDTO>;
}
/**
 * MemberService
 * 用户服务接口
 */
export declare class MemberService {
  Api: MemberApi;
  constructor(httpClient: HttpClient);
}
