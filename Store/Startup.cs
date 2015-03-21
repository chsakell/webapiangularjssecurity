using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(Store.Startup))]

namespace Store
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureStoreAuthentication(app);
        }
    }
}