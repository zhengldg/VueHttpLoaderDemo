using Boanda.Core.Dependency;
using Boanda.Core.Session;
using Boanda.DSJPT.Core.Entity;
using Boanda.DSJPT.Data.Services.Log;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Boanda.DSJPT.EntryWeb
{
    /// <summary>
    /// 系统日志 filter
    /// </summary>
    public class SystemLogAttribute : ActionFilterAttribute
    {
        public ILogService logService { get; set; }
        public ISession session { get; set; }

        public SystemLogAttribute()
        {
            this.logService = IocManager.Resolve<ILogService>();
            this.session = IocManager.Resolve<ISession>();
        }

        /// <summary>
        /// 操作类型
        /// </summary>
        public SystemLogAttribute(string operationType, string module = "")
            : this()
        {
            this.Module = module;
            this.Operatetype = operationType;
        }

        /// <summary>
        /// 操作类型
        /// </summary>
        public SystemLogAttribute(ActionTypes operationType, string module = "")
            : this()
        {
            this.Module = module;
            this.Operatetype = operationType.ToString();
        }

        /// <summary>
        /// 操作类型
        /// </summary> 
        public string Operatetype { get; set; }
        /// <summary>
        /// 模块
        /// </summary> 
        public string Module { get; set; }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var request = filterContext.RequestContext.HttpContext.Request;
            var entity = new T_COMN_LOG();
            entity.RZLX = LogTypes.系统日志.ToString();
            entity.XH = Guid.NewGuid().ToString();
            entity.CZSJ = DateTime.Now;
            entity.CZR = session.UserName;
            entity.QQLJ = request.Url.PathAndQuery;
            entity.JQDZ = WebHelper.GetClientIpAddress();
            entity.MK = this.Module;
            entity.CZLX = this.Operatetype;
            entity.CJSJ = DateTime.Now;
            entity.CJR = filterContext.HttpContext.User.Identity.Name;

            var actionParameters = filterContext.RequestContext.HttpContext.Items["ActionParameters"] as IDictionary<string, object>;
            if (actionParameters != null)
            {
                SetInputValue(filterContext, actionParameters, entity);
            }

            base.OnActionExecuted(filterContext);
            this.logService.Log(entity);
        }


        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            IDictionary<string, object> actionParameters = filterContext.ActionParameters;
            filterContext.RequestContext.HttpContext.Items["ActionParameters"] = actionParameters;
            base.OnActionExecuting(filterContext);
        }

        private void SetInputValue(ActionExecutedContext filterContext, IDictionary<string, object> actionParameters, T_COMN_LOG entity)
        {
            var paraDescriptor = filterContext.ActionDescriptor.GetParameters();
            if (paraDescriptor.Length == 0) return;
            if (paraDescriptor.Length == 1 && paraDescriptor[0].ParameterType.IsClass && paraDescriptor[0].ParameterType != typeof(string)
                )
            {
                entity.QQCSL = paraDescriptor[0].ParameterType.FullName;
                entity.QQCS = JsonConvert.SerializeObject(actionParameters.Values.First());
                return;
            }

            var result = new StringBuilder();
            result.Append("{");
            foreach (var item in actionParameters)
            {
                result.Append(string.Format("\"{0}\":{1}", item.Key, JsonConvert.SerializeObject(item.Value)));
                result.Append(",");
            }
            result.Remove(result.Length - 1, 1);

            result.Append("}");
            entity.QQCS = result.ToString();
        }
    }
}