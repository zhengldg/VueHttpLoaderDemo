//-----------------------------------------------------------------------
// <copyright file="AssemblyInfo.cs" company="Powerdata">
//    Copyright (C) 2016 ShenZhen Powerdata Information Technology Co.,Ltd All Rights Reserved.
//    本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、复制、修改或发布本软件.
// </copyright>
// <author>Met</author>
//-----------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boanda.Web.Areas.Rms.Models
{
    /// <summary>
    /// 角色
    /// </summary>
    public class RoleMenuModel
    {
        /// <summary>
        /// Gets or sets the xh.
        /// </summary>
        /// <value>The xh.</value>
        public string XH { get; set; }

        /// <summary>
        /// Gets or sets the JSXH.
        /// </summary>
        /// <value>The JSXH.</value>
        public string JSXH { get; set; }

        /// <summary>
        /// Gets or sets the CDXH.
        /// </summary>
        /// <value>The CDXH.</value>
        public string CDXH { get; set; }

        /// <summary>
        /// Gets or sets the savepower.
        /// </summary>
        /// <value>The savepower.</value>
        public string SAVEPOWER { get; set; }

        /// <summary>
        /// Gets or sets the updatepower.
        /// </summary>
        /// <value>The updatepower.</value>
        public string UPDATEPOWER { get; set; }

        /// <summary>
        /// Gets or sets the deletepower.
        /// </summary>
        /// <value>The deletepower.</value>
        public string DELETEPOWER { get; set; }

        /// <summary>
        /// Gets or sets the printpower.
        /// </summary>
        /// <value>The printpower.</value>
        public string PRINTPOWER { get; set; }

        /// <summary>
        /// Gets or sets the exportpower.
        /// </summary>
        /// <value>The exportpower.</value>
        public string EXPORTPOWER { get; set; }

        /// <summary>
        /// Gets or sets the uploadpower.
        /// </summary>
        /// <value>The uploadpower.</value>
        public string UPLOADPOWER { get; set; }

        /// <summary>
        /// Gets or sets the otherpower.
        /// </summary>
        /// <value>The otherpower.</value>
        public string OTHERPOWER { get; set; }
    }
}