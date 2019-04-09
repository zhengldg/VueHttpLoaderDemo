using Boanda.UserManager.Entity;
using System.Collections.Generic;

namespace Boanda.DevelopmentFramework.Web.Models.Tool
{
    /// <summary>
    /// 部门与用户列表
    /// </summary>
    public class DepartmentWithUser
    {
        /// <summary>
        /// Gets or sets the ZZJG bh name map.
        /// </summary>
        /// <value>The ZZJG bh name map.</value>
        public Dictionary<string, string> ZzjgBhNameMap { get; set; }

        /// <summary>
        /// 用户
        /// </summary>
        /// <value>The user list.</value>
        public IEnumerable<T_ADMIN_RMS_YH> UserList { get; set; }

        /// <summary>
        /// 部门
        /// </summary>
        /// <value>The ZZJG list.</value>
        public IEnumerable<T_ADMIN_RMS_ZZJG> ZzjgList { get; set; }
    }
}