//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using Boanda.Core.Cache;
using Boanda.Core.Logging;
using Boanda.Core.Security;
using Boanda.UserManager.Dto;
using Boanda.UserManager.IService;
using Boanda.Web.Controllers;
using System;
using System.Web.Mvc;
using T_ADMIN_RMS_YH = Boanda.UserManager.Entity.T_ADMIN_RMS_YH;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class UserController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    public class UserController : BaseController
    {
        /// <summary>
        /// The user application service
        /// </summary>
        private IUserAppService userAppService;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// </summary>
        /// <param name="userAppService">The user application service.</param>
        public UserController(IUserAppService userAppService)
        {
            this.userAppService = userAppService;
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 新增或者编辑
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        [HttpGet]
        public ActionResult AddOrEdit(string id)
        {
            ViewBag.editFlag = 1;
            return View();
        }

        /// <summary>
        /// 详情
        /// </summary>
        [HttpGet]
        public ActionResult Detail(string id)
        {
            ViewBag.editFlag = 0;
            return View("AddOrEdit");
        }

        public ActionResult Get(string id)
        {
            return Json(this.userAppService.GetUser(id));
        }

        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetUsers(InputUser user)
        {
            var users = userAppService.GetUsers(user);
            return Json(users);
        }

        /// <summary>
        /// Gets the user.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetUser(string id)
        {
            var user = userAppService.GetUser(id);
            try
            {
                user.YHMM = DesHelper.Decrypt(user.YHMM);
            }
            catch
            {
            }

            return Json(user);
        }

        /// <summary>
        /// Deletes the user.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult DelUser(string id)
        {
            var isSuccess = userAppService.DelUser(id);

            return Json(new { Result = isSuccess  });
        }

        /// <summary>
        /// Saves the user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SaveUser(T_ADMIN_RMS_YH user)
        {
            var isSuccess = false;
            if (!(user == null || string.IsNullOrEmpty(user.YHID)))
            {
                user.YHMM = DesHelper.Encrypt(user.YHMM);
                user.XGR = UserInfo.User.Id;
                user.XGSJ = DateTime.Now;
                user.CJR = UserInfo.User.Id;
                user.CJSJ = DateTime.Now;
                try
                {
                    isSuccess = userAppService.SaveUser(user);

                }
#pragma warning disable CS0168 // 声明了变量“ex”，但从未使用过
                catch (Exception ex)
#pragma warning restore CS0168 // 声明了变量“ex”，但从未使用过
                {
                    isSuccess = false;
                }
            }
            return Json(new { Result = isSuccess  });
        }

        /// <summary>
        /// Clears the user cache.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult ClearUserCache(string id)
        {
            var result = false;
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    CacheFactory.DefaultCache.Clear("UserInfo");
                }
                else
                {
                    CacheFactory.DefaultCache.Remove(id, "UserInfo");
                }

                result = true;
            }
            catch (Exception ex)
            {
                LogFactory.Logger.Error(ex, "清理用户缓存错误");
            }

            return Json(new { Result = result });
        }

        /// <summary>
        /// Gets the users by orgid.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetUsersByOrgid(InputUser user)
        {
            if (string.IsNullOrEmpty(user.ORGID))
            {
                user.ORGID = UserInfo.User.Orgid;
            }

            var users = userAppService.GetUsers(user);
            return Json(users);
        }
    }
}