using DataAccess;
using Domain;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Store.Infrastructure
{
    public class AppStoreUserManager : UserManager<AppStoreUser>
    {
        public AppStoreUserManager(IUserStore<AppStoreUser> store)
            : base(store)
        {
        }

        public static AppStoreUserManager Create(IdentityFactoryOptions<AppStoreUserManager> options, IOwinContext context)
        {
            var manager = new AppStoreUserManager(new UserStore<AppStoreUser>(context.Get<StoreContext>()));

            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<AppStoreUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Password Validations
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<AppStoreUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }

            return manager;
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(AppStoreUser user, string authenticationType)
        {
            var userIdentity = await CreateIdentityAsync(user, authenticationType);

            return userIdentity;
        }
    }
}