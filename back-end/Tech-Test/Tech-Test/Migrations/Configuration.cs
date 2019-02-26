namespace Tech_Test.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;
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

            List<Person> people = new List<Person>();

            for (int i = 1; i < 101; i++)
            {
                people.Add(new Person()
                {
                    Id = i,
                    Address = $"Test Address {i}",
                    Age = 20 + i,
                    Balance = 100 * i,
                    Email = $"testemail-{RandomString(4)}@notarealemail.co.uk",
                    Name = $"Test Person {RandomString(4)}"
                });
            }

            context.People.AddOrUpdate(x => x.Id, people.ToArray());
        }

        private static Random random = new Random();

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).OrderBy(c => c).ToArray());
        }
    }
}
