using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Tech_Test.Models;

namespace Tech_Test.Controllers
{
    [RoutePrefix("")]
    public class PeopleController : ApiController
    {
        private Tech_TestContext db = new Tech_TestContext();

        // GET: api/People
        [HttpGet]
        [Route("people")]
        public IHttpActionResult GetPeople(
            int skip = 0, 
            int take = 10,
            bool sortDescending = false,
            string sortBy = "name")
        {
            var people = db.People.Select(person => new PersonResponse
            {
                Id = person.Id,
                Name = person.Name,
                Address = person.Address,
                Age = person.Age,
                Balance = person.Balance,
                Email = person.Email
            });

            switch (sortBy)
            {
                case "name":
                    people = sortDescending ? people.OrderByDescending(person => person.Name) : people.OrderBy(person => person.Name);
                    break;
                case "email":
                    people = sortDescending ? people.OrderByDescending(person => person.Email) : people.OrderBy(person => person.Email);
                    break;
                default:
                    people = sortDescending ? people.OrderByDescending(person => person.Name) : people.OrderBy(person => person.Name);
                    break;
            }
            
            people = people.Skip(skip).Take(take);

            return Ok(people.ToList());
        }

        // GET: api/People/5
        [HttpGet]
        [Route("people/{id}", Name = "GetPerson")]
        [ResponseType(typeof(Person))]
        public IHttpActionResult GetPerson(int id)
        {
            Person personModel = db.People.Find(id);
            if (personModel == null)
            {
                return NotFound();
            }

            return Ok(personModel);
        }

        // PUT: api/People/5
        [HttpPut]
        [Route("people")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPerson(int id, Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != person.Id)
            {
                return BadRequest();
            }

            db.Entry(person).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/People
        [HttpPost]
        [Route("people")]
        [ResponseType(typeof(Person))]
        public IHttpActionResult PostPerson(Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.People.Add(person);
            db.SaveChanges();

            return CreatedAtRoute("GetPerson", new { id = person.Id }, person);
        }

        // DELETE: api/People/5
        [HttpDelete]
        [Route("people")]
        [ResponseType(typeof(Person))]
        public IHttpActionResult DeletePerson(int id)
        {
            Person person = db.People.Find(id);
            if (person == null)
            {
                return NotFound();
            }

            db.People.Remove(person);
            db.SaveChanges();

            return Ok(person);
        }
        
        private bool PersonExists(int id)
        {
            return db.People.Count(e => e.Id == id) > 0;
        }
    }
}