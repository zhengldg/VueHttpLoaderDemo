using Boanda.UserManager.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boanda.UserManager.Dto.Exntension
{
    public static class UserInfoExtension
    {
        public static bool IsQX(this IUserInfo user)
        {
            return user.User.Orgid.Length >= 6;
        }

        public static bool IsSHI(this IUserInfo user)
        {
            return user.User.Orgid.Length <= 4;
        }
    }
}