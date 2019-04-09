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
using Boanda.UserManager.Web.Areas.Rms.Models;
using Boanda.Web;
using Boanda.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class MenuController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    [Authorize]
    public class MenuController : BaseController
    {
        /// <summary>
        /// The menu application service
        /// </summary>
        private IMenuAppService menuAppService;

        /// <summary>
        /// Initializes a new instance of the <see cref="MenuController"/> class.
        /// </summary>
        /// <param name="menuAppService">The menu application service.</param>
        public MenuController(IMenuAppService menuAppService)
        {
            this.menuAppService = menuAppService;
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
        /// Gets the menus.
        /// </summary>
        /// <param name="menu">The menu.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetMenus(InputMenu menu)
        {
            if (menu.Ssxt == null)
            {
                menu.Ssxt = SystemId;
            }

            var menus = menuAppService.GetMenus(menu);
            return Json(menus);
        }

        /// <summary>
        /// Gets the menus tree.
        /// </summary>
        /// <param name="ssxt">The SSXT.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetMenusTree(string ssxt)
        {
            if (ssxt == null)
            {
                ssxt = SystemId;
            }

            var menus = menuAppService.SeachMenuData(ssxt).Select(x=>new TreeModel() { id = x.XH, open = true, pId = x.FCDXH, name = x.CDMC });

            //var rootMenus = menus.Where(m => string.IsNullOrEmpty(m.FCDXH));
            //var menuList = new List<TreeModel>();
            //foreach (var menu in rootMenus)
            //{
            //    var treeModel = GetTree(new TreeModel() { id = menu.XH, text = menu.CDMC }, menus);
            //    menuList.Add(treeModel);
            //}

            return Json(menus);
        }

        /// <summary>
        /// Gets the menus drop down list.
        /// </summary>
        /// <param name="ssxt">The SSXT.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetMenusDropDownList(string ssxt)
        {
            if (string.IsNullOrEmpty(ssxt))
            {
                ssxt = SystemId;
            }

            var menus = menuAppService.SeachMenuData(ssxt);
            var data = menus.Select(m => new { id = m.XH, pId = m.FCDXH, text = m.CDMC, open = true });
            return Json(data);
        }

        /// <summary>
        /// Gets the tree.
        /// </summary>
        /// <param name="treeModel">The tree model.</param>
        /// <param name="menus">The menus.</param>
        /// <returns>TreeModel.</returns>
        public TreeModel GetTree(TreeModel treeModel, IEnumerable<T_ADMIN_RMS_CD> menus)
        {
            foreach (var item in menus)
            {
                if (treeModel.id == item.FCDXH)
                {
                    var subTreeModel = new TreeModel();
                    subTreeModel.id = item.XH;
                    subTreeModel.text = item.CDMC;

                    // 查找子结构
                    GetTree(subTreeModel, menus);
                    if (treeModel.children == null)
                    {
                        treeModel.children = new List<TreeModel>();
                    }

                    treeModel.children.Add(subTreeModel);
                }
            }

            return treeModel;
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
        /// Gets the menu.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="ssxt">The SSXT.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetMenu(string id)
        {
            var menu = menuAppService.Get(id);

            return Json(menu);
        }

        /// <summary>
        /// Deletes the menu.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult DelMenu(string id)
        {
            var isSuccess = menuAppService.DelMenu(id);
            return Json(new { Result = isSuccess });
        }

        /// <summary>
        /// Saves the menu.
        /// </summary>
        /// <param name="menu">The menu.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SaveMenu(T_ADMIN_RMS_CD menu)
        {
            var isSuccess = false;
            if (!(menu == null || string.IsNullOrEmpty(menu.CDXH)))
            {
                menu.XGR = UserInfo.User.Id;
                menu.XGSJ = DateTime.Now;
                menu.CJR = UserInfo.User.Id;
                menu.CJSJ = DateTime.Now;
                isSuccess = menuAppService.SaveMenu(menu);
            }

            return Json(new { Result = isSuccess });
        }
    }
}