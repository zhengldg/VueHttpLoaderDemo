//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using Boanda.UserManager.Dto;
using Boanda.UserManager.Web.Areas.Rms.Models;
using Boanda.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using T_ADMIN_RMS_ZZJG = Boanda.UserManager.Entity.T_ADMIN_RMS_ZZJG;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class DepartmentController.
    /// </summary>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    public class DepartmentController : BaseController
    {
        /// <summary>
        /// The department application service
        /// </summary>
        private IService.IDepartmentAppService departmentAppService;

        /// <summary>
        /// Initializes a new instance of the <see cref="DepartmentController" /> class.
        /// </summary>
        /// <param name="departmentAppService">The department application service.</param>
        public DepartmentController(IService.IDepartmentAppService departmentAppService)
        {
            this.departmentAppService = departmentAppService;
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
            return Json(this.departmentAppService.Get(id));
        }

        /// <summary>
        /// Gets the department tree.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetDepartmentTree(string id)
        {
            var depts = this.departmentAppService.SeachDeparmentData(string.Empty, id);
            var data = depts.Select(d => new { id = d.ZZBH, pId = d.SJZZXH, name = d.ZZQC, open = true });

            var departments = new List<TreeModel>();
            var rootDepts = depts.Where(m => m.SJZZXH == null);
            foreach (var dept in rootDepts)
            {
                var treeModel = GetTree(new TreeModel() { id = dept.ZZBH, text = dept.ZZQC }, depts);
                departments.Add(treeModel);
            }

            // return Json(data);
            return Json(departments);
        }

        /// <summary>
        /// Gets the department drop down list.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="orgid">The orgid.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetDepartmentDropDownList(string id, string orgid)
        {
            var depts = this.departmentAppService.SeachDeparmentData(string.Empty, id, orgid);
            var data = depts.Select(d => new { id = d.ZZBH, pId = d.SJZZXH, name = d.ZZQC, code = d.ZZDH, open = true });
            return Json(data);
        }

        /// <summary>
        /// Gets the department drop down list by dept identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetDepartmentDropDownListByDeptId(string id)
        {
            IEnumerable<dynamic> data = null;

            var depts = this.departmentAppService.SeachDeparmentData(string.Empty, string.Empty, string.Empty);
            if (!string.IsNullOrEmpty(id))
            {
                var rootDept = depts.First(dept => dept.ZZBH == id);
                data = this.GetData(rootDept, depts);
                if (!(data == null || data.Count() == 0))
                {
                    data = data.Select(d => new { id = d.ZZBH, pId = d.SJZZXH, name = d.ZZQC, code = d.ZZDH, open = true });
                }
            }
            else
            {
                data = depts.Select(d => new { id = d.ZZBH, pId = d.SJZZXH, name = d.ZZQC, code = d.ZZDH, open = true });
            }

            return Json(data);
        }

        /// <summary>
        /// Gets the data.
        /// </summary>
        /// <param name="rootDept">The root dept.</param>
        /// <param name="depts">The depts.</param>
        /// <returns>IEnumerable&lt;dynamic&gt;.</returns>
        private IEnumerable<dynamic> GetData(dynamic rootDept, IEnumerable<dynamic> depts)
        {
            var data = new List<dynamic>();
            if (rootDept != null)
            {
                data.Add(rootDept);
                if (!(depts == null || depts.Count() == 0))
                {
                    var tmpDepts = depts.Where(d => d.SJZZXH == rootDept.ZZBH);
                    if (!(tmpDepts == null || tmpDepts.Count() == 0))
                    {
                        foreach (var item in tmpDepts)
                        {
                            data.AddRange(this.GetData(item, depts));
                        }
                    }
                }
            }

            return data;
        }

        /// <summary>
        /// Gets the tree.
        /// </summary>
        /// <param name="treeModel">The tree model.</param>
        /// <param name="menus">The menus.</param>
        /// <returns>TreeModel.</returns>
        public TreeModel GetTree(TreeModel treeModel, IEnumerable<dynamic> menus)
        {
            // ZZQC,ZZBH,XH,SJZZXH
            foreach (var item in menus)
            {
                if (treeModel.id == item.SJZZXH)
                {
                    var subTreeModel = new TreeModel();
                    subTreeModel.id = item.XH;
                    subTreeModel.text = item.ZZQC;

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
        /// Gets the departments.
        /// </summary>
        /// <param name="inputDept">The input dept.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetDepartments(InputDepartment inputDept)
        {
            var depts = this.departmentAppService.GetDepartments(inputDept);
            return Json(depts);
        }

        /// <summary>
        /// Gets the department.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult GetDepartment(string id)
        {
            var user = this.departmentAppService.GetDepartment(id);
            return Json(user);
        }

        /// <summary>
        /// Deletes the department.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult DelDepartment(string id)
        {
            var isSuccess = false;

            if (id != "ROOT")
            {
                isSuccess = this.departmentAppService.DelDepartment(id);
            }

            return Json(new { Result = isSuccess });
        }

        /// <summary>
        /// Saves the department.
        /// </summary>
        /// <param name="dept">The dept.</param>
        /// <returns>JsonResult.</returns>
        public JsonResult SaveDepartment(T_ADMIN_RMS_ZZJG dept)
        {
            var isSuccess = false;
            if (!(dept == null || string.IsNullOrEmpty(dept.ZZBH)))
            {
                dept.XGR = UserInfo.User.Id;
                dept.XGSJ = DateTime.Now;
                dept.CJR = UserInfo.User.Id;
                dept.CJSJ = DateTime.Now;
                if (dept.ZZBH == "ROOT")
                {
                    dept.SJZZXH = null;
                }

                isSuccess = this.departmentAppService.SaveDepartment(dept);
            }

            return Json(new { Result = isSuccess  });
        }

        public ActionResult GetCombList()
        {
            var data = this.departmentAppService.GetAll().OrderBy(x => x.PXH).Select(x => new { id = x.ZZBH, text = x.ZZQC });
            return Json(data);
        }

        #region 部门扩展

        /// <summary>
        /// 根据部门代码获取信息
        /// </summary>
        /// <returns>结果集</returns>
        public JsonResult GetDepartmentTreeByDeptCode()
        {
            var id = UserInfo.User.Orgid;
            var depts = this.departmentAppService.GetDepartments(id);
            var data = depts.Select(d => new { id = d.ZZBH, pId = d.SJZZXH, name = d.ZZQC, code = d.ZZDH, open = true });

            return Json(data);
        }

        #endregion
    }
}