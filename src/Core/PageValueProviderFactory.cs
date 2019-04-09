using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Boanda.Web.Core
{
    /// <summary>
    /// 模型绑定时，绑定当前用的一些基本信息，如ORGID
    /// </summary>
    /// <seealso cref="System.Web.Mvc.ValueProviderFactory" />
    public class PageValueProviderFactory : ValueProviderFactory
    {
        /// <summary>
        /// 为指定控制器上下文返回值提供程序对象。
        /// </summary>
        /// <param name="controllerContext">一个对象，该对象封装有关当前 HTTP 请求的信息。</param>
        /// <returns>值提供程序对象。</returns>
        public override IValueProvider GetValueProvider(ControllerContext controllerContext)
        {
            return new PageValueProvider(controllerContext);
        }
    }


    public class PageValueProvider : IValueProvider
    {
        /// <summary>
        /// Gets or sets the controller context.
        /// </summary>
        /// <value>The controller context.</value>
        public ControllerContext ControllerContext { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="UserInfoValueProvider"/> class.
        /// </summary>
        /// <param name="controllerContext">The controller context.</param>
        public PageValueProvider(ControllerContext controllerContext)
        {
            this.ControllerContext = controllerContext;
        }

        public bool ContainsPrefix(string prefix)
        {
            var containsPrefix = prefix.ToUpper() == "PAGESIZE" || prefix.ToUpper() == "PAGEINDEX";
            return containsPrefix;
        }

        public ValueProviderResult GetValue(string key)
        {
            var controller = ControllerContext.Controller as Boanda.Web.Controllers.BaseController;
            if (controller != null)
            {
                var pageSize = controller.HttpContext.Request["limit"];
                var pageIndex = controller.HttpContext.Request["page"];
                if (key.ToUpper() == "PAGESIZE" && pageSize.Length > 0)
                {
                    return new ValueProviderResult(pageSize, pageSize, CultureInfo.CurrentCulture);
                }

                if (key.ToUpper() == "PAGEINDEX" && pageIndex.Length > 0)
                {
                    pageIndex = (int.Parse(pageIndex) - 1).ToString();
                    return new ValueProviderResult(pageIndex, pageIndex, CultureInfo.CurrentCulture);
                }
            }

            return null;
        }
    }
}