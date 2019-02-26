namespace Tech_Test.Migrations
{
    using System.Data.Entity.Migrations;
    using Tech_Test.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Tech_Test.Models.Tech_TestContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Tech_Test.Models.Tech_TestContext context)
        {
            //  This method will be called after migrating to the latest version.

            context.People.AddOrUpdate(x => x.Id,
                new Person()
                {
                    Id = 1,
                    Address = "Test Address 1",
                    Age = 21,
                    Balance = 100,
                    Email = "testemail1@notarealemail.co.uk",
                    Name = "Test Person 1"
                },
                new Person()
                {
                    Id = 2,
                    Address = "Test Address 2",
                    Age = 22,
                    Balance = 200,
                    Email = "testemail2@notarealemail.co.uk",
                    Name = "Test Person 2"
                },
                new Person()
                {
                    Id = 3,
                    Address = "Test Address 3",
                    Age = 23,
                    Balance = 300,
                    Email = "testemail3@notarealemail.co.uk",
                    Name = "Test Person 3"
                },
                new Person()
                {
                    Id = 4,
                    Address = "Test Address 4",
                    Age = 24,
                    Balance = 400,
                    Email = "testemail4@notarealemail.co.uk",
                    Name = "Test Person 4"
                }
            );
        }
    }
}
