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
using Boanda.Web.Areas.Rms.Models;
using Boanda.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class PermissionController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    [Authorize]
    public class PermissionController : BaseController
    {
        /// <summary>
        /// The menu role application service
        /// </summary>
        private IMenuRoleAppService menuRoleAppService;

        /// <summary>
        /// The permission item application service
        /// </summary>
        private IPermissionItemAppService permissionItemAppService;

        /// <summary>
        /// The menu application service
        /// </summary>
        private IMenuAppService menuAppService;

        /// <summary>
        /// Initializes a new instance of the <see cref="PermissionController"/> class.
        /// </summary>
        /// <param name="menuRoleAppService">The menu role application service.</param>
        /// <param name="permissionItemAppService">The permission item application service.</param>
        /// <param name="menuAppService">The menu application service.</param>
        public PermissionController(IMenuRoleAppService menuRoleAppService, IPermissionItemAppService permissionItemAppService, IMenuAppService menuAppService)
        {
            this.menuRoleAppService = menuRoleAppService;
            this.permissionItemAppService = permissionItemAppService;
            this.menuAppService = menuAppService;
        }

        /// <summary>
        /// Gets the permission items.
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetPermissionItems(InputPermissioinItem input)
        {
            if (string.IsNullOrEmpty(input.SystemId))
            {
                input.SystemId = SystemId;
            }

            var items = permissionItemAppService.GetPermissionItems(input);
            return Json(items);
        }

        /// <summary>
        /// 新增或者编辑
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        [HttpGet]
        public ActionResult AddOrEditPermissionItem(string id)
        {
            ViewBag.editFlag = 1;
            return View();
        }

        /// <summary>
        /// 详情
        /// </summary>
        [HttpGet]
        public ActionResult DetailPermissionItem(string id)
        {
            ViewBag.editFlag = 0;
            return View("AddOrEditPermissionItem");
        }

        /// <summary>
        /// Gets the menu by role identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetMenuByRoleId(string id)
        {
            var menuRoles = this.menuRoleAppService.GetMenuRoleByRoleJsxh(id);
            return Json(menuRoles);
        }

        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult Index()
        {
            ViewBag.SystemId = SystemId;
            return View();
        }

        /// <summary>
        /// Permissions the item.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult PermissionItem()
        {
            ViewBag.SystemId = SystemId;
            return View();
        }

        /// <summary>
        /// Grants the permission item.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult GrantPermissionItem()
        {
            ViewBag.SystemId = SystemId;
            return View();
        }

        /// <summary>
        /// Saves the permission.
        /// </summary>
        /// <param name="menus">The menus.</param>
        /// <param name="ssxt">The SSXT.</param>
        /// <param name="jsxh">The JSXH.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SavePermission(List<string> menus, string ssxt, string jsxh)
        {
            var cdgxbs = new List<T_ADMIN_RMS_JSYCDGXB>();
            foreach (var menu in menus)
            {
                var cd = new T_ADMIN_RMS_JSYCDGXB()
                {
                    XH = Guid.NewGuid().ToString(),
                    JSXH = jsxh,
                    CDXH = menu,
                    SAVEPOWER = "1",
                    UPDATEPOWER = "1",
                    DELETEPOWER = "1",
                    PRINTPOWER = "1",
                    EXPORTPOWER = "1",
                    UPLOADPOWER = "1",
                    OTHERPOWER = "1",
                    PXH = 1,
                    XGR = UserInfo.User.Id,
                    CJR = UserInfo.User.Id,
                    XGSJ = DateTime.Now,
                    CJSJ = DateTime.Now,
                };

                cdgxbs.Add(cd);
            }

            var result = this.menuRoleAppService.SaveMenuRole(jsxh, ssxt, cdgxbs);
            return Json(new { Result = result });
        }

        /// <summary>
        /// Saves the permission item.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SavePermissionItem(T_ADMIN_RMS_QXXB entity)
        {
            bool result = false;
            try
            {
                result = this.permissionItemAppService.SavePermissionItem(entity);

            }
#pragma warning disable CS0168 // 声明了变量“ex”，但从未使用过
            catch (Exception ex)
#pragma warning restore CS0168 // 声明了变量“ex”，但从未使用过
            {
                result = false;
            }

            return Json(new { Result = result });
        }

        /// <summary>
        /// Gets the permission item by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetPermissionItemById(string id)
        {
            var permissionItem = this.permissionItemAppService.GetPermissionItemById(id);
            return Json(permissionItem);
        }

        /// <summary>
        /// Deletes the permissioin item.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        [HttpGet]
        public JsonResult DelPermissioinItem(string id)
        {
            var result = this.permissionItemAppService.DelPermissionItemByIdSystemId(id, null);
            return Json(new { Result = result });
        }

        /// <summary>
        /// Menus the permission.
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult MenuPermission()
        {
            ViewBag.SystemId = SystemId;
            return View();
        }

        /// <summary>
        /// Builders the tree.
        /// </summary>
        /// <param name="menus">The menus.</param>
        /// <param name="level">The level.</param>
        /// <param name="nodeId">The node identifier.</param>
        /// <returns>System.String.</returns>
        private string BuilderTree(List<T_ADMIN_RMS_CD> menus, int level, string nodeId)
        {
            StringBuilder sbTree = new StringBuilder();
            if (!(menus == null || menus.Count == 0))
            {
                List<T_ADMIN_RMS_CD> cdList = menus.FindAll(c => { return c.FCDXH == nodeId; });
                foreach (var item in cdList)
                {
                    if ((item.LJDZ ?? string.Empty).IndexOf("#") != -1)
                    {
                        sbTree.AppendFormat(@"<div class='parent p" + level + "'>{0}<input type='checkbox' alt='全选' value='{1}' tType='ALL' fNodeId='{3}' nodeId='{4}'><span >{2}</span></input></div>"
                            , this.BuilderIcon(level, "")
                            , item.XH, item.CDMC
                            , nodeId, item.XH);
                    }
                    else
                    {
                        sbTree.AppendFormat(@"<div class=' sub  sub"+level  + @"'>{0}<div class='items-title'><input type='checkbox' value='{1}' alt='全选' fNodeId='{3}' tType='ALL' nodeId='{4}'><span >{2}</span></input></div>
                        <div class='items'> <input type = 'checkbox' tId='{1}' tType='SAVEPOWER' >保存</input>
                        <input type = 'checkbox' tId='{1}' tType='UPDATEPOWER'>修改</input>
                        <input type = 'checkbox' tId='{1}' tType='DELETEPOWER'>删除</input>
                        <input type = 'checkbox' tId='{1}' tType='PRINTPOWER'>打印</input>
                        <input type = 'checkbox' tId='{1}' tType='EXPORTPOWER'>导出</input>
                        <input type = 'checkbox' tId='{1}' tType='UPLOADPOWER'>上传</input>
                        <input type = 'checkbox' tId='{1}' tType='OTHERPOWER'>其他</input></div> </div> "
                            , this.BuilderIcon(level, "")
                            , item.XH, item.CDMC
                            , nodeId, item.XH);
                    }

                    if (menus.Exists(c => { return c.FCDXH == item.XH; }))
                    {
                        sbTree.Append(this.BuilderTree(menus, level + 1, item.XH));
                    }
                }
            }

            return sbTree.ToString();
        }

        /// <summary>
        /// Builders the icon.
        /// </summary>
        /// <param name="length">The length.</param>
        /// <param name="icon">The icon.</param>
        /// <returns>System.String.</returns>
        private string BuilderIcon(int length, string icon)
        {
            StringBuilder icons = new StringBuilder();
            for (int i = 0; i < length; i++)
            {
                icons.Append(icon);
            }

            return icons.ToString();
        }

        /// <summary>
        /// Gets the menus.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="systemId">The system identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetMenus(string roleId, string systemId)
        {
            if (string.IsNullOrEmpty(systemId))
            {
                systemId = this.SystemId;
            }

            List<T_ADMIN_RMS_CD> menus = new List<T_ADMIN_RMS_CD>();
            var data = menuAppService.SeachMenuData(systemId, true);
            if (!(data == null || data.Count() == 0))
            {
                menus = data.ToList<T_ADMIN_RMS_CD>();
            }

            var root = data.FirstOrDefault(c => c.CDXH == "ROOT" || string.IsNullOrWhiteSpace(c.FCDXH));
            var trees = this.BuilderTree(menus, 0, root.XH);

            return Json(new { rootMenu = root, menuTree = trees });
        }

        /// <summary>
        /// Gets the role menus.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="systemId">The system identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetRoleMenus(string id, string systemId)
        {
            var result = new List<RoleMenuModel>();
            var roleMenus = this.permissionItemAppService.GetRoleMenusByRoleId(id, systemId);
            if (!(roleMenus == null || roleMenus.Count() == 0))
            {
                foreach (var item in roleMenus)
                {
                    result.Add(new RoleMenuModel()
                    {
                        XH = item.XH,
                        JSXH = item.JSXH,
                        CDXH = item.CDXH,
                        SAVEPOWER = item.SAVEPOWER,
                        UPDATEPOWER = item.UPDATEPOWER,
                        DELETEPOWER = item.DELETEPOWER,
                        UPLOADPOWER = item.UPLOADPOWER,
                        PRINTPOWER = item.PRINTPOWER,
                        EXPORTPOWER = item.EXPORTPOWER,
                        OTHERPOWER = item.OTHERPOWER
                    });
                }
            }

            return Json(result);
        }

        /// <summary>
        /// Saves the specified menus.
        /// </summary>
        /// <param name="menus">The menus.</param>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="systemId">The system identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult Save(string menus, string roleId, string systemId)
        {
            var result = false;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<RoleMenuModel> jsList = jsSerializer.Deserialize<List<RoleMenuModel>>(HttpUtility.UrlDecode(menus));

            if (jsList.Count > 0)
            {
                //删除
                int deletedCount = this.permissionItemAppService.DeleteRoleAndMenuByRoleIdAndSystemId(roleId, systemId);

                var roleMenus = new List<T_ADMIN_RMS_JSYCDGXB>();
                foreach (var item in jsList)
                {
                    var t = new T_ADMIN_RMS_JSYCDGXB()
                    {
                        XH = Guid.NewGuid().ToString(),
                        JSXH = roleId,
                        CDXH = item.CDXH,
                        CJR = string.Empty,
                        SAVEPOWER = item.SAVEPOWER,
                        UPDATEPOWER = item.UPDATEPOWER,
                        DELETEPOWER = item.DELETEPOWER,
                        PRINTPOWER = item.PRINTPOWER,
                        EXPORTPOWER = item.EXPORTPOWER,
                        UPLOADPOWER = item.UPLOADPOWER,
                        OTHERPOWER = item.OTHERPOWER,
                        CJSJ = DateTime.Now,
                        XGSJ = DateTime.Now,
                        BZ = UserInfo.User.Id,
                        PXH = 1,
                        XGR = string.Empty
                    };
                    roleMenus.Add(t);
                }

                //保存
                long insertCount = this.permissionItemAppService.AddRoleMenus(roleMenus);
                result = (insertCount == roleMenus.Count);
            }

            return Json(new { Result = result });
        }

        /// <summary>
        /// 获取所有定义的权限项
        /// </summary>
        /// <param name="systemId">系统id</param>
        /// <returns>权限</returns>
        public JsonResult GetAllPermissionItem(string systemId)
        {
            if (string.IsNullOrEmpty(systemId))
            {
                systemId = this.SystemId;
            }

            List<T_ADMIN_RMS_QXXB> permissionItems = new List<T_ADMIN_RMS_QXXB>();
            var data = permissionItemAppService.SeachPermissionItemData(null, systemId);
            StringBuilder sbTree = new StringBuilder();
            if (!(data == null || data.Count() == 0))
            {
                sbTree.AppendFormat(@"<div>");
                foreach (var item in data)
                {
                    sbTree.AppendFormat(@" <input type='checkbox' tId='{0}' tType='{2}'>{1}</input>", item.XH, item.QXXMC, item.QXXZ);
                }

                sbTree.Append("</div>");
            }

            return Json(new
            {
                menuTree = sbTree.ToString()
            });
        }

        /// <summary>
        /// Gets the permission item tree.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="systemId">The system identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetPermissionItemTree(string roleId, string systemId)
        {
            if (string.IsNullOrEmpty(systemId))
            {
                systemId = this.SystemId;
            }

            if (string.IsNullOrEmpty(roleId))
            {
            }

            List<T_ADMIN_RMS_QXXB> permissionItems = new List<T_ADMIN_RMS_QXXB>();
            var data = this.permissionItemAppService.SeachPermissionItemByRoleIdSystemId(roleId, systemId);
            return Json(data);
        }

        /// <summary>
        /// Saves the permission items.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="items">The items.</param>
        /// <param name="systemId">The system identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SavePermissionItems(string roleId, string items, string systemId)
        {
            var result = false;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            var permissionItems = jsSerializer.Deserialize<List<string>>(HttpUtility.UrlDecode(items));
            if (!(permissionItems == null || permissionItems.Count == 0))
            {
                var list = new List<T_ADMIN_RMS_JSYQXXGXB>();
                foreach (var item in permissionItems)
                {
                    var entity = new T_ADMIN_RMS_JSYQXXGXB();
                    entity.XH = Guid.NewGuid().ToString("N");
                    entity.JSBH = roleId;
                    entity.QXXBH = item;
                    list.Add(entity);
                }

                result = this.permissionItemAppService.DeletePermissionItemRelationsByRoleId(roleId, systemId);
                if (result)
                {
                    result = this.permissionItemAppService.SavePermissionItemRelations(roleId, list) > 0;
                }
            }
            else
            {
                result = this.permissionItemAppService.DeletePermissionItemRelationsByRoleId(roleId, systemId);
            }

            return Json(new { Result = result });
        }

        #region 扩展

        /// <summary>
        /// Gets the menus extend.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="systemId">The system identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetMenusExtend(string roleId, string systemId)
        {
            if (string.IsNullOrEmpty(systemId))
            {
                systemId = this.SystemId;
            }

            List<T_ADMIN_RMS_CD> menus = new List<T_ADMIN_RMS_CD>();
            var data = menuAppService.SeachMenuData(systemId, true);
            if (!(data == null || data.Count() == 0))
            {
                menus = data.ToList<T_ADMIN_RMS_CD>();
                foreach (var item in menus)
                {
                    if (!UserInfo.HasMenuByMenuId(item.CDXH))
                    {
                        item.SFYX = 0;
                    }
                }

                menus = menus.Where(m => m.SFYX == 1).ToList();
            }

            var root = data.FirstOrDefault(c => c.CDXH == "ROOT");
            var trees = this.BuilderTree(menus, 0, root.XH);

            return Json(new { rootMenu = root, menuTree = trees });
        }

        /// <summary>
        /// Gets the role menus extend.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="systemId">The system identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetRoleMenusExtend(string id, string systemId)
        {
            var result = new List<RoleMenuModel>();
            var roleMenus = this.permissionItemAppService.GetRoleMenusByRoleId(id, systemId);
            if (!(roleMenus == null || roleMenus.Count() == 0))
            {
                foreach (var item in roleMenus)
                {
                    if (UserInfo.HasMenuByMenuId(item.CDXH))
                    {
                        result.Add(new RoleMenuModel()
                        {
                            XH = item.XH,
                            JSXH = item.JSXH,
                            CDXH = item.CDXH,
                            SAVEPOWER = item.SAVEPOWER,
                            UPDATEPOWER = item.UPDATEPOWER,
                            DELETEPOWER = item.DELETEPOWER,
                            UPLOADPOWER = item.UPLOADPOWER,
                            PRINTPOWER = item.PRINTPOWER,
                            EXPORTPOWER = item.EXPORTPOWER,
                            OTHERPOWER = item.OTHERPOWER
                        });
                    }
                }
            }

            return Json(result);
        }

        #endregion
    }
}