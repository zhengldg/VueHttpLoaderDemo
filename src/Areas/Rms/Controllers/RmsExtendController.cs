//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using Boanda.Core.Security;
using Boanda.UserManager.Entity;
using Boanda.UserManager.IService;
using Boanda.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class RmsExtendController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    [Authorize]
    public class RmsExtendController : BaseController
    {
        /// <summary>
        /// The user application service
        /// </summary>
        private IUserAppService userAppService;

        /// <summary>
        /// Initializes a new instance of the <see cref="RmsExtendController"/> class.
        /// </summary>
        /// <param name="userAppService">The user application service.</param>
        public RmsExtendController(IUserAppService userAppService)
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
        /// Users this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public new ActionResult User()
        {
            ViewBag.OrgId = UserInfo.User.Orgid;
            return View();
        }

        /// <summary>
        /// Roles this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult Role()
        {
            ViewBag.OrgId = UserInfo.User.Orgid;
            return View();
        }

        /// <summary>
        /// Menus the permission.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult MenuPermission()
        {
            ViewBag.SystemId = base.SystemId;
            return View();
        }

        #region User

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
                isSuccess = userAppService.SaveUser(user);
            }

            return Json(new { Result = isSuccess ? "1" : "0" });
        }

        #endregion

        /// <summary>
        /// Depats the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult Depat(T_ADMIN_RMS_YH user)
        {
            var isSuccess = false;
            if (!(user == null || string.IsNullOrEmpty(user.YHID)))
            {
                user.YHMM = DesHelper.Encrypt(user.YHMM);
                user.XGR = UserInfo.User.Id;
                user.XGSJ = DateTime.Now;
                user.CJR = UserInfo.User.Id;
                user.CJSJ = DateTime.Now;
                isSuccess = userAppService.SaveUser(user);
            }

            return Json(new { Result = isSuccess ? "1" : "0" });
        }
    }
}