using Boanda.Web;
using FluentValidation;
using FluentValidation.Results; 
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc; 

namespace Boanda.DSJPT.EntryWeb.Controllers
{
    /// <summary>
    /// 控制器基类
    /// </summary>
    /// <typeparam name="TEntity">The type of the t entity.</typeparam>
    /// <seealso cref="Boanda.Web.Controllers.BaseController" />
    public class BaseController<TEntity> : Boanda.Web.Controllers.BaseController
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BaseController{TEntity}"/> class.
        /// </summary>
        public BaseController()
        {
        }

        /// <summary>
        /// 404错误时返回的页面
        /// </summary>
        /// <returns>ActionResult.</returns>
        protected ActionResult ResouceNotFound()
        {
            return new ViewResult() { ViewName = "~/Views/Error/NotFound.cshtml" };
        }

        /// <summary>
        /// 根据菜单设置权限
        /// </summary>
        protected void SetBasicAuthentization()
        {
            var menu = this.GetCurrentMenu();
            ViewBag.canAdd = menu.IsSavePower ? 1 : 0;
            ViewBag.canEdit = menu.IsUpdatePower ? 1 : 0;
            ViewBag.canDel = menu.IsDeletePower ? 1 : 0;
            ViewBag.canExport = menu.IsExportPower ? 1 : 0;
        }

        /// <summary>
        /// 服务端 验证实体
        /// </summary>
        /// <param name="validator">The validator.</param>
        /// <param name="entity">The entity.</param>
        /// <param name="rs">The rs.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool ValidateEntityInput(IValidator validator, TEntity entity, AjaxResult rs)
        {
            ValidationResult results = validator.Validate(entity);
            rs.isSuccess = results.IsValid;
            rs.message = ConvertValidationsError(results.Errors);

            return results.IsValid;
        }

        /// <summary>
        /// 服务端 验证多个实体
        /// </summary>
        /// <param name="validator">The validator.</param>
        /// <param name="entities">The entities.</param>
        /// <param name="rs">The rs.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool ValidateEntityInput(IValidator validator, IEnumerable<TEntity> entities, AjaxResult rs)
        {
            List<ValidationFailure> errors = new List<ValidationFailure>();
            foreach(var item in entities)
            {
                ValidationResult result = validator.Validate(item);
                if(!result.IsValid)
                {
                    rs.isSuccess = false;
                    errors.AddRange(result.Errors);
                }
            }

            if(!rs.isSuccess)
            {
                rs.message = ConvertValidationsError(errors);
            }
            
            return rs.isSuccess;
        }

        /// <summary>
        /// 格式化验证错误信息
        /// </summary>
        /// <param name="errors">The errors.</param>
        /// <returns>System.String.</returns>
        protected string ConvertValidationsError(IList<ValidationFailure> errors)
        {
            return string.Join("<br/>", errors.Select(x => x.ErrorMessage));
        }

        /// <summary>
        /// 在调用操作方法前调用。
        /// </summary>
        /// <param name="filterContext">有关当前请求和操作的信息。</param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
        }
    }
}