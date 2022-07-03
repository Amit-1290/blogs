/**
 * Urls
 */
export class API {

  public static FRONT_URL: string = "http://localhost/blogs/public/";
  public static BASE_URL: string = API.FRONT_URL + "api/v1/";

  /***** Auth API  *****/
  public static LOGIN: string = API.BASE_URL + 'login';
  public static LOGOUT: string = API.BASE_URL + 'logout';
  public static SIGNUP: string = API.BASE_URL + 'signup';

  /***** Blog API  *****/
  public static BLOG_LIST: string = API.BASE_URL + 'blogs';
  public static BLOG_DETAIL: string = API.BASE_URL + 'blogs/view';
  public static STORE_BLOG_DETAIL: string = API.BASE_URL + 'blogs/store';
  public static GET_CATEGORIES: string = API.BASE_URL + 'get-categories';
  public static DELETE_BLOG: string = API.BASE_URL + 'blogs/delete';
}

/**
 * All constants
 */
export class CONSTANTS {

  public static USER_COOKIE = "userData";

  public static EMAIL_PATTERN: '/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/';
}
