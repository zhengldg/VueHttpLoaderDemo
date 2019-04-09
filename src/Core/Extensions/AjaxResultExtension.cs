namespace Boanda.Web
{
    public static class AjaxResultExtension
    {
        public static AjaxResult Error(this AjaxResult result, string message)
        {
            return new AjaxResult() { isSuccess = false, message = message };
        }

        public static AjaxResult Success(this AjaxResult result, object data)
        {
            return new AjaxResult() { isSuccess = true, data = data };
        }
    }
}