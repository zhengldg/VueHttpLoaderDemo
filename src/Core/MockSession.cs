//-----------------------------------------------------------------------
// <copyright file="MockSession.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using Boanda.Core;
using Boanda.Core.Dependency;
using Boanda.Core.Helper;
using Boanda.Core.Session;
using Boanda.UserManager.IService;
using System;
using System.Web;

namespace Boanda.DevelopmentFramework.Web.Core
{
    /// <summary>
    /// 模拟登录信息
    /// </summary>
    /// <seealso cref="Boanda.Core.ISession" />
    public class CookieSession : ISession
    {
        public string UserId => HttpContext.Current.User.Identity.Name;

        /// <summary>
        /// Gets the yhmc.
        /// </summary>
        /// <value>The yhmc.</value>
        public string UserName
        {
            get
            {
                if (string.IsNullOrWhiteSpace(HttpContext.Current.User.Identity.Name)) return string.Empty;
                var userService = IocManager.Resolve<IUserManagerAppService>();
                var user = userService.GetUserInfoByUserId(HttpContext.Current.User.Identity.Name, ConfigHelper.AppSettings("SystemId"), false);
                return user.User.Name;
            }
        }

        public string UserType => throw new NotImplementedException();
    }
}