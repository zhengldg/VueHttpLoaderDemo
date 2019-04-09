using System;
using System.Text.RegularExpressions;

namespace Boanda.Jkyjpt.Web.Core
{
    /// <summary>
    /// 常用的验证器
    /// </summary>
    public class CustomValidator
    {
        /// <summary>
        /// 只包含中文
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns><c>true</c> if the specified input is chinese; otherwise, <c>false</c>.</returns>
        public static bool IsChinese(string input)
        {
            return Regex.IsMatch(input, "^[\u4e00-\u9fa5]+$");
        }

        /// <summary>
        /// 是否只包含英文字符以及下划线
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns><c>true</c> if the specified input is english; otherwise, <c>false</c>.</returns>
        public static bool IsEnglish(string input)
        {
           return Regex.IsMatch(input, "^[a-zA-Z_]+$");
        }

        /// <summary>
        /// 是否是日期格式
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns><c>true</c> if [is date time] [the specified input]; otherwise, <c>false</c>.</returns>
        public static bool IsDateTime(string input)
        {
             DateTime dt;
             return DateTime.TryParse(input, out dt);
         }

        /// <summary>
        /// 是否是身份证格式
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns><c>true</c> if the specified input is SFZH; otherwise, <c>false</c>.</returns>
        public static bool IsSFZH(string input)
        {
             return Regex.IsMatch(input, "^[1-9]([0-9]{16}|[0-9]{13})[xX0-9]$");
         }

        /// <summary>
        /// 验证用户名的正则式,必需以字母开头,只能包括字母/数字/下划线,总长度要求是6～16位
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns><c>true</c> if [is user name] [the specified input]; otherwise, <c>false</c>.</returns>
        public static bool IsUserName(string input)
        {
             return Regex.IsMatch(input, "^[a-zA-Z][a-zA-Z0-9_]{5,15}$");
         }

        /// <summary>
        /// 是否是url格式
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns><c>true</c> if the specified input is URL; otherwise, <c>false</c>.</returns>
        public static bool IsUrl(string input)
        {
             return Regex.IsMatch(input, "^[a-zA-z]+://(/w+(-/w+)*)(/.(/w+(-/w+)*))*(/?/S*)?$");
         }
    }
}