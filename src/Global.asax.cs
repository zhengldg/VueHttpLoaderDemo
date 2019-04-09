using Boanda.Core.Logging;
using Boanda.DSJPT.EntryWeb.Controllers;
using Boanda.Web;
using Boanda.Web.Core;
using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using log4net;

namespace Boanda.DSJPT.EntryWeb
{
    /// <summary>
    /// Class Global.
    /// </summary>
    /// <seealso cref="Boanda.Web.MvcApplication" />
    public class Global : Boanda.Web.MvcApplication
    {
        /// <summary>
        /// Handles the Start event of the Application control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        private void Application_Start(object sender, EventArgs e)
        {
            base.InitSkinViewEngine();
            base.InitBundleConfig();
            IocConfig.Init(true);

            AreaRegistration.RegisterAllAreas();
            System.Web.Http.GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig2.RegisterRoutes(RouteTable.Routes);
            ValueProviderFactories.Factories.Add(new PageValueProviderFactory());
            log4net.Config.XmlConfigurator.Configure(new System.IO.FileInfo(Server.MapPath("~/Web.config")));
        }

        /// <summary>
        /// Application_s the begin request.
        /// </summary>
        protected void Application_BeginRequest()
        {
            if (Request.IsLocal)
            {
                //StackExchange.Profiling.MiniProfiler.Start();
            }
        }

        /// <summary>
        /// Application_s the end request.
        /// </summary>
        protected void Application_EndRequest()
        {
            if (Request.IsLocal)
            {
                StackExchange.Profiling.MiniProfiler.Stop();
            }
        }

        /// <summary>
        /// 异常统一拦截
        /// </summary>
        protected void Application_Error()
        {
            Exception exception = Server.GetLastError();
            var log = LogManager.GetLogger(typeof(Global));
            log.Error(exception);
            Response.Clear();
            HttpException httpException = exception as HttpException;

            RouteData routeData = new RouteData();

            routeData.Values.Add("controller", "Error");
            if (httpException != null && httpException.GetHttpCode() == 404)
            {
                routeData.Values.Add("action", "NotFound");
            }
            else if (httpException != null && httpException.GetHttpCode() == 403)
            {
                routeData.Values.Add("action", "NoAuth");
            }
            else
            {
                routeData.Values.Add("action", "Internal");
            }

            routeData.Values.Add("error", exception);

            Server.ClearError();
            Response.TrySkipIisCustomErrors = true;
            IController errorController = new ErrorController();
            errorController.Execute(new RequestContext(
                 new HttpContextWrapper(Context), routeData));
        }
    }
}