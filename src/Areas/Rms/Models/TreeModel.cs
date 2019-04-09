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

namespace Boanda.UserManager.Web.Areas.Rms.Models
{
    /// <summary>
    /// Class TreeModel.
    /// </summary>
    public class TreeModel
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        public string id { get; set; }

        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        /// <value>The text.</value>
        public string text { get; set; }

        public string pId { get; set; }

        public string name { get; set; }

        public bool open { get; set; }

        /// <summary>
        /// Gets or sets the children.
        /// </summary>
        /// <value>The children.</value>
        public List<TreeModel> children { get; set; }
    }
}