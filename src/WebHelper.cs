using System.Net;
using System.Net.Sockets;
using System.Web;

namespace Boanda.Sjzx.Web
{
    public class WebHelper
    {
        public static string GetBrowserInfo()
        {
            HttpContext httpContext = HttpContext.Current;
            if (httpContext == null) return "";
            else return httpContext.Request.Browser.Browser + " / " +
                   httpContext.Request.Browser.Version + " / " +
                   httpContext.Request.Browser.Platform;
        }

        public static string GetClientIpAddress()
        {
            HttpContext httpContext = HttpContext.Current;
            if (httpContext == null) return "";

            var clientIp = httpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ??
                           httpContext.Request.ServerVariables["REMOTE_ADDR"];

            foreach (var hostAddress in Dns.GetHostAddresses(clientIp))
            {
                if (hostAddress.AddressFamily == AddressFamily.InterNetwork)
                {
                    return hostAddress.ToString();
                }
            }

            foreach (var hostAddress in Dns.GetHostAddresses(Dns.GetHostName()))
            {
                if (hostAddress.AddressFamily == AddressFamily.InterNetwork)
                {
                    return hostAddress.ToString();
                }
            }

            return null;
        }

        public static string GetComputerName()
        {
            HttpContext httpContext = HttpContext.Current;
            if (httpContext == null) return "";

            if (!httpContext.Request.IsLocal)
            {
                return null;
            }

            try
            {
                var clientIp = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ??
                               HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                return Dns.GetHostEntry(IPAddress.Parse(clientIp)).HostName;
            }
            catch
            {
                return null;
            }
        }
    }
}
