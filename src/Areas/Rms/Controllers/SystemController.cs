//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using Boanda.Data.Repository;
using Boanda.UserManager.Dto;
using Boanda.UserManager.Entity;
using Boanda.UserManager.IService;
using Boanda.UserManager.Web.Areas.Rms.Models;
using Boanda.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class SystemController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    [Authorize]
    public class SystemController : BaseController
    {
        /// <summary>
        /// The system application service
        /// </summary>
        private ISystemAppService systemAppService;

        /// <summary>
        /// The jk repository
        /// </summary>
        private IRepository<T_ADMIN_RMS_JK> jkRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="SystemController"/> class.
        /// </summary>
        /// <param name="systemAppService">The system application service.</param>
        /// <param name="jkRepository">The jk repository.</param>
        public SystemController(ISystemAppService systemAppService, IRepository<T_ADMIN_RMS_JK> jkRepository)
        {
            this.systemAppService = systemAppService;
            this.jkRepository = jkRepository;
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
        /// Gets the jk.
        /// </summary>
        /// <returns>JsonResult.</returns>
        public JsonResult GetJk()
        {
            var jsList = jkRepository.GetAll();
            var data = jsList.Select(j => new { id = j.XH, name = j.JKLXMC });
            return Json(data);
        }

        /// <summary>
        /// Gets the system drop down list.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetSystemDropDownList(string id)
        {
            var depts = systemAppService.SeachSystemData(id);
            var data = depts.Select(d => new { id = d.XH, pId = string.Empty, text = d.XTMC, name = d.XTMC, open = true });
            return Json(data);
        }

        /// <summary>
        /// Gets the tree.
        /// </summary>
        /// <param name="treeModel">The tree model.</param>
        /// <param name="menus">The menus.</param>
        /// <returns>TreeModel.</returns>
        public TreeModel GetTree(TreeModel treeModel, IEnumerable<dynamic> menus)
        {
            //ZZQC,ZZBH,XH,SJZZXH
            foreach (var item in menus)
            {
                if (treeModel.id == item.SJZZXH)
                {
                    var subTreeModel = new TreeModel();
                    subTreeModel.id = item.XH;
                    subTreeModel.text = item.ZZQC;

                    //查找子结构
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
        /// Gets the systems.
        /// </summary>
        /// <param name="inputSystem">The input system.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetSystems(InputSystem inputSystem)
        {
            var depts = systemAppService.GetSystems(inputSystem);
            return Json(depts);
        }

        /// <summary>
        /// Gets the system.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetSystem(string id)
        {
            var user = systemAppService.GetSystem(id);
            return Json(user);
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
        /// Deletes the system.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult DelSystem(string id)
        {
            var isSuccess = false;

            if (id != "ROOT")
            {
                isSuccess = systemAppService.DelSystem(id);
            }

            return Json(new { Result = isSuccess });
        }

        /// <summary>
        /// Saves the system.
        /// </summary>
        /// <param name="sys">The system.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SaveSystem(T_ADMIN_RMS_XT sys)
        {
            var isSuccess = false;
            if (!(sys == null || string.IsNullOrEmpty(sys.XTBH)))
            {
                sys.XGR = UserInfo.User.Id;
                sys.XGSJ = DateTime.Now;
                sys.CJR = UserInfo.User.Id;
                sys.CJSJ = DateTime.Now;
                isSuccess = systemAppService.SaveSystem(sys);
            }

            return Json(new { Result = isSuccess  });
        }
    }
}