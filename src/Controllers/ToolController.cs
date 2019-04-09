using Boanda.Core;
using Boanda.Data.Repository;
using Boanda.DevelopmentFramework.Web.Models.Tool;
using Boanda.SystemConfiguration.Dto;
using Boanda.SystemConfiguration.IService;
using Boanda.SystemConfiguration.Repository;
using Boanda.UserManager.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Boanda.DSJPT.EntryWeb.Controllers
{
    /// <summary>
    /// 提供页面共用的方法
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    public class ToolController : Controller
    {
        /// <summary>
        /// The i regionalism code application service
        /// </summary>
        private IRegionalismCodeAppService iRegionalismCodeAppService;

        /// <summary>
        /// The i public code value application service
        /// </summary>
        private IPublicCodeValueAppService iPublicCodeValueAppService;

        /// <summary>
        /// The industry type repository
        /// </summary>
        private IndustryTypeRepository industryTypeRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="ToolController"/> class.
        /// </summary>
        /// <param name="iRegionalismCodeAppService">The i regionalism code application service.</param>
        /// <param name="iPublicCodeValueAppService">The i public code value application service.</param>
        /// <param name="industryTypeRepository">The industry type repository.</param>
        public ToolController(IRegionalismCodeAppService iRegionalismCodeAppService, IPublicCodeValueAppService iPublicCodeValueAppService, IndustryTypeRepository industryTypeRepository)
        {
            this.iRegionalismCodeAppService = iRegionalismCodeAppService;
            this.iPublicCodeValueAppService = iPublicCodeValueAppService;
            this.industryTypeRepository = industryTypeRepository;
        }

        /// <summary>
        /// 获取行政区划数据
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult GetXzqhData(RegionalismCodeInput input)
        {
            var data = iRegionalismCodeAppService.GetRegionalismCodes(input).Select(x => new Comb() { id = x.XZQHDM, text = x.XZQH, pid = x.FDM }).ToList();
            //data.Insert(0, new Comb() { id = string.Empty, text = string.Empty });
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        public ActionResult CityPicker()
        {
            return View();
        }

        /// <summary>
        /// 返回公共代码值
        /// </summary>
        /// <param name="input">The input.</param>
        /// <param name="notNeedNull">是否需要返回一个空项 默认需要，传递1时不需要</param>
        /// <returns>ActionResult.</returns>
        public ActionResult GetGgdmz(PublicCodeValueInput input, string needNull)
        {
            var list = iPublicCodeValueAppService.GetPublicCodeValues(input).Where(x => x.DM != null);
            var result = list.OrderBy(x => x.PXM).Select(x => new Comb() { id = x.DM, text = x.DMNR }).ToList();
            if (needNull == "1")
            {
                result.Insert(0, new Comb() { id = string.Empty, text = string.Empty });
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 人员选择页面
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult SelectUserTree()
        {
            var model = new DepartmentWithUser();
            var userRepository = new Repository<T_ADMIN_RMS_YH>();
            var departmentRepository = new Repository<T_ADMIN_RMS_ZZJG>();
            model.UserList = userRepository.GetAll();
            model.ZzjgList = departmentRepository.GetAll();

            model.UserList = model.UserList ?? new List<T_ADMIN_RMS_YH>();
            model.ZzjgList = model.ZzjgList ?? new List<T_ADMIN_RMS_ZZJG>();

            if (model.ZzjgList.Count() > 0)
            {
                model.ZzjgBhNameMap = new Dictionary<string, string>();
                foreach (var item in model.ZzjgList)
                {
                    model.ZzjgBhNameMap.Add(item.ZZBH, item.ZZQC);
                }
            }

            return View(model);
        }

        /// <summary>
        /// 行业类型
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns>ActionResult.</returns>
        public ActionResult GetHylxData(IndustryTypeInput input)
        {
            var data = industryTypeRepository.GetIndustryTypes(input).Select(x => new Comb { id = x.HYLXDM, text = x.HYLXDM + "-" + x.HYLX, pid = x.PID });
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}