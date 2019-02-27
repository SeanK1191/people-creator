using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Tech_Test.Controllers;
using Tech_Test.Models;

namespace Tech_Test.Tests.Controllers
{
    [TestClass]
    public class PeopleControllerTests
    {
        private Mock<Tech_TestContext> _mockContext = new Mock<Tech_TestContext>();
        private Mock<DbSet<Person>> _mockSet;

        private List<Person> _people;
        private IQueryable<Person> _queryablePeople;

        [TestInitialize]
        public void TestInitialize()
        {
            _people = new List<Person>();

            // Add Inform Requests
            for (int i = 1; i < 4; i++)
            {
                _people.Add(new Person
                {
                    Id = i,
                    Address = $"Address{i}",
                    Email = $"Email{i}",
                    Name = $"Name{i}",
                    Balance = i * 100,
                    Age = i + 10,
                });
            }

            _queryablePeople = _people.AsQueryable();

            // Arrange- Mock the EF6 DBSet so that it returns our in-memory model instead of from a database.
            _mockSet = new Mock<DbSet<Person>>();
            _mockSet.As<IQueryable<Person>>().Setup(m => m.Expression).Returns(_queryablePeople.Expression);
            _mockSet.As<IQueryable<Person>>().Setup(m => m.ElementType).Returns(_queryablePeople.ElementType);
            _mockSet.As<IQueryable<Person>>().Setup(m => m.GetEnumerator()).Returns(_queryablePeople.GetEnumerator());

            _mockSet.As<IDbAsyncEnumerable<Person>>()
                .Setup(m => m.GetAsyncEnumerator())
                .Returns(new TestDbAsyncEnumerator<Person>(_queryablePeople.GetEnumerator()));

            _mockSet.As<IQueryable<Person>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<Person>(_queryablePeople.Provider));

            _mockContext.Setup(c => c.People).Returns(_mockSet.Object);
        }

        private PeopleController GetInstance()
        {
            return new PeopleController(_mockContext.Object);
        }

        [TestMethod]
        public void PeopleController_GetAllPeople()
        {
            //Arrange
            var peopleController = GetInstance();

            //Act
            var result = peopleController.GetPeople() as OkNegotiatedContentResult<List<PersonResponse>>;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Count);
        }

        [TestMethod]
        public void PeopleController_GetPerson()
        {
            //Arrange
            var peopleController = GetInstance();

            //Act
            var response = peopleController.GetPerson(1);
            var result = response as OkNegotiatedContentResult<Person>;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Content.Id);
            Assert.AreEqual("Name1", result.Content.Name);
        }

        [TestMethod]
        public void PeopleController_AddPerson()
        {
            //Arrange
            var peopleController = GetInstance();

            //Act
            var response = peopleController.PostPerson(new Person()
            {
                Address = "Whatever",
                Name = "Sean",
                Id = 4,
                Age = 24,
                Balance = 100,
                Email = "seank1191"
            });
            var result = response as CreatedAtRouteNegotiatedContentResult<Person>;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("GetPerson", result.RouteName);
            Assert.AreEqual("Sean", result.Content.Name);
        }
    }
}
