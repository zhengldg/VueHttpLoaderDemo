//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using System.Web.Mvc;

namespace Boanda.UserManager.Web.Areas.Rms.Controllers
{
    /// <summary>
    /// Class RmsAreaRegistration.
    /// </summary>
    /// <seealso cref="System.Web.Mvc.AreaRegistration" />
    public class RmsAreaRegistration : AreaRegistration
    {
        /// <summary>
        /// 获取要注册的区域的名称。
        /// </summary>
        /// <value>The name of the area.</value>
        public override string AreaName
        {
            get { return "Rms"; }
        }

        /// <summary>
        /// 使用指定区域的上下文信息在 ASP.NET MVC 应用程序内注册某个区域。
        /// </summary>
        /// <param name="context">对注册区域所需的信息进行封装。</param>
        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Rms_default",
                "Rms/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}