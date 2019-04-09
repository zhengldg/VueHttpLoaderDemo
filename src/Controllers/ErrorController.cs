using Boanda.Core;
using Boanda.Web;
using System.Web.Mvc;

namespace Boanda.DSJPT.EntryWeb.Controllers
{
    /// <summary>
    /// Class ErrorController.
    /// </summary>
    /// <seealso cref="System.Web.Mvc.Controller" />
    public class ErrorController : Controller
    {
        /// <summary>
        /// 资源未找到
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult NotFound()
        {
            //Response.StatusCode = 404;
            if (Request.IsAjaxRequest())
            {
                var ar = new AjaxResult() { isSuccess = false, message = SjzxConfig.TIP_404 };
#if DEBUG

                ar.other = RouteData.Values["error"].ToString();
#endif
                return Json(ar, JsonRequestBehavior.AllowGet);
            }
            else return View();
        }

        /// <summary>
        /// 系统内部错误
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult Internal()
        {
            //Response.StatusCode = 500;
            if (Request.IsAjaxRequest())
            {
                var ar = new AjaxResult() { isSuccess = false, message = SjzxConfig.TIP_SYSTEM_ERROR };
#if DEBUG

                ar.other = RouteData.Values["error"].ToString();
#endif
                return Json(ar, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return View();
            }
        }

        /// <summary>
        /// 未授权
        /// </summary>
        /// <returns>ActionResult.</returns>
        public ActionResult NoAuth()
        {
            //Response.StatusCode = 403;
            if (Request.IsAjaxRequest())
            {
                var ar = new AjaxResult() { isSuccess = false, message = SjzxConfig.TIP_AUTH_ERROR };
#if DEBUG

                ar.other = RouteData.Values["error"].ToString();
#endif
                return Json(ar, JsonRequestBehavior.AllowGet);
            }
            else return View();
        }
    }
}