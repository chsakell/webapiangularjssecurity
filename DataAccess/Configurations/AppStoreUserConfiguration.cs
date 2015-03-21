using Domain;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Configurations
{
    public class AppStoreUserConfiguration : EntityTypeConfiguration<AppStoreUser>
    {
        public AppStoreUserConfiguration()
        {
            ToTable("Users");
        }
    }
}
