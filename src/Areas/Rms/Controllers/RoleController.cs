//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using Boanda.UserManager.Dto;
using Boanda.UserManager.Entity;
using Boanda.UserManager.IService;
using Boanda.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class RoleController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    [Authorize]
    public class RoleController : BaseController
    {
        /// <summary>
        /// The role application service
        /// </summary>
        private IRoleAppService roleAppService;

        /// <summary>
        /// Initializes a new instance of the <see cref="RoleController"/> class.
        /// </summary>
        /// <param name="roleAppService">The role application service.</param>
        public RoleController(IRoleAppService roleAppService)
        {
            this.roleAppService = roleAppService;
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

        /// <summary>
        /// Gets the roles.
        /// </summary>
        /// <param name="inputRole">The input role.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetRoles(InputRole inputRole)
        {
            var depts = roleAppService.GetRoles(inputRole);
            return Json(depts);
        }

        /// <summary>
        /// Gets the role tree.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="orgid">The orgid.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetRoleTree(string id, string orgid)
        {
            var roles = roleAppService.SeachRoleData(id, orgid);
            var data = roles.Select(d => new { id = d.JSXH, text = d.JSMC, name = d.JSMC, open = true });

            return Json(data);
        }

        /// <summary>
        /// Gets the role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetRole(string id)
        {
            var user = roleAppService.Get(id);
            return Json(user);
        }

        /// <summary>
        /// Deletes the role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="orgid">The orgid.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult DelRole(string id, string orgid)
        {
            var isSuccess = false;

            if (id.ToLower() != "administrator")
            {
                isSuccess = roleAppService.DelRole(id, orgid);
            }

            return Json(new { Result = isSuccess  });
        }

        /// <summary>
        /// Saves the role.
        /// </summary>
        /// <param name="role">The role.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SaveRole(T_ADMIN_RMS_JS role)
        {
            var isSuccess = false;
            if (!(role == null || string.IsNullOrEmpty(role.JSXH)))
            {
                role.XGR = UserInfo.User.Id;
                role.XGSJ = DateTime.Now;
                role.CJR = UserInfo.User.Id;
                role.CJSJ = DateTime.Now;
                role.ORGID = UserInfo.User.Orgid;
                isSuccess = roleAppService.SaveRole(role);
            }

            return Json(new { Result = isSuccess  });
        }

        /// <summary>
        /// Users the role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult UserRole(string id)
        {
            ViewBag.Id = id;
            return View();
        }

        /// <summary>
        /// Saves the user role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="jsbhs">The JSBHS.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SaveUserRole(string id, List<string> jsbhs)
        {
            var result = false;
            if (!string.IsNullOrEmpty(id))
            {
                var yhjsgxbs = new List<T_ADMIN_RMS_YHYJSGXB>();
                foreach (var jsbh in jsbhs)
                {
                    yhjsgxbs.Add(new T_ADMIN_RMS_YHYJSGXB()
                    {
                        XH = Guid.NewGuid().ToString("N"),
                        YHID = id,
                        PXH = 10,
                        CJSJ = DateTime.Now,
                        CJR = UserInfo.User.Id,
                        XGR = UserInfo.User.Id,
                        XGSJ = DateTime.Now,
                        JSBH = jsbh
                    });
                }

                result = roleAppService.SaveUserRole(yhjsgxbs, id);
            }

            return Json(new { Result = result ? "1" : "0" });
        }

        /// <summary>
        /// Gets the user role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetUserRole(string id)
        {
            var userRoles = roleAppService.GetUserRoleByYhid(id);
            return Json(userRoles);
        }
    }
}