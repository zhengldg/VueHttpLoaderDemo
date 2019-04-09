using Boanda.Data;
using Boanda.Data.Repository;
using Boanda.DSJPT.Core.Entity;
using Boanda.Web;
using Boanda.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Web.Mvc;


namespace Boanda.DSJPT.EntryWeb.Controllers
{
    /// <summary>
    /// 首页
    /// </summary>
    public class HomeController : BaseController
    {
        private DbContext context = new Repository<object>().DbContext;
        static HomeController()
        {
        }

        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 获取水质排名数据
        /// </summary>
        /// <returns></returns>
        public ActionResult GetHomeData()
        {
            dynamic res = new ExpandoObject();
            res.waterRankList = context.Query(@"
SELECT CDMC, PMND, PMSJ, YZZ, DYPM, QNPM
FROM T_SJZX_HJZL_CS_HJZLPM
WHERE PMLX = '全省水环境质量'
ORDER BY to_number (DYPM)");
            // 达标率
            dynamic dbl = new ExpandoObject();
            dbl.GKDM = new DapperCommonDto<double, double>() { Item1 = 60.6, Item2 = 60.7 };
            dbl.SKDM = new DapperCommonDto<double, double>() { Item1 = 60.6, Item2 = 60.7 };
            dbl.SHIKDM = new DapperCommonDto<double, double>() { Item1 = 60.6, Item2 = 60.7 };
            dbl.JJDM = new DapperCommonDto<string, double>() { Item1 = "优秀", Item2 = 60.7 };
            dbl.YYSY = new DapperCommonDto<double, double>() { Item1 = 100};
            dbl.DXSZ = new DapperCommonDto<string, double>() { Item1 = "良好" };
            res.DBL = dbl;
            return Json(res);
        }

        public ActionResult Test()
        {
            return View();
        }
    }
}