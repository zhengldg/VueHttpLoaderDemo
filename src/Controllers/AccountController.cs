//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using Boanda.Core.Helper;
using Boanda.Core.Logging;
using Boanda.Core.Security;
using Boanda.DSJPT.Core.Entity;
using Boanda.DSJPT.Data.Services.Log;
using Boanda.UserManager.Dto.Exntension;
using Boanda.UserManager.IService;
using Boanda.Web;
using Boanda.Web.Controllers;
using Boanda.Web.Models;
using Newtonsoft.Json;
using System;
using System.Drawing;
using System.IO;
using System.Web.Mvc;
using System.Web.Security;

namespace Boanda.DSJPT.EntryWeb.Controllers
{
    /// <summary>
    /// Class AccountController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    [AllowAnonymous]
    public class AccountController : BaseController
    {
        const string RZMK = "RMS";

        /// <summary>
        /// The i user manager application service
        /// </summary>
        private IUserManagerAppService iUserManagerAppService;

        public ILogService iLogService;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="iUserManagerAppService">The i user manager application service.</param>
        public AccountController(IUserManagerAppService iUserManagerAppService, ILogService iLogService)
        {
            this.iUserManagerAppService = iUserManagerAppService;
            this.iLogService =  iLogService;
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Logins this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Login()
        {
            var loginModel = new LoginModel();
            //var cookie = HttpContext.Request.Cookies.Get("RememberMe");
            //if (cookie != null)
            //{
            //    loginModel = Newtonsoft.Json.JsonConvert.DeserializeObject<LoginModel>(cookie.Value);
            //}

            ViewBag.LoginModel = loginModel;
            Rsa();
            return View();
        }

        /// <summary>
        /// RSAs this instance.
        /// </summary>
        [NonAction]
        private void Rsa()
        {
            var rsaE = string.Empty;
            var rsaM = string.Empty;
            RsaHelper.BuildeRem(out rsaE, out rsaM);
            ViewBag.RsaE = rsaE;
            ViewBag.RsaM = rsaM;
        }

        /// <summary>
        /// Logins the specified login model.
        /// </summary>
        /// <param name="loginModel">The login model.</param>
        /// <returns>ActionResult.</returns>
        [AllowAnonymous]
        [HttpPost]

        public ActionResult Login(LoginModel loginModel)
        {
            string msg = string.Empty;
            if (ModelState.IsValid)
            {
                if ("KaiQiYanZhengMa".Config() == "true")
                {
                    if (Session["verifyCode"] == null)
                    {
                        msg = "验证码过期！";
                    }
                    else if (Session["verifyCode"].ToString().ToLower() != loginModel.VerifyCode.ToLower())
                    {
                        msg = "验证码输入错误！";
                    }
                }

                if (string.IsNullOrEmpty(msg))
                {
                    var pwd = RsaHelper.Decrypt(loginModel.Password);

                    string strPwdType = ConfigHelper.AppSettings("SecurityType");
                    if (strPwdType.Trim() == "EncryptedDes")
                    {
                        pwd = DesHelper.Encrypt(pwd);
                    }

                    var userInfo = iUserManagerAppService.Login(loginModel.UserName, pwd, SystemId);
                    if (userInfo == null)
                    {
                        msg = "用户名或密码错误！";
                    }
                    else if (userInfo.User.SFYX != "1")
                    {
                        msg = "无效用户名！";
                    }
                    else
                    {
                        LogFactory.LoginLogger.Info(string.Format("用户登录：{0}", loginModel.UserName), loginModel.UserName, "******", base.ClientIpAddress);
                        FormsAuthentication.SetAuthCookie(userInfo.User.Id, true);
                        return Redirect(Url.Action("Index", "Index"));
                    }
                }
            }

            if (!string.IsNullOrEmpty(msg))
            {
                ModelState.AddModelError("LoginFailed", msg);
            }

            Rsa();
            return View();
        }

        private T_COMN_LOG GetLogEntity()
        {
            return new T_COMN_LOG()
            {
                XH = Guid.NewGuid().ToString(),
                CZSJ = DateTime.Now,
                QQLJ = Request.Url.PathAndQuery,
                JQDZ = WebHelper.GetClientIpAddress(),
                MK = RZMK
            };
        }

        /// <summary>
        /// Logins the ajax.
        /// </summary>
        /// <param name="loginModel">The login model.</param>
        /// <returns>JsonResult.</returns>
        [AllowAnonymous]
        [HttpPost]
        public JsonResult LoginAjax(LoginModel loginModel)
        {
            string msg = string.Empty;
            string password = string.Empty;
            T_COMN_LOG logEntity = GetLogEntity();
            if ("KaiQiYanZhengMa".Config() == "true")
            {
                if (Session["verifyCode"] == null)
                {
                    msg = "验证码过期！";
                }
                else if (Session["verifyCode"].ToString().ToLower() != loginModel.VerifyCode.ToLower())
                {
                    msg = "验证码输入错误！";
                }
            }

            if (string.IsNullOrEmpty(msg))
            {
                var pwd = RsaHelper.Decrypt(loginModel.Password);

                string strPwdType = ConfigHelper.AppSettings("SecurityType");
                if (strPwdType.Trim() == "EncryptedDes")
                {
                    pwd = DesHelper.Encrypt(pwd);
                }
                var userInfo = iUserManagerAppService.Login(loginModel.UserName, pwd, SystemId);
                if (userInfo == null)
                {
                    msg = "用户名或密码错误！";
                }
                else if (userInfo.User.SFYX != "1")
                {
                    msg = "无效用户名！";
                }
                else
                {
                    FormsAuthentication.SetAuthCookie(userInfo.User.Id, true);
                    logEntity.CZLX = ActionTypes.登录成功.ToString();
                    logEntity.RZLX = LogTypes.行为日志.ToString();
                    logEntity.QQCS = JsonConvert.SerializeObject(loginModel);
                    logEntity.CZR = logEntity.CJR = loginModel.UserName;
                    this.iLogService.Log(logEntity);
                }
            }

            if (!string.IsNullOrEmpty(msg))
            {
                logEntity.CZLX = ActionTypes.登录失败.ToString();
                logEntity.RZLX = LogTypes.行为日志.ToString();
                logEntity.QQCS = JsonConvert.SerializeObject(loginModel);
                logEntity.CZR = logEntity.CJR = loginModel.UserName;
                logEntity.MESSAGE = msg;
                this.iLogService.Log(logEntity);
            }

            var rsaE = string.Empty;
            var rsaM = string.Empty;
            RsaHelper.BuildeRem(out rsaE, out rsaM);

            return Json(new { result = string.IsNullOrEmpty(msg), e = rsaE, m = rsaM, msg = msg});
        }

        /// <summary>
        /// Verifies the code.
        /// </summary>
        /// <returns>ActionResult.</returns>
        [AllowAnonymous]
        [HttpGet]
        public ActionResult VerifyCode()
        {
            var verifyCode = ImageHelper.Instance.CreateVerifyCode(4, 0);
            ImageHelper.Instance.FontSize = 13;
            Session["verifyCode"] = verifyCode.ToUpper();
            Bitmap bitmap = ImageHelper.Instance.CreateImage(verifyCode);
            MemoryStream ms = new MemoryStream();
            bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
            var bytes = ms.GetBuffer();
            ms.Dispose();
            ms.Close();
            return File(bytes, @"image/Jpeg");
        }

        /// <summary>
        /// Checks the verify code.
        /// </summary>
        /// <param name="verifyCode">The verify code.</param>
        /// <returns>JsonResult.</returns>
        [AllowAnonymous]
        public JsonResult CheckVerifyCode(string verifyCode)
        {
            var result = (Session["verifyCode"] ?? string.Empty).ToString() == verifyCode;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 退出
        /// </summary>
        /// <returns>view</returns>
        [UserActionLog(ActionTypes.退出, RZMK)]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }

        /// <summary>
        /// Changes the password.
        /// </summary>
        /// <returns>ActionResult.</returns>
        [Authorize]
        [HttpGet]
        public ActionResult ChangePassword()
        {
            return View();
        }

        /// <summary>
        /// Changes the user password.
        /// </summary>
        /// <param name="oldPassword">The old password.</param>
        /// <param name="newPassword">The new password.</param>
        /// <returns>JsonResult.</returns>
        [Authorize]
        [HttpPost]
        [UserActionLog(ActionTypes.修改密码, RZMK)]
        public JsonResult ChangeUserPassword(ChangePasswordInput input )
        {
            string oldPassword = input.oldPassword;
            string newPassword = input.newPassword;
            var result = false;
            var message = string.Empty;
            var pwd = DesHelper.Decrypt(UserInfo.User.Password);
            if (pwd == oldPassword)
            {
                var password = DesHelper.Encrypt(newPassword);
                result = iUserManagerAppService.ChangePassword(UserInfo.User.Id, password);
                if (!result)
                {
                    message = "密码修改失败！";
                }
                else
                {
                    UserInfo.User.Password = password;
                }
            }
            else
            {
                message = "原始密码错误！";
            }

            return Json(new AjaxResult() { isSuccess = result, message = message });
        }
    }
}