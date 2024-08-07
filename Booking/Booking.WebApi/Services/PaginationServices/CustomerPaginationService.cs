using AutoMapper;
using Booking.Application.MediatR.Accounts.Commands.GetCustomerPage;
using Booking.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace Booking.WebApi.Services.PaginationServices;

public class CustomerPaginationService(
	UserManager<User> customerManager,
	IMapper mapper
) : BasePaginationService<Customer, CustomerItemVm, GetCustomerPageCommand>(mapper) {

	protected override IQueryable<Customer> GetQuery() =>
		customerManager.Users
			.OfType<Customer>()
			.OrderBy(c => c.Id);

	protected override IQueryable<Customer> FilterQuery(IQueryable<Customer> query, GetCustomerPageCommand filter) {
		if (filter.FirstName is not null)
			query = query.Where(c => c.FirstName.ToLower().Contains(filter.FirstName.ToLower()));

		if (filter.LastName is not null)
			query = query.Where(c => c.LastName.ToLower().Contains(filter.LastName.ToLower()));

		return query;
	}
}
